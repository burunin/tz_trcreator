import {Controller, Get, Post, Body, Query} from '@nestjs/common'
import { AddressBtcDto } from './dto/address-btc.dto';
import { BtcService } from './btc.service';
import { InputAddressDto } from './dto/input-address.dto';
import { Btc } from './interfaces/btc.interface';

@Controller('tx')
export class BtcController {
    constructor( private readonly btcService: BtcService) {}

    @Get()
    async getUtxo(@Query("address") addressBtcDto: AddressBtcDto["address"]) {
        if (!addressBtcDto) {
             return "No address present, try again"
        }
        return this.btcService.getUtxo(addressBtcDto)
    }

    @Post() 
    async generateTr(@Body() inputAddressDto: InputAddressDto) {
        return this.btcService.generateTr(inputAddressDto);
    }

}