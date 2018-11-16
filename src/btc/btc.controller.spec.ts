import { Test, TestingModule } from "@nestjs/testing";
import { BtcController } from "./btc.controller";
import { BtcService } from "./btc.service";
import { formatWithOptions } from "util";
import { Btc } from "./interfaces/btc.interface";
import axios from "axios";
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
      expect(await btcController.getUtxo("")).toBe(result);
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
    it("works with promises", () => {
      expect.assertions(1);
      expect(btcService.getUtxo("dd")).toEqual([]);
    });

    it("findOptimal", async () => {
      let totalUtxos = [
        { amount: 0 },
        { amount: 0.11 },
        { amount: 0.22 },
        { amount: 0.33 }
      ];
      let amountIn = 0.1;

      let singleChosen: any[] = [];
      let multiChosen: any[] = [];

      let comission: number = 0;
      totalUtxos.forEach = jest
        .fn()
        .mockImplementation(() => [{ amount: 0.11 }]);
      const result = [{}];
      jest.spyOn(btcService, "findOptimal").mockImplementation(() => result);

      expect(await btcService.findOptimal(5)).toBe(result);
      expect(btcService.findOptimal(5)).toEqual([{}]);
    });

    it("makeOptimalTr", () => {
      const oneInputComission = 225 * 17 * 0.00000001;
      const addInputComnission = 147 * 17 * 0.00000001;
      let comission = oneInputComission;
      const body = {
        amount: 440,
        from: "eiiidi",
        to: "dkdkdkkdkd"
      };

      const res = {
        amount_in: body.amount,
        amount_out: body.amount + comission,
        fee: comission,
        totalUtxo: [],
        resultUtxos: []
      };
      expect(btcService.makeOptimalTr(body)).toEqual(res);
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
