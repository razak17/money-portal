import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial21609708744695 implements MigrationInterface {
    name = 'Initial21609708744695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "categoryName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`);
        await queryRunner.query(`COMMENT ON COLUMN "transaction_category"."id" IS NULL`);
        await queryRunner.query(`CREATE SEQUENCE "transaction_category_id_seq" OWNED BY "transaction_category"."id"`);
        await queryRunner.query(`ALTER TABLE "transaction_category" ALTER COLUMN "id" SET DEFAULT nextval('transaction_category_id_seq')`);
        await queryRunner.query(`COMMENT ON COLUMN "transaction_category"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "transaction_category" ADD CONSTRAINT "UQ_5d437507983d67b91424053ca78" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "transaction_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_d3951864751c5812e70d033978d"`);
        await queryRunner.query(`ALTER TABLE "transaction_category" DROP CONSTRAINT "UQ_5d437507983d67b91424053ca78"`);
        await queryRunner.query(`COMMENT ON COLUMN "transaction_category"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "transaction_category" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "transaction_category_id_seq"`);
        await queryRunner.query(`COMMENT ON COLUMN "transaction_category"."id" IS NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES "transaction_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "categoryName"`);
    }

}
