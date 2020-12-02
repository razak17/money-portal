import { getConnection } from "typeorm";

export const deleteDeposit = async (
  oldAmount: number,
  bankAccountId: number,
  userId: number | undefined
) => {
  await getConnection().transaction(async (tm) => {
    await tm.query(
      `
          update bank_account
          set 
          "monthlyDeposits" = "monthlyDeposits" - $4,
          "currentBalance" = "currentBalance" - $4
          "monthlyTransactions" = "monthlyTransactions" - $3,
          where "id" = $1 and "creatorId" = $2
          `,
      [bankAccountId, userId, 1, oldAmount]
    );
  });
};

export const deleteTransfer = async (
  bankAccountId: number,
  userId: number | undefined
) => {
  await getConnection().transaction(async (tm) => {
    await tm.query(
      `
          update bank_account
          set 
          "monthlyTransactions" = "monthlyTransactions" - $3,
          where "id" = $1 and "creatorId" = $2
          `,
      [bankAccountId, userId, 1]
    );
  });
};

export const deleteOther = async (
  oldAmount: number,
  bankAccountId: number,
  userId: number | undefined
) => {
  await getConnection().transaction(async (tm) => {
    await tm.query(
      `
          update bank_account
          set 
          "monthlySpending" = "monthlySpending" - $4,
          "currentBalance" = "currentBalance" + $4,
          "monthlyTransactions" = "monthlyTransactions" - $3
          where "id" = $1 and "creatorId" = $2
          `,
      [bankAccountId, userId, 1, oldAmount]
    );
  });
};
