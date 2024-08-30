import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionService } from 'src/services/version.service';
import { VersionController } from 'src/controllers/version.controller';
import { Version } from '../entities/version.entity';
import { VersionFile } from '../entities/version-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Version, VersionFile])],
  providers: [VersionService],
  controllers: [VersionController],
})
export class VersionModule {}
