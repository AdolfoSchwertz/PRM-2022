import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity()
export class Category extends BaseEntity{       
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false, length: 50})
    name: string;
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}