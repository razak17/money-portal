import { PaginatedTransactionsResponse } from '../resolvers/transaction';
import {
  validateTransactionQuery,
  validateFilter,
  validateQuery
} from "../utils/validateTransaction"
import { getConnection } from "typeorm";

export const searchTransactionsController = async (
  bankAccountId: number,
  userId: number | undefined,
  limit: number,
  filter: string | null,
  query: string,
  offset: number,
) : Promise<PaginatedTransactionsResponse>  => {
    const errors = validateTransactionQuery(filter, query);
    if (errors) {
      return {
        errors
      };
    }
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const page = (offset - 1) * limit;
    const realQuery = validateQuery(query);

    const replacements: any[] = [reaLimitPlusOne, page, userId, bankAccountId, realQuery];

    let vFilter =  null;
    if (filter) {
      vFilter = validateFilter(filter);
      replacements.push(vFilter);
    }

    const transactions = await getConnection().query(
    `select t.*
    from transaction t
    ${
      vFilter ?
      `where t."creatorId" = $3 and t."bankAccountId" = $4 and t."memo" like $5 and t."categoryId" = $6` :
      `where t."creatorId" = $3 and t."bankAccountId" = $4 and t."memo" like $5`
    }
    order by t."createdAt" DESC
    limit $1
    offset $2
    `,
      replacements
    );

    return {
      paginatedTransactions: {
        transactions: transactions.slice(0, realLimit),
        hasMore: transactions.length === reaLimitPlusOne,
      }
    }
}
