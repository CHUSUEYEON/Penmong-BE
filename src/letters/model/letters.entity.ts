import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LetterScope } from './letter-scope.enum';

@Entity()
export class Letter extends BaseEntity {
  @PrimaryGeneratedColumn()
  letterId: number;

  @Column()
  letterContent: String;

  @Column()
  letterColor: number;

  @Column()
  letterShape: number;

  @CreateDateColumn()
  letterCreatedAt: Date;

  @Column({ nullable: true })
  letterDeletedAt: Date;

  @Column({ nullable: true })
  letterFile: String;

  @Column()
  letterIsReported: boolean; //신고여부

  @Column()
  letterScope: LetterScope; // 공개범위

  @Column()
  letterIsPublic: boolean; // 전체 공개인가 (0 = 특정 닉네임, 1 = 전체 공개)
}
