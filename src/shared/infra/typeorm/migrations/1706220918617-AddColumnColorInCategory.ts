import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnColorInCategory1706220918617
  implements MigrationInterface
{
  name = 'AddColumnColorInCategory1706220918617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Category" ADD "color" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Category" DROP COLUMN "color"`);
  }
}
