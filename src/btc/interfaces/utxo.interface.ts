export class Utxo {
    readonly address: string;
    readonly txid: string;
    readonly vout: number;
    readonly scriptPubKey: string;
    readonly amount: number;
    readonly satoshis: number;
    readonly height: number;
    readonly confirmations: number;
    constructor({
        address: _address,
        amount: _amount
    }) {
        this.address = _address;
        this.amount = _amount;
    }
}