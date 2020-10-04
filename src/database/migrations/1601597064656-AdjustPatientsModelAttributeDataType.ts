import {MigrationInterface, QueryRunner} from "typeorm";

export class AdjustPatientsModelAttributeDataType1601597064656 implements MigrationInterface {
    name = 'AdjustPatientsModelAttributeDataType1601597064656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "height" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "weight" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "weight" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "patients" ADD "height" double precision NOT NULL`);
    }

}
