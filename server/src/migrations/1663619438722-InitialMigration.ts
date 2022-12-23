import { MigrationInterface, QueryRunner } from 'typeorm'

export class InitialMigration1663619438722 implements MigrationInterface {
  name = 'InitialMigration1663619438722'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`access_token\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`like\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`recipe_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`recipe\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`author\` varchar(255) NOT NULL, \`ingredients\` longtext NOT NULL, \`steps\` longtext NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), FULLTEXT INDEX \`IDX_52f467a1124f1861bdaf15d14e\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`like\` ADD CONSTRAINT \`FK_3001676283541ed4d9290b3c07f\` FOREIGN KEY (\`recipe_id\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_385770dfbf5b275c495dd298546\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_385770dfbf5b275c495dd298546\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_3001676283541ed4d9290b3c07f\``,
    )
    await queryRunner.query(
      `DROP INDEX \`IDX_52f467a1124f1861bdaf15d14e\` ON \`recipe\``,
    )
    await queryRunner.query(`DROP TABLE \`recipe\``)
    await queryRunner.query(`DROP TABLE \`like\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    )
    await queryRunner.query(`DROP TABLE \`user\``)
  }
}
