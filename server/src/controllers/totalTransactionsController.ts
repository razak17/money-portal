import { TotalTransactionsResponse } from '../resolvers/transaction';
import {
  validateTransactionQuery,
  validateFilter,
  validateQuery
} from "../utils/validateTransaction"
import { getConnection } from "typeorm";
import { ALL } from '../constants';

export const totalTransactionsController = async (
  userId: number | undefined,
  bankAccountId: number,
  filter: string | null,
  query: string | null,
) : Promise<TotalTransactionsResponse>  => {
  const errors = validateTransactionQuery(filter);
  if (errors) {
    return { errors }
  }

  const replacements: any[] = [userId, bankAccountId];

  let vFilter = null;
  if (filter && filter != ALL) {
    vFilter = validateFilter(filter);
    replacements.push(vFilter);
  }

  let realQuery = null;
  if (query) {
    realQuery = validateQuery(query);
    realQuery ? replacements.push(realQuery) : "";
  }

  const transactions = await getConnection().query(
  `select t.*
  from transaction t
  ${
    vFilter && realQuery ?
    `where t."creatorId" = $1 and t."bankAccountId" = $2 and t."categoryId" = $3 and t."memo" like $4`:
    vFilter ?
    `where t."creatorId" = $1 and t."bankAccountId" = $2 and t."categoryId" = $3`:
    realQuery ?
    `where t."creatorId" = $1 and t."bankAccountId" = $2 and t."memo" like $3`:
    `where t."creatorId" = $1 and t."bankAccountId" = $2`
  }
  order by t."createdAt" DESC
  `,
    replacements
  );

  return { count: transactions.length };
}

