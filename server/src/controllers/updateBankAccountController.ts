import { BankAccountResponse} from '../resolvers/bankAccount';
import { BankAccount } from '../entities/BankAccount';
import { validateUpdate } from "../utils/validateBankAccount"
import { getConnection } from "typeorm";
import { BankAccountOptions } from "../types"

export const updateBankAccountController = async (
  id: number,
  name: string,
  type: BankAccountOptions,
  lowBalanceAlert: number,
  userId: number | undefined,
) : Promise<BankAccountResponse>  => {
    const oldBankAccount = await BankAccount.findOne({ id, creatorId: userId });
    const errors = validateUpdate(
      name,
      type,
      lowBalanceAlert,
      oldBankAccount?.currentBalance
    );
    if (errors) {
      return { errors };
    }

    const bankAccount = await getConnection()
      .createQueryBuilder()
      .update(BankAccount)
      .set({ name, type, lowBalanceAlert })
      .where("id = :id and creatorId = :creatorId", {
        id,
        creatorId: userId,
      })
      .returning("*")
      .execute()
      .then(response => {
        return response.raw[0];
      })

    return { bankAccount };

}
