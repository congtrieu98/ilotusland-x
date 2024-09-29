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

    @Column()
    scope: string

    @Column()
    grant_types: string

    @Column()
    response_type: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date
}
