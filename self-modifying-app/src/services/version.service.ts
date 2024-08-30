import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from '../entities/version.entity';

@Injectable()
export class VersionService {
  constructor(
    @InjectRepository(Version)
    private readonly versionRepository: Repository<Version>,
  ) {}

  async findLatestVersion(): Promise<Version | undefined> {
    const versions = await this.versionRepository.find({
      relations: ['files'],
      order: { release_date: 'DESC' },
      take: 1,
    });
    return versions[0]; // Return the latest version
  }
  

  async createVersion(versionData: Partial<Version>): Promise<Version> {
    const newVersion = this.versionRepository.create(versionData);
    return this.versionRepository.save(newVersion);
  }
}
