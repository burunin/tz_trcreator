import { InputBtc } from './interfaces/input-btc.interface';
export declare class BtcService {
    private utxos;
    readonly oneInOutWeight = 225;
    readonly oneByteCost = 17;
    readonly addInputWeight = 147;
    readonly satoshiFromBTC = 1e-8;
    getUtxo(address: string): any;
    findOptimal(amount: number): void;
    createTr(body: InputBtc): void;
}
