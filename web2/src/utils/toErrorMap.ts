import { FieldError, BankAccountError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[] | BankAccountError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach((err: FieldError | BankAccountError) => {
    errorMap[err.field] = err.message;
  });
  return errorMap;
};
