import { ObjectType, Field } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { BankAccount } from "./BankAccount";
import { transactionType } from "../types";

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
  type!: transactionType;

  @Field()
  @Column()
  memo!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @ManyToOne(() => User, (user) => user.transactions)
  creator: User;

  @Field()
  @Column()
  bankAccountId: number;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transactions, {
    onDelete: "CASCADE",
  })
  bankAccount: BankAccount;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
