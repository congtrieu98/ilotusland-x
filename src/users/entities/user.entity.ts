/* eslint-disable prettier/prettier */
import { Application } from 'src/applications/entities/application.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @OneToOne(() => Application)
    @JoinColumn()
    client: Application
}