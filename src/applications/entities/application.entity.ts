/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    client_secret: string

    @Column("simple-array")
    redirect_uris: string

    @Column({ default: () => 'CURRENT_TIMESTAMPTZ', type: 'timestamp with time zone' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMPTZ', type: 'timestamp with time zone' })
    updated_at: Date

}
