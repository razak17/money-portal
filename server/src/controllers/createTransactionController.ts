import {
  TransactionInput,
  TransactionResponse
} from '../resolvers/transaction';
import {
  validateTransactionMutation,
  validateCategory
} from "../utils/validateTransaction"
import { getConnection } from "typeorm";
import { Transaction } from "../entities/Transaction"
import {
  newDeposit,
  newTransfer,
  newWithdrawal,
} from "../utils/calculateStats";
import { TransactionOptions, withdrawalOptions } from '../types';

export const createTransactionController = async (
  input: TransactionInput,
  bankAccountId: number,
  userId: number | undefined,
) : Promise<TransactionResponse>  => {
  const cb = await getConnection().query(
    `
    select "currentBalance"
    from bank_account
    where bank_account.id = $1
    and bank_account."creatorId" = $2
    `,
    [bankAccountId, userId]
  )
  const  currentBalance = Object.values(cb[0])[0] as number;
  const {amount, type, memo } = input;

  const errors = validateTransactionMutation(amount, type, memo, currentBalance);
  if (errors) {
    return { errors };
  }

  const categoryId = validateCategory(input.type);

  const transaction = await Transaction.create({
    ...input,
    creatorId: userId,
    bankAccountId,
    categoryId,
  }).save();

  if (input.type === TransactionOptions.DEPOSIT) {
    newDeposit(input.amount, bankAccountId, userId);
  } else if (input.type === TransactionOptions.TRANSFER) {
    newTransfer(input.amount, bankAccountId, userId);
  } else if (input.type && withdrawalOptions.includes(input.type)) {
    newWithdrawal(input.amount, bankAccountId, userId);
  }

  return { transaction };

}
