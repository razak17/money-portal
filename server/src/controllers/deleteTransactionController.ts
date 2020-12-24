import { Transaction } from "../entities/Transaction"
import {
  deleteDeposit,
  deleteTransfer,
  deleteWithdrawal,
} from "../utils/deleteStats";
import { TransactionOptions, withdrawalOptions } from '../types';

export const deleteTransactionController = async (
  id: number,
  bankAccountId: number,
  userId: number | undefined,
) : Promise<boolean>  => {
  const transaction = await Transaction.findOne({
    where: { id, creatorId: userId, bankAccountId },
  });

  await Transaction.delete({ id, creatorId: userId, bankAccountId });

  if (transaction?.type === TransactionOptions.DEPOSIT) {
    deleteDeposit(transaction.amount, bankAccountId, userId);
  } else if (transaction?.type === TransactionOptions.TRANSFER) {
    deleteTransfer(bankAccountId, userId);
  } else if (transaction && withdrawalOptions.includes(transaction?.type)) {
    deleteWithdrawal(transaction.amount, bankAccountId, userId);
  }

  return true;
}

