import { Test, TestingModule } from '@nestjs/testing';
import { BtcController } from './btc.controller';
import { BtcService } from './btc.service';
import { address } from 'bitcoinjs-lib';
import fetch from 'node-fetch'

jest.mock('node-fetch');

describe('BtcModule', () => {
  let btcController: BtcController;
  let btcService: BtcService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [BtcController],
      providers: [BtcService],
    }).compile();

    btcService = module.get<BtcService>(BtcService);
    btcController = module.get<BtcController>(BtcController);
  });

  describe('BtcController: running methods of class', () => {
    it('btcController.getUtxo calls service', async () => {
      const result = [{}];
      btcService.getUtxo = jest.fn().mockImplementation(() => result);
      expect(await btcController.getUtxo('')).toBe(result);
      expect(btcService.getUtxo).toHaveBeenCalled()
    });

    it('btcController.generateTr calls service', async () => {
      const result = [{}];
      const testData = {
        'amount': 0,
        'from': 'xxxxxyyyy',
        'to': 'xxxxxyyy'
      };
      btcService.generateTr = jest.fn().mockImplementation(() => result);
      expect(await btcController.generateTr(testData)).toBe(result);
      expect(btcService.generateTr).toHaveBeenCalled()
    });
  });

  describe('BtcService: running methods of class', () => {
    it('getUtxo gets utxos', async () => {
      fetch.mockImplementation(()=> 'loh')
      btcService.getUtxo('loh')();
      expect(btcService.getUtxo('')).toBeCalled()
    })
    it('findOptimal', () => {

    })

    it('makeOptimalTr', () => {

    })

    it('generateTr', () => {
      
    })
  })

});
