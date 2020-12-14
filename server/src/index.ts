import "reflect-metadata";
import express from "express";
import path from "path";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { Transaction } from "./entities/Transaction";
import { BankAccount } from "./entities/BankAccount";
import { User } from "./entities/User";
import { TransactionCategory } from "./entities/TransactionCategory";
import { TransactionResolver } from "./resolvers/transaction";
import { BankAccountResolver } from "./resolvers/bankAccount";
import { TransactionCategoryResolver } from "./resolvers/transactionCategory";
import { UserResolver } from "./resolvers/user";
import { __prod__, COOKIE_NAME } from "./constants";
import { createUserLoader } from "./utils/createUserLoader";
import { createBankAccountLoader } from "./utils/createBankAccountLoader";
import { createTransactionCategoryLoader } from "./utils/createTransactionCategoryLoader";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "moneyportal",
    username: "postgres",
    password: "",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Transaction, BankAccount, User, TransactionCategory],
  });

  await conn.runMigrations();

  // await BankAccount.delete({});

  const PORT = 4000;
  const app = express();

  const redis: any = new Redis();
  const RedisStore = connectRedis(session);

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        secure: __prod__, // only https
        sameSite: "lax", // csrf
      },
      saveUninitialized: false,
      secret: "heickbrownfoxmsoverhelazydogjreleverjelrell",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        TransactionResolver,
        BankAccountResolver,
        UserResolver,
        TransactionCategoryResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      bankAccountLoader: createBankAccountLoader(),
      transactionCategoryLoader: createTransactionCategoryLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.get("/", (_, res) => {
    res.send("Hello World");
  });
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

main().catch((err) => {
  console.log("Main Errors", err);
});
