import DataLoader from "dataloader";
import { BankAccount } from "../entities/BankAccount";

// [1, 78, 8, 9]
// [{id: 1, bankAccount: 'checking'}, {}, {}, {}]
export const createBankAccountLoader = () =>
  new DataLoader<number, BankAccount>(async (bankAccountIds) => {
    const accounts = await BankAccount.findByIds(bankAccountIds as number[]);
    const bankAccountIdToTransaction: Record<number, BankAccount> = {};
    accounts.forEach((acc) => {
      bankAccountIdToTransaction[acc.id] = acc;
    });

    const sortedBankAccounts = bankAccountIds.map(
      (accId) => bankAccountIdToTransaction[accId]
    );
    // console.log("userIds", userIds);
    // console.log("map", userIdToUser);
    // console.log("sortedUsers", sortedUsers);
    return sortedBankAccounts;
  });
