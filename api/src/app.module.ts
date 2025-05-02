import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvmModule } from './evm/evm.module';
import { CosmosModule } from './cosmos/cosmos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        timeout: 15000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
    EvmModule,
    CosmosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
