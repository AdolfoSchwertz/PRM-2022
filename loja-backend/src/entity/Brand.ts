import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Brand extends BaseEntity{       
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false, length: 50})
    name: string;
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}

