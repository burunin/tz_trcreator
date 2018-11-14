"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const node_fetch_1 = require("node-fetch");
let BtcService = class BtcService {
    constructor() {
        this.utxos = [];
        this.oneInOutWeight = 225;
        this.oneByteCost = 17;
        this.addInputWeight = 147;
        this.satoshiFromBTC = 0.00000001;
    }
    getUtxo(address) {
        return node_fetch_1.default(`https://insight.bitpay.com/api/addr/${address}/utxo`)
            .then(res => res.json())
            .then(json => {
            this.utxos = Object.assign(this.utxos, json).sort((a, b) => b.satoshis - a.satoshis);
        });
    }
    findOptimal(amount) {
        let oneInputComission = this.oneInOutWeight * this.oneByteCost * this.satoshiFromBTC;
        let addInputComnission = this.addInputWeight * this.oneByteCost * this.satoshiFromBTC;
        let totalUtxos = this.utxos;
        let amountIn = amount;
        let singleChosen = [];
        let multiChosen = [];
        let chosenElem = {};
        let comission = 0;
        totalUtxos.forEach((e, i) => {
            if ((amount + oneInputComission) <= e.amount) {
                console.log('1');
                singleChosen.push(e);
            }
            else {
                console.log('2');
                if (amountIn + oneInputComission + multiChosen.length * addInputComnission <= e.amount
                    && amountIn >= 0) {
                    console.log('3');
                    amountIn -= totalUtxos[i].amount;
                    multiChosen.push(totalUtxos[i]);
                }
            }
            comission = oneInputComission + (multiChosen.length ? multiChosen.length * addInputComnission : addInputComnission);
        });
        console.log(comission);
        console.log(singleChosen);
        console.log(multiChosen);
    }
    createTr(body) {
        this.getUtxo(body.from);
        this.findOptimal(body.amount);
    }
};
BtcService = __decorate([
    common_1.Injectable()
], BtcService);
exports.BtcService = BtcService;
//# sourceMappingURL=btc.service.js.map