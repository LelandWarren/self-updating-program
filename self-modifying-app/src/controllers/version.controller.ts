import { Controller, Get, Query } from '@nestjs/common';
import { VersionService } from 'src/services/version.service';
import { Version } from '../entities/version.entity';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get('latest')
  async getLatestVersion(@Query('os') os: string): Promise<Version> {
    if (!os) {
      throw new Error('OS parameter is required');
    }

    const version = await this.versionService.findLatestVersionByOS(os);

    if (!version) {
      throw new Error(`No version found for OS: ${os}`);
    }

    return version;
  }
}
