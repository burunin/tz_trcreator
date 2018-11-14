"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const address_btc_dto_1 = require("./dto/address-btc.dto");
const btc_service_1 = require("./btc.service");
const input_address_dto_1 = require("./dto/input-address.dto");
let BtcController = class BtcController {
    constructor(btcService) {
        this.btcService = btcService;
    }
    getUtxo(addressBtcDto) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    createTr(inputAddressDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.btcService.createTr(inputAddressDto);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_btc_dto_1.AddressBtcDto]),
    __metadata("design:returntype", Promise)
], BtcController.prototype, "getUtxo", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_address_dto_1.InputAddressDto]),
    __metadata("design:returntype", Promise)
], BtcController.prototype, "createTr", null);
BtcController = __decorate([
    common_1.Controller('tx'),
    __metadata("design:paramtypes", [btc_service_1.BtcService])
], BtcController);
exports.BtcController = BtcController;
//# sourceMappingURL=btc.controller.js.map