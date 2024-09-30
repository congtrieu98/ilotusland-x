/* eslint-disable prettier/prettier */
// import { Application } from 'src/applications/entities/application.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp with time zone' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp with time zone' })
    updated_at: Date

    // @OneToOne(() => Application)
    // @JoinColumn()
    // client: Application
}