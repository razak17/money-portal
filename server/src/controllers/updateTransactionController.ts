import {
  TransactionInput,
  TransactionResponse,
} from "../resolvers/transaction";
import {
  validateCategory,
  validateTransactionMutation,
} from "../utils/validateTransaction";
import { getConnection } from "typeorm";
import { Transaction } from "../entities/Transaction";
import { TransactionCategory } from "../entities/TransactionCategory";
import {
  updateDeposit,
  updateTransfer,
  updateWithdrawal,
} from "../utils/updateStats";
import { TransactionOptions, withdrawalOptions } from "../types";

export const updateTransactionController = async (
  input: TransactionInput,
  bankAccountId: number,
  userId: number | undefined,
  id: number
): Promise<TransactionResponse> => {
  const { amount, type, memo } = input;

  const cb = await getConnection().query(
    `
    select "currentBalance"
    from bank_account
    where bank_account.id = $1
    and bank_account."creatorId" = $2
    `,
    [bankAccountId, userId]
  );
  const currentBalance = Object.values(cb[0])[0] as number;

  const errors = validateTransactionMutation(
    amount,
    type,
    memo,
    currentBalance
  );
  if (errors) {
    return { errors };
  }

  const oldTransaction = await Transaction.findOne({
    where: { id, creatorId: userId, bankAccountId },
  });

  const categoryName = validateCategory(input.type);
  const [transactionCategory] = await TransactionCategory.find({
    where: { name: categoryName },
  });

  const transaction = await getConnection()
    .createQueryBuilder()
    .update(Transaction)
    .set({
      amount,
      type,
      memo,
      categoryName,
      categoryId: transactionCategory.id,
    })
    .where(
      "id = :id and bankAccountId = :bankAccountId and creatorId = :creatorId",
      {
        id,
        bankAccountId,
        creatorId: userId,
      }
    )
    .returning("*")
    .execute()
    .then((response) => {
      return response.raw[0];
    });

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

  return { transaction };
};
