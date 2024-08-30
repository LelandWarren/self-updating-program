import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Version } from './version.entity';

@Entity('version_files')
export class VersionFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  os: string;

  @Column()
  download_url: string;

  @Column()
  checksum: string;

  @ManyToOne(() => Version, (version) => version.files)
  @JoinColumn({ name: 'version_id' })  // Explicitly set the foreign key column name
  version: Version;
}
