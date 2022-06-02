import {Injectable, NestMiddleware} from "@nestjs/common";
import {promisify} from "util";
import {createCipheriv, randomBytes, scrypt} from "crypto";
import {Buffer} from "buffer";

@Injectable()
export class InjectSecretKeyMiddleware implements NestMiddleware{
    async use(req: any, res: any, next: (error?: any) => void): Promise<any> {
        const publicKey = randomBytes(16);

        const privateKey = process.env.PRIVATE_API_KEY
        
        const key = (await promisify(scrypt)(privateKey, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, publicKey)

        req.body.secretApiKey = cipher.update(process.env.PRIVATE_API_KEY)
        req.body.publicKey = publicKey
        next()
    }
}