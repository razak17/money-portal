import "reflect-metadata";
import express from "express";
import path from "path";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TransactionResolver } from "./resolvers/transaction";
import { createConnection } from "typeorm";
import { Transaction } from "./entities/Transaction";
import { BankAccount } from "./entities/BankAccount";
import { User } from "./entities/User";
import { BankAccountResolver } from "./resolvers/bankAccount";
import { __prod__, COOKIE_NAME } from './constants';
import Redis from 'ioredis';
import session from "express-session";
import connectRedis from "connect-redis";
import { UserResolver } from './resolvers/user';


const main = async () => {
  await createConnection({
    type: "postgres",
    database: "moneyportal",
    username: "postgres",
    password: "",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Transaction, BankAccount, User],
  });

  const app = express();
  const PORT = 4000;

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
      resolvers: [TransactionResolver, BankAccountResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis
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
