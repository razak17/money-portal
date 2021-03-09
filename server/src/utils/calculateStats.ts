import { getConnection } from "typeorm";

export const newDeposit = async (
  amount: number,
  bankAccountId: number,
  userId: number | undefined,
) => {
  await getConnection().transaction(async (tm) => {
    await tm.query(
      `
          update bank_account
          set
          "monthlyTransactions" = "monthlyTransactions" + $3,
          "monthlyDeposits" = "monthlyDeposits" + $4,
          "currentBalance" = "currentBalance" + $4
          where "id" = $1 and "creatorId" = $2
          `,
      [bankAccountId, userId, 1, amount]
    );
  });
};

export const newTransfer = async (
  amount: number,
  bankAccountId: number,
  userId: number | undefined,
) => {
  await getConnection().transaction(async (tm) => {
    await tm.query(
      `
          update bank_account
          set
          "monthlyTransactions" = "monthlyTransactions" + $3,
          "currentBalance" = "currentBalance" - $4
          where "id" = $1 and "creatorId" = $2
          `,
      [bankAccountId, userId, 1, amount]
    );
  });
};

export const newWithdrawal = async (
  amount: number,
  bankAccountId: number,
  userId: number | undefined,
) => {
  await getConnection().transaction(async (tm) => {
    await tm.query(
      `
          update bank_account
          set
          "monthlyTransactions" = "monthlyTransactions" + $3,
          "monthlySpending" = "monthlySpending" + $4,
          "currentBalance" = "currentBalance" - $4
          where "id" = $1 and "creatorId" = $2
          `,
      [bankAccountId, userId, 1, amount]
    );
  });
};
