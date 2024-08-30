import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VersionFile } from './version-file.entity';

@Entity('versions') // Ensure the entity name matches your table name
export class Version {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: string;

  @Column('text')
  release_notes: string;

  @Column({ type: 'timestamptz' })
  release_date: Date;

  @Column({ default: false })
  required: boolean;

  @OneToMany(() => VersionFile, (versionFile) => versionFile.version, { eager: true })
  files: VersionFile[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
