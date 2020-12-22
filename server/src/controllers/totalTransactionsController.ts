import { TotalTransactionsResponse } from '../resolvers/transaction';
import {
  validateTransactionQuery,
  validateFilter
} from "../utils/validateTransaction"
import { getConnection } from "typeorm";

export const totalTransactionsController = async (
  userId: number | undefined,
  bankAccountId: number,
  filter: string | null,
) : Promise<TotalTransactionsResponse>  => {

  const errors = validateTransactionQuery(filter);
  if (errors) {
    return { errors }
  }

  const replacements: any[] = [userId, bankAccountId];

  let vFilter = null;
  if (filter) {
    vFilter = validateFilter(filter);
    replacements.push(vFilter);
  }

  const transactions = await getConnection().query(
  `select t.*
  from transaction t
  ${
    vFilter ?
    `where t."creatorId" = $1 and t."bankAccountId" = $2 and t."categoryId" = $3`:
    `where t."creatorId" = $1 and t."bankAccountId" = $2`
  }
  order by t."createdAt" DESC
  `,
    replacements
  );

  return { count: transactions.length };
}

