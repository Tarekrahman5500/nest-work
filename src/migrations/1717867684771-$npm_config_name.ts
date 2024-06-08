import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1717867684771 implements MigrationInterface {
    name = ' $npmConfigName1717867684771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "extra" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_0c952d8ef439579de1e97c01db3" UNIQUE ("extra")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_0c952d8ef439579de1e97c01db3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "extra"`);
    }

}
