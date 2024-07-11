import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1720738381415 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "users" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "name" varchar NOT NULL,
            "email" varchar NOT NULL,
            "password" varchar NOT NULL,
            "created_at" datetime NOT NULL DEFAULT (datetime('now')),
            "updated_at" datetime NOT NULL DEFAULT (datetime('now'))
        );    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "users";
    `);
  }
}
