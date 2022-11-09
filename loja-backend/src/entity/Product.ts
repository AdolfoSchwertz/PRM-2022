import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Brand } from "./Brand";
import { Category } from "./Category";

@Entity()
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 50})
    name: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column('text', {nullable: false})
    description: string;

    @Column({nullable: false})
    price: number;

    @Column({nullable: false, length: 1})
    active: string;

    @ManyToOne(() => Category, {eager: true, nullable: false})
    category: Category;

    @ManyToOne(() => Brand, {eager: true, nullable: true})
    brand: Brand;


}