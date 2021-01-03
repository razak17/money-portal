import {
  PaginatedTransactionsResponse
} from '../resolvers/transaction';
import {
  validateTransactionQuery,
  validateFilter,
  validateQuery
} from "../utils/validateTransaction"
import { getConnection } from "typeorm";
import { ALL } from '../constants';

export const getTransactionsController = async (
  bankAccountId: number,
  userId: number | undefined,
  limit: number,
  offset: number,
  filter: string | null,
  query: string | null,
) : Promise<PaginatedTransactionsResponse | undefined>  => {
    const errors = validateTransactionQuery(filter);
    if (errors) {
      return {
        errors
      };
    }
    const realLimit = Math.min(500, limit);
    const reaLimitPlusOne = realLimit + 1;
    const page = (offset - 1) * limit;

    const replacements: any[] = [reaLimitPlusOne, page, userId, bankAccountId];

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
      `where t."creatorId" = $3 and t."bankAccountId" = $4 and t."categoryId" = $5 and t."memo" like $6`:
      vFilter ?
      `where t."creatorId" = $3 and t."bankAccountId" = $4 and t."categoryId" = $5`:
      realQuery ?
      `where t."creatorId" = $3 and t."bankAccountId" = $4 and t."memo" like $5`:
      `where t."creatorId" = $3 and t."bankAccountId" = $4`
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
