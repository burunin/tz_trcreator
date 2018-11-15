import { Module } from '@nestjs/common';
import { BtcController } from './btc/btc.controller'; 
import { BtcService } from './btc/btc.service';

@Module({
  controllers: [BtcController],
  providers: [BtcService],
})
export class BtcModule {}
