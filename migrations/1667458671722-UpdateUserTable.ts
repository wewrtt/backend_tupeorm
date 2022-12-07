import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTable1667458671722 implements MigrationInterface {
  name = 'UpdateUserTable1667458671722';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`sid\` varchar(10) NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`sid\`
        `);
  }
}
