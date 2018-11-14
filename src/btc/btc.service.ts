import { Injectable } from '@nestjs/common';
// import { Btc } from './interfaces/btc.interface'
import { Utxo } from './interfaces/utxo.interface'
import { InputBtc } from './interfaces/input-btc.interface'
import fetch from 'node-fetch'

@Injectable()
export class BtcService {

	private utxos: Utxo[] = [];
	readonly oneInOutWeight = 225
	readonly oneByteCost = 17
	readonly addInputWeight = 147
	readonly satoshiFromBTC = 0.00000001

	getUtxo(address: string) {
		return fetch(`https://insight.bitpay.com/api/addr/${address}/utxo`)
			.then(res => res.json())
			.then(json => {
				this.utxos = Object.assign(this.utxos, json).sort((a, b) => b.satoshis - a.satoshis)
			})
	}

	findOptimal(amount: number) {
		let oneInputComission = this.oneInOutWeight * this.oneByteCost * this.satoshiFromBTC;
		let addInputComnission = this.addInputWeight * this.oneByteCost * this.satoshiFromBTC;
		let totalUtxos = this.utxos;
		let amountIn = amount;
		let singleChosen: any[] = [];
		let multiChosen: any[] = [];
		let chosenElem: {} = {};
		
		let comission: number = 0;
		
		totalUtxos.forEach((e) => {
			if ((amount + oneInputComission) <= e.amount) {
				singleChosen.push(e);
			} else {
				if (amountIn + oneInputComission + multiChosen.length*addInputComnission >= e.amount ) {
					amountIn -= e.amount;
					multiChosen.push(e);
				} else if (amountIn >= 0) {
					amountIn -= e.amount;
					multiChosen.push(e);
					// multiChosen.push(e);
				}
			}
		})
		comission = oneInputComission + ( multiChosen.length && multiChosen.length*addInputComnission  )
		// [0.1, 0.3, 0.2, 0.03, 0.04, 0.4, 0.5]
		// Нужно отправить 0.55
		// [0.5, 0.1]

		
	}

	createTr(body: InputBtc) {
		this.getUtxo(body.from)
		this.findOptimal(body.amount)
	}
}
