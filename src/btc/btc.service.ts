import { Injectable } from '@nestjs/common';
import { Utxo } from './interfaces/utxo.interface';
import { InputBtc } from './interfaces/input-btc.interface';
import axios from 'axios';

@Injectable()
export class BtcService {

	public utxos: Utxo[] = [];
	public resultUtxos: Utxo[] = [];
	readonly oneInOutWeight = 225
	readonly oneByteCost = 17
	readonly addInputWeight = 147
	readonly satoshiFromBTC = 0.00000001
	readonly BTCfromSatoshi = 100000000
	private oneInputComission = this.oneInOutWeight * this.oneByteCost * this.satoshiFromBTC;
	private addInputComnission = this.addInputWeight * this.oneByteCost * this.satoshiFromBTC;

	generateTr(body: InputBtc) {
		this.getUtxo(body.from);
		this.findOptimal(body.amount);
		return this.makeOptimalTr(body);
	}

	getUtxo(address: string) {
		if (!address) {
			return 'No address passed, try again';
		}
		return axios.get(`https://insight.bitpay.com/api/addr/${address}/utxo`)
			.then(res => {
				if (res.status == 200) {
					this.utxos = Object.assign(this.utxos, res.data).sort((a, b) => b.satoshis - a.satoshis)
					return this.utxos
				}
				else {
					return res.data;
				}
			})
			.catch(err => {
				return err.response.data
			})
	}
	
	findOptimal(amount: number) {

		let totalUtxos = this.utxos;
		let amountIn = amount;

		let singleChosen: any[] = [];
		let multiChosen: any[] = [];
		let comission: number = 0;
		
		totalUtxos.forEach((e) => {
			if (e.amount && (amount + this.oneInputComission) <= e.amount) {
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
		if (multiChosen.length) {
			this.resultUtxos = multiChosen
		} else if (singleChosen.length) {
			this.resultUtxos = [singleChosen.pop()]
		} else {
			this.resultUtxos = []
		}
		return this.resultUtxos
	}
	
	makeOptimalTr(body) {
		if (!body.amount) {
			return 'No amount specified'
		}
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
}
