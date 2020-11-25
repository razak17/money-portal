import { ObjectType, Field } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  amount!: number;

  @Field()
  @Column()
  transactionType!: string;

  @Field()
  @Column()
  memo!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
