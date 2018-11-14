import { AddressBtcDto } from './dto/address-btc.dto';
import { BtcService } from './btc.service';
import { InputAddressDto } from './dto/input-address.dto';
export declare class BtcController {
    private readonly btcService;
    constructor(btcService: BtcService);
    getUtxo(addressBtcDto: AddressBtcDto): Promise<void>;
    createTr(inputAddressDto: InputAddressDto): Promise<void>;
}
