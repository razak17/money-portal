import { TransactionInput, TransactionResponse } from '../resolvers/transaction';
import { validateCategory, validateTransactionMutation } from "../utils/validateTransaction"
import { getConnection } from "typeorm";
import { Transaction } from "../entities/Transaction"
import {
  updateDeposit,
  updateTransfer,
  updateWithdrawal,
} from "../utils/updateStats";
import { TransactionOptions, withdrawalOptions } from '../types';

export const updateTransactionController = async (
  input: TransactionInput,
  bankAccountId: number,
  userId: number | undefined,
  id: number,
) : Promise<TransactionResponse>  => {
  const { amount, type, memo } = input;

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

  const errors = validateTransactionMutation(amount, type, memo, currentBalance);
  if (errors) {
    return { errors };
  }

  const oldTransaction = await Transaction.findOne({
    where: { id, creatorId: userId, bankAccountId },
  });

  const vFilter = validateCategory(input.type);
  console.log("VFFFF", vFilter);


  const result = await getConnection()
    .createQueryBuilder()
    .update(Transaction)
    .set({ amount, type, memo, categoryId: vFilter })
    .where(
      "id = :id and bankAccountId = :bankAccountId and creatorId = :creatorId",
      {
        id,
        bankAccountId,
        creatorId: userId,
      }
    )
    .returning("*")
    .execute();

  if (oldTransaction?.type === TransactionOptions.DEPOSIT) {
    updateDeposit(oldTransaction.amount, amount, type, bankAccountId, userId);
  } else if (oldTransaction?.type === TransactionOptions.TRANSFER) {
    updateTransfer(amount, type, bankAccountId, userId);
  } else if (
    oldTransaction &&
    withdrawalOptions.includes(oldTransaction?.type)
  ) {
    updateWithdrawal(
      oldTransaction.amount,
      amount,
      type,
      bankAccountId,
      userId
    );
  }

  return result.raw;
}

