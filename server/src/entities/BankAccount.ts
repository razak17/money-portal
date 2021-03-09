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
import { BankAccountOptions } from "../types";

@ObjectType()
@Entity()
export class BankAccount extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 20 })
  name!: string;

  @Field()
  @Column({
    type: "enum",
    enum: BankAccountOptions,
    default: BankAccountOptions.CHECKING,
  })
  type!: BankAccountOptions;

  @Field()
  @Column({ type: "float", default: 0 })
  startingBalance!: number;

  @Field()
  @Column({ type: "float", default: 0 })
  lowBalanceAlert!: number;

  @Field()
  @Column({ type: "float", default: 0 })
  currentBalance!: number;

  @Field()
  @Column({ type: "float", default: 0 })
  monthlySpending: number;

  @Field()
  @Column({ type: "float", default: 0 })
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
