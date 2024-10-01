/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthorizeCode {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    code: string

    @Column()
    code_challenge: string

    @Column()
    code_challenge_method: string

    @Column()
    user_id: string

    @Column()
    client_id: string

    @Column()
    respose_type: string

    @Column({default: false})
    used: boolean

    @Column({ default: () => 'CURRENT_TIMESTAMPTZ', type: 'timestamp with time zone' })
    created_at: Date

    @Column({ default: () => 'CURRENT_TIMESTAMPTZ', type: 'timestamp with time zone' })
    updated_at: Date

}
