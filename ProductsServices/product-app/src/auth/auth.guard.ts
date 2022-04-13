import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {createDecipheriv, scrypt} from "crypto";
import {promisify} from "util";
import {Buffer} from "buffer";


@Injectable()
export class NonPublicApi implements CanActivate {
    constructor() {
    }

    canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        let result:any
        return new Promise<void>(async (resolve, reject) => {
            const secretApiKeyFromBody = request?.body?.secretApiKey?.data
            if(!!secretApiKeyFromBody){
                const secretApiKey = Buffer.from(secretApiKeyFromBody);
                const publicKey = Buffer.from(request.body.publicKey.data)
                const privateKey = process.env.PRIVATE_API_KEY

                const key = await (promisify(scrypt)(privateKey, 'salt', 32)) as Buffer

                const decipher = createDecipheriv('aes-256-ctr', key, publicKey)

                result = Buffer.concat([decipher.update(secretApiKey), decipher.final()]).toString()
                resolve()
            }
            else {
                resolve()
                result = false
            }
        }).then((res)=>{
            return result === process.env.PRIVATE_API_KEY;
        })
    }
}