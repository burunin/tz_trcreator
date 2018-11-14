import { Module } from '@nestjs/common';
import { BtcController } from './btc/btc.controller'; 
// import { AppController } from './app.controller';
import { BtcService } from './btc/btc.service';
// import { AppService } from './app.service';

@Module({
  controllers: [BtcController],
  providers: [BtcService],
})
export class AppModule {}
