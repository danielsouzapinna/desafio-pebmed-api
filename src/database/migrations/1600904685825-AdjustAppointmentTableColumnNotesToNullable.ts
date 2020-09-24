import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustAppointmentTableColumnNotesToNullable1600904685825 implements MigrationInterface {
  name = 'AdjustAppointmentTableColumnNotesToNullable1600904685825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "note" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "note" SET NOT NULL`);
  }
}
