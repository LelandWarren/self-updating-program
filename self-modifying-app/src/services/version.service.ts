import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Version } from '../entities/version.entity';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
  ) {}

  async findLatestVersionByOS(os: string): Promise<Version> {
       // Query for the latest version that has files for the specified OS
       const latestVersionWithFilesForOS = await this.versionRepository.createQueryBuilder('version')
       .leftJoinAndSelect('version.files', 'file', 'file.os = :os', { os })
       .where('file.os = :os', { os })
       .orderBy('version.release_date', 'DESC')
       .getOne();
 
     if (latestVersionWithFilesForOS) {
       return latestVersionWithFilesForOS;
     }

     
  }
}
