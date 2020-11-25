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
import { BankAccountResolver } from "./resolvers/bankAccount";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "moneyportal",
    username: "postgres",
    password: "",
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Transaction, BankAccount],
  });

  const app = express();
  const PORT = 4000;

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TransactionResolver, BankAccountResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
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
