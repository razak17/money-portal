import { ObjectType, Field } from "type-graphql";
import {
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { BankAccount } from "./BankAccount";
import { Transaction } from "./Transaction";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  username!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.creator)
  bankAccounts: BankAccount[];

  @OneToMany(() => Transaction, (transaction) => transaction.creator)
  transactions: Transaction[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
