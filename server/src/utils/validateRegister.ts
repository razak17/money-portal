import { UsernamePasswordInput } from "src/resolvers/UsernamePasswordInput";
import { validateEmail } from "./validateEmail";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.trim().length <= 2) {
    return [
      {
        field: "username",
        message: "must be 2 chars or more",
      },
    ];
  }

  if (!validateEmail(options.email)) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include an @ symbol",
      },
    ];
  }

  if (options.password.trim().length <= 2) {
    return [
      {
        field: "password",
        message: "must be 2 chars or more",
      },
    ];
  }

  return null;
};
