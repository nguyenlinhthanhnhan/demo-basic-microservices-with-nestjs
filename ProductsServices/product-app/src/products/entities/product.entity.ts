import{Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from 'typeorm'

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productId!: number
    
    @Column()
    name: string
    
    @Column()
    amount: number

    @Column({nullable: true})
    userId: string
    
    @CreateDateColumn()
    created: Date
    
    @UpdateDateColumn()
    updated:Date
    
    @DeleteDateColumn()
    deletedAt: Date
}
