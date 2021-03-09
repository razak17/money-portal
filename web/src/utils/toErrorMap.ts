import { FieldError, BankAccountError, TransactionError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[] | BankAccountError[] | TransactionError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach((err: FieldError | BankAccountError | TransactionError) => {
    errorMap[err.field] = err.message;
  });
  return errorMap;
};

