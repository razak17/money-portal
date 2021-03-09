import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionCategories1609706092383
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO transaction_category (id, "name") VALUES (1, 'withdrawals');
            INSERT INTO transaction_category (id, "name") VALUES (2, 'deposits');
            INSERT INTO transaction_category (id, "name") VALUES (3, 'transfers');
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
