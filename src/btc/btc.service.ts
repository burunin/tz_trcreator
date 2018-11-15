import { Injectable } from '@nestjs/common';
import { Utxo } from './interfaces/utxo.interface';
import { InputBtc } from './interfaces/input-btc.interface';
import fetch from 'node-fetch';

@Injectable()
export class BtcService {

	private utxos: Utxo[] = [];
	private resultUtxos: Utxo[] = [];
	readonly oneInOutWeight = 225
	readonly oneByteCost = 17
	readonly addInputWeight = 147
	readonly satoshiFromBTC = 0.00000001
	readonly BTCfromSatoshi = 100000000
	private oneInputComission = this.oneInOutWeight * this.oneByteCost * this.satoshiFromBTC;
	private addInputComnission = this.addInputWeight * this.oneByteCost * this.satoshiFromBTC;

	getUtxo(address: string) {
		return fetch(`https://insight.bitpay.com/api/addr/${address}/utxo`)
			.then(res => res.json())
			.then(json => {
				this.utxos = Object.assign(this.utxos, json).sort((a, b) => b.satoshis - a.satoshis)
			})
			.catch(err => console.log(err))
	}
	findOptimal(amount: number) {
		
		let totalUtxos = this.utxos;
		let amountIn = amount;

		let singleChosen: any[] = [];
		let multiChosen: any[] = [];
		
		let comission: number = 0;
		
		totalUtxos.forEach((e) => {
			if ((amount + this.oneInputComission) <= e.amount) {
				singleChosen.push(e);
			} else {
				if (amountIn + this.oneInputComission + multiChosen.length*this.addInputComnission >= e.amount ) {
					amountIn -= e.amount;
					multiChosen.push(e);
				} else if (amountIn >= 0) {
					amountIn -= e.amount;
					multiChosen.push(e);
				}
			}
		})
		this.resultUtxos = (multiChosen.length ? multiChosen : [singleChosen.pop()])
		return this.resultUtxos
	}
	
	makeOptimalTr(body) {
		let comission = this.oneInputComission + 
			( this.resultUtxos.length && this.resultUtxos.length * this.addInputComnission);
		const res = {
			amount_in: body.amount,
			amount_out: body.amount + comission,
			fee: comission,
			totalUtxo: this.utxos.map(a => a.amount),
			resultUtxos: this.resultUtxos.map(a => a.amount)
		}
		return res;
	}

	generateTr(body: InputBtc) {
		this.getUtxo(body.from);
		this.findOptimal(body.amount);
		return this.makeOptimalTr(body);
	}
}
