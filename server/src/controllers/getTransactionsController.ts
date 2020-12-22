import {
  PaginatedTransactionsResponse
} from '../resolvers/transaction';
import {
  validateTransactionQuery,
  validateFilter
} from "../utils/validateTransaction"
import { getConnection } from "typeorm";

export const getTransactions = async (
  bankAccountId: number,
  userId: number | undefined,
  limit: number,
  filter: string | null,
  offset: number,
) : Promise<PaginatedTransactionsResponse>  => {
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
    if (filter) {
      vFilter = validateFilter(filter);
      replacements.push(vFilter);
    }

    const transactions = await getConnection().query(
    `select t.*
    from transaction t
    ${
      vFilter ?
      `where t."creatorId" = $3 and t."bankAccountId" = $4 and t."categoryId" = $5`:
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
