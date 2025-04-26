import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserLoginType } from './user-loginType.enum';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Unique(['userId', 'userNickname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userIdx: number;

  @Column()
  userId: string;

  @Column()
  userNickname: string;

  @Exclude()
  @Column()
  userPassword: string;

  @Exclude()
  @Column()
  userPwQuestion: string;

  @Exclude()
  @Column()
  userPwAnswer: string;

  @Column({ nullable: true })
  @Exclude()
  userRefreshToken: string;

  @CreateDateColumn()
  userCreatedAt: Date;

  @Column({ nullable: true })
  userDeletedAt: Date;

  @Column({ default: false })
  userIsAdmin: boolean;

  @Column({ nullable: true })
  userSocialID: string;

  @Column({
    type: 'enum',
    enum: UserLoginType,
    default: 'LOCAL',
  })
  userLoginType: UserLoginType;

  @Column({ default: 1 })
  userLevel: number;

  @Column({ default: 0 })
  userReport: number;
}
