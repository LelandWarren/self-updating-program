import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './entities/version.entity';
import { VersionFile } from './entities/version-file.entity';
import { VersionModule } from './modules/version.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yourusername',
      password: 'yourpassword',
      database: 'self_updating_app',
      entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
      //synchronize: true,
      logging: true, // Enable logging
    }),
    
    VersionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
