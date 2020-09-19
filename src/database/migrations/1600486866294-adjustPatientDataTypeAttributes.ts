import { MigrationInterface, QueryRunner } from 'typeorm';

export default class adjustPatientDataTypeAttributes1600486866294 implements MigrationInterface {
  name = 'adjustPatientDataTypeAttributes1600486866294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "patients" ADD "height" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "patients" ADD "weight" double precision NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "patients" ADD "weight" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "height"`);
    await queryRunner.query(`ALTER TABLE "patients" ADD "height" integer NOT NULL`);
  }
}
