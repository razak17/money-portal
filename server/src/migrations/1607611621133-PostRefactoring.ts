import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1607611621133 implements MigrationInterface {
  public async up(_: QueryRunner): Promise<void> {
    // queryRunner.query();
  }

  public async down(_: QueryRunner): Promise<void> {}
}
