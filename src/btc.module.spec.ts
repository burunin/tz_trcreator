import { Test, TestingModule } from "@nestjs/testing";
import { BtcController } from "./btc/btc.controller";
import { BtcService } from "./btc/btc.service";
import { Utxo } from "./btc/interfaces/utxo.interface";
jest.mock("axios");

describe("BtcModule", () => {
	let btcController: BtcController;
	let btcService: BtcService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [BtcController],
			providers: [BtcService]
		}).compile();

		btcService = module.get<BtcService>(BtcService);
		btcController = module.get<BtcController>(BtcController);
	});

	describe("BtcController: running methods of class", () => {
		it("btcController.getUtxo calls service", async () => {
			const result = [{}];
			btcService.getUtxo = jest.fn().mockImplementation(() => result);
			expect(await btcController.getUtxo("")).toBe("No address present, try again");
			expect(await btcController.getUtxo("pepepep")).toBe(result)
			expect(btcService.getUtxo).toHaveBeenCalled();
		});

		it("btcController.generateTr calls service", async () => {
			const result = [{}];
			const testData = {
				amount: 0,
				from: "xxxxxyyyy",
				to: "xxxxxyyy"
			};
			btcService.generateTr = jest.fn().mockImplementation(() => result);
			expect(await btcController.generateTr(testData)).toBe(result);
			expect(btcService.generateTr).toHaveBeenCalled();
		});
	});



	describe("BtcService: running methods of class", () => {

		it("getUtxo", async () => {

			const result = [{}];
			expect(await btcService.getUtxo("")).toBe("No address passed, try again");
			btcService.getUtxo = jest.fn().mockImplementation(() => result);
			expect(await btcService.getUtxo("")).toBe(result);
			expect(btcService.getUtxo).toHaveBeenCalled();
		});

		it("findOptimal", async () => {

			btcService.utxos = [new Utxo({
				address: 'fff',
				amount: 100
			}), new Utxo({
				address: 'ddf',
				amount: 200
			}), new Utxo({
				address: '1ff',
				amount: 400
			})]

			const result = btcService.utxos;
			expect(btcService.findOptimal(555)).toEqual(result)
		});

		it("makeOptimalTr", () => {

			const oneInputComission = 225 * 17 * 0.00000001;
			let comission = oneInputComission;

			btcService.utxos = [
				new Utxo({
					address: 'fff',
					amount: 0.11
				}),
				new Utxo({
					address: 'ddf',
					amount: 0.2
				}), 
				new Utxo({
					address: '1ff',
					amount: 0.4
				})]

			const body = {
				amount: 0.01,
				from: "eiiidi",
				to: "dkdkdkkdkd"
			};
			const body2 = {
				from: 'dkdkdd',
				to: 'sksksksks'
			};
			const body3 = {
				amount: 0.2,
				from: "eiiidi",
				to: "dkdkdkkdkd"
			};
			const res = {
				amount_in: body.amount,
				amount_out: body.amount + comission,
				fee: comission,
				resultUtxos: [],
				totalUtxo: btcService.utxos.map(a => a.amount),
			};
			const res2 = {
				amount_in: body3.amount,
				amount_out: body3.amount + comission,
				fee: comission,
				totalUtxo: btcService.utxos.map(a => a.amount),
				resultUtxos: []
			};

			expect(btcService.makeOptimalTr(body)).toEqual(res);
			expect(btcService.makeOptimalTr(body2)).toEqual("No amount specified");
			const res3 = {
				amount_in: body3.amount,
				amount_out: body3.amount + comission,
				fee: comission,
				totalUtxo: btcService.utxos.map(a => a.amount),
				resultUtxos: btcService.resultUtxos.map(a => a.amount)
			};
			expect(btcService.makeOptimalTr(body3)).toEqual(res3)

		});

		it("generateTr", async () => {
			const result = [{}];
			const testData = { amount: 0, from: "xxxxxyyyy", to: "xxxxxyyy" };
			btcService.getUtxo = jest.fn().mockImplementation(() => result);
			btcService.findOptimal = jest.fn().mockImplementation(() => result);
			btcService.makeOptimalTr = jest.fn().mockImplementation(() => result);
			expect(await btcService.generateTr(testData)).toBe(result);
			expect(btcService.getUtxo).toHaveBeenCalled();
			expect(btcService.findOptimal).toHaveBeenCalled();
			expect(btcService.makeOptimalTr).toHaveBeenCalled();
		});
	});
});
