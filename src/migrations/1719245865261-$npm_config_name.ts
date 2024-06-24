import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1719245865261 implements MigrationInterface {
    name = ' $npmConfigName1719245865261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "extra" TO "phone2"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_0c952d8ef439579de1e97c01db3" TO "UQ_270323570d81f112ded4456d1d3"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_270323570d81f112ded4456d1d3" TO "UQ_0c952d8ef439579de1e97c01db3"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "phone2" TO "extra"`);
    }

}
