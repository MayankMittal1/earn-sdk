"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STABLESWAP_POOLS = exports.STABLESWAP_POOL_LP_HASH = exports.LIQUID_STAKING = exports.USDC_V2 = exports.WFUSE = exports.sFUSE = exports.FUSD_V3 = exports.FUSD = exports.VOLT = exports.xVOLT = exports.MASTERCHEF_V3_SUBGRAPH_URL = exports.MASTERCHEF_V2_SUBGRAPH_URL = exports.MASTERCHEF_V3_ADDRESS = exports.MASTERCHEF_V2_ADDRESS = exports.STABLESWAP_SUBGRAPH_URL = exports.PANCAKESWAP_SUBGRAPH_URL = exports.VOLTAGE_SUBGRAPH_URL = exports.FUSESWAP_SUBGRAPH_URL = exports.UNISWAP_SUBGRAPH_URL = exports.NetworkId = void 0;
var NetworkId;
(function (NetworkId) {
    NetworkId[NetworkId["ETHEREUM"] = 1] = "ETHEREUM";
    NetworkId[NetworkId["BSC"] = 56] = "BSC";
    NetworkId[NetworkId["FUSE"] = 122] = "FUSE";
})(NetworkId = exports.NetworkId || (exports.NetworkId = {}));
exports.UNISWAP_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
exports.FUSESWAP_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/126e6c43e26f28a5e5a8c8e216edbb89/subgraphs/id/8M4V5DnbjSWzYjDt9XUTZsiqX2cXWVcTd9nPw68NJdN4';
exports.VOLTAGE_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/126e6c43e26f28a5e5a8c8e216edbb89/subgraphs/id/B4BGk9itvmRXzzNRAzBWwQARHRt3ZvLz11aWNVsZPT4';
exports.PANCAKESWAP_SUBGRAPH_URL = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2';
exports.STABLESWAP_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/126e6c43e26f28a5e5a8c8e216edbb89/subgraphs/id/HTFuhfjdwFoc3wXGQ5UMrevui5mjx2N6pJnratYrCzSa';
exports.MASTERCHEF_V2_ADDRESS = '0xc71E27C7e128d9CAEb2b8cA756647f7F199cF39e';
exports.MASTERCHEF_V3_ADDRESS = '0xE3e184a7b75D0Ae6E17B58F5283b91B4E0A2604F';
exports.MASTERCHEF_V2_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/voltfinance/masterchefv2';
exports.MASTERCHEF_V3_SUBGRAPH_URL = 'https://gateway-arbitrum.network.thegraph.com/api/126e6c43e26f28a5e5a8c8e216edbb89/subgraphs/id/4DwVLaAaEuutpoCwmGUNBS45mSnGABt42u1Qbf73BqbR';
exports.xVOLT = '0x97a6e78c9208c21afaDa67e7E61d7ad27688eFd1';
exports.VOLT = '0x34Ef2Cc892a88415e9f02b91BfA9c91fC0bE6bD4';
exports.FUSD = '0xd0ce1b4A349C35e61Af02f5971e71ac502441E49';
exports.FUSD_V3 = '0xCE86a1cf3cFf48139598De6bf9B1dF2E0f79F86F';
exports.sFUSE = '0xb1DD0B683d9A56525cC096fbF5eec6E60FE79871';
exports.WFUSE = '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629';
exports.USDC_V2 = '0x28C3d1cD466Ba22f6cae51b1a4692a831696391A';
exports.LIQUID_STAKING = '0xa3dc222eC847Aac61FB6910496295bF344Ea46be';
exports.STABLESWAP_POOL_LP_HASH = {
    '0xa3c1046290b490e629e11ace35863cb0cae382ab': '0x2a68d7c6ea986fa06b2665d08b4d08f5e7af960c',
    '0xc71cab88c1674a39a3e2841274e54e34d709af91': '0x83d158beadbb3445ac901cfd0ca33fb30ccc8f53'
};
exports.STABLESWAP_POOLS = ['0x2a68D7C6Ea986fA06B2665d08b4D08F5e7aF960c', '0x83D158Beadbb3445AC901cFd0ca33FB30CCC8f53'];
