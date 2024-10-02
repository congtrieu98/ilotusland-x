import { Application } from 'src/applications/entities/application.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthorizeCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  code_challenge: string;

  @Column()
  code_challenge_method: string;

  @ManyToOne(() => User)
  user: string;

  @ManyToOne(() => Application)
  client: string;

  @Column()
  respose_type: string;

  @Column({ default: false })
  used: boolean;

  @Column({
    default: () => 'CURRENT_TIMESTAMPTZ',
    type: 'timestamp with time zone',
  })
  created_at: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMPTZ',
    type: 'timestamp with time zone',
  })
  updated_at: Date;
}
