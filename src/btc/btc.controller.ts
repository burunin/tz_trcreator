import {Controller, Get, Post, Body, Query} from '@nestjs/common'
import { AddressBtcDto } from './dto/address-btc.dto';
import { BtcService } from './btc.service';
import { InputAddressDto } from './dto/input-address.dto';
import { Btc } from './interfaces/btc.interface';

@Controller('tx')
export class BtcController {
    constructor( private readonly btcService: BtcService) {}

    @Get()
    async getUtxo(@Query("address") addressBtcDto: AddressBtcDto) {
        // return this.btcService.getUtxo(addressBtcDto)
    }

    @Post() 
    async createTr(@Body() inputAddressDto: InputAddressDto) {
        return this.btcService.createTr(inputAddressDto);
    }

}