import { ObjectType, Field } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Transaction } from "./Transaction";
import { accountType } from "../types";

@ObjectType()
@Entity()
export class BankAccount extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  type!: accountType;

  @Field()
  @Column()
  startingBalance!: number;

  @Field()
  @Column()
  lowBalanceAlert!: number;

  @Field()
  @Column({ type: "int", default: 0 })
  currentBalance: number;

  @Field()
  @Column({ type: "int", default: 0 })
  monthlySpending: number;

  @Field()
  @Column({ type: "int", default: 0 })
  monthlyDeposits: number;

  @Field()
  @Column({ type: "int", default: 0 })
  monthlyTransactions: number;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bankAccounts)
  creator: User;

  @OneToMany(() => Transaction, (transaction) => transaction.bankAccount)
  transactions: Transaction[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
