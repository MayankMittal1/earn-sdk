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
const query_1 = require("../graphql/query");
const graphql_1 = require("../graphql");
const _1 = require(".");
function fetchPairInfoVoltage(address) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        if (_1.isStableswap(address)) {
            result = yield graphql_1.stableswapClient.query({
                query: query_1.stablePoolQuery(constants_1.STABLESWAP_POOL_LP_HASH[address.toLowerCase()])
            });
            const tokens = (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.swap) === null || _b === void 0 ? void 0 : _b.tokens;
            const reserves = (_d = (_c = result === null || result === void 0 ? void 0 : result.data) === null || _c === void 0 ? void 0 : _c.swap) === null || _d === void 0 ? void 0 : _d.balances;
            return {
                reserveUSD: ((_f = (_e = result === null || result === void 0 ? void 0 : result.data) === null || _e === void 0 ? void 0 : _e.swap) === null || _f === void 0 ? void 0 : _f.lpTokenSupply) * 1,
                totalSupply: (_h = (_g = result === null || result === void 0 ? void 0 : result.data) === null || _g === void 0 ? void 0 : _g.swap) === null || _h === void 0 ? void 0 : _h.lpTokenSupply,
                tokens,
                totalReserves: reserves
            };
        }
        else {
            result = yield graphql_1.voltageClient.query({
                query: query_1.pairQuery(address)
            });
            return {
                reserveUSD: (_k = (_j = result === null || result === void 0 ? void 0 : result.data) === null || _j === void 0 ? void 0 : _j.pair) === null || _k === void 0 ? void 0 : _k.reserveUSD,
                totalSupply: (_m = (_l = result === null || result === void 0 ? void 0 : result.data) === null || _l === void 0 ? void 0 : _l.pair) === null || _m === void 0 ? void 0 : _m.totalSupply,
                tokens: [(_p = (_o = result === null || result === void 0 ? void 0 : result.data) === null || _o === void 0 ? void 0 : _o.pair) === null || _p === void 0 ? void 0 : _p.token0, (_r = (_q = result === null || result === void 0 ? void 0 : result.data) === null || _q === void 0 ? void 0 : _q.pair) === null || _r === void 0 ? void 0 : _r.token1],
                totalReserves: [(_t = (_s = result === null || result === void 0 ? void 0 : result.data) === null || _s === void 0 ? void 0 : _s.pair) === null || _t === void 0 ? void 0 : _t.reserve0, (_v = (_u = result === null || result === void 0 ? void 0 : result.data) === null || _u === void 0 ? void 0 : _u.pair) === null || _v === void 0 ? void 0 : _v.reserve1]
            };
        }
    });
}
function fetchChefPairInfo(address, networkId) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (networkId) {
            case constants_1.NetworkId.FUSE: {
                return yield fetchPairInfoVoltage(address);
            }
        }
    });
}
exports.default = fetchChefPairInfo;
