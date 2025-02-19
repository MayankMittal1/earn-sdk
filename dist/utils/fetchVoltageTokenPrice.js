"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const graphql_1 = require("../graphql");
const query_1 = require("../graphql/query");
function fetchTokenPriceVoltage(address) {
    return graphql_1.voltageClient.query({
        query: query_1.tokenPriceQuery(address)
    });
}
function fetchVoltageTokenPrice(address, networkId) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        if (!address)
            return;
        switch (networkId) {
            case constants_1.NetworkId.FUSE: {
                const result = yield fetchTokenPriceVoltage(address);
                return ((_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.derivedETH) * ((_d = (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.bundle) === null || _d === void 0 ? void 0 : _d.ethPrice);
            }
        }
    });
}
exports.default = fetchVoltageTokenPrice;
