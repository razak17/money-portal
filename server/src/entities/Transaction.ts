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
import { TransactionCategory } from "./TransactionCategory";
import { TransactionOptions } from "../types";

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "float", default: 0 })
  amount!: number;

  @Field()
  @Column({
    type: "enum",
    enum: TransactionOptions,
    default: TransactionOptions.CASH_WITHDRAWAL,
  })
  type!: TransactionOptions;

  @Field()
  @Column({ length: 20 })
  memo!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @Column()
  bankAccountId!: number;

  @Field()
  @Column()
  categoryId!: number;

  @Field()
  @Column()
  categoryName!: string;

  @ManyToOne(() => User, (user) => user.transactions)
  creator: User;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transactions, {
    onDelete: "CASCADE",
  })
  bankAccount: BankAccount;

  @ManyToOne(() => TransactionCategory, (category) => category.transactions)
  category: TransactionCategory;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
