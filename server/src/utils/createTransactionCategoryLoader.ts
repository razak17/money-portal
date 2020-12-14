import DataLoader from "dataloader";
import { TransactionCategory } from "../entities/TransactionCategory";

// [1, 78, 8, 9]
// [{id: 1, category: 'Withdrawals'}, {}, {}, {}]
export const createTransactionCategoryLoader = () =>
  new DataLoader<number, TransactionCategory>(
    async (TransactionCategoryIds) => {
      const categories = await TransactionCategory.findByIds(
        TransactionCategoryIds as number[]
      );
      const TransactionCategoryIdToTransaction: Record<
        number,
        TransactionCategory
      > = {};
      categories.forEach((cat) => {
        TransactionCategoryIdToTransaction[cat.id] = cat;
      });

      const sortedTransactionCategories = TransactionCategoryIds.map(
        (catId) => TransactionCategoryIdToTransaction[catId]
      );
      // console.log("TransactionCategoryIds", TransactionCategoryIds);
      // console.log("map", TransactionCategoryIdToTransaction);
      // console.log("sortedUsers", sortedTransactionCategories);
      return sortedTransactionCategories;
    }
  );
