export enum AuthRoutes {
  DASHBOARD = "/dashboard/lobby",
  TRANSACTIONS = "/dashboard/accounts/accounts-details/:id",
}

export enum NonAuthRoutes {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  NOT_FOUND = "/404",
}
