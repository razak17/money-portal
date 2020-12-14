import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1607611621133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      insert into transaction_category (id, name) values (1, 'Withdrawals');
      insert into transaction_category (id, name) values (2, 'Deposits');
      insert into transaction_category (id, name) values (3, 'Transfers');
    `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
