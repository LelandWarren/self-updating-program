import { Controller, Get, Query } from '@nestjs/common';
import { VersionService } from 'src/services/version.service';
import { Version } from 'src/entities/version.entity';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get('latest')
  async getLatestVersion(@Query('os') os: string): Promise<Version> {
    const version = await this.versionService.findLatestVersion();
    console.log(version);
    if (!version) {
      return null;
    }

    if (os) {
      version.files = version.files.filter(file => file.os === os);
    }

   
    return version;
  }
}
