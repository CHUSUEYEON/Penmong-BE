import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserLoginType } from './user-loginType.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userIdx: number;

  @Column()
  userId: string;

  @Column()
  userNickname: string;

  @Column()
  userPassword: string;

  @Column()
  userPwQuestion: string;

  @Column()
  userPwAnswer: string;

  @CreateDateColumn()
  userCreatedAt: Date;

  @Column({ nullable: true })
  userDeletedAt: Date;

  @Column({ default: false })
  isAdmin: boolean;

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
