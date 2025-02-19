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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chef = void 0;
const RewardProgam_1 = __importDefault(require("./RewardProgam"));
const MasterChef_json_1 = __importDefault(require("../constants/abi/MasterChef.json"));
const LiquidStaking_json_1 = __importDefault(require("../constants/abi/LiquidStaking.json"));
const utils_1 = require("../utils");
const eth_1 = require("../utils/eth");
const fetcher_1 = require("../graphql/fetcher");
const constants_1 = require("../constants");
const fetchVoltageTokenPrice_1 = __importDefault(require("../utils/fetchVoltageTokenPrice"));
const fetchTokenInfo_1 = __importDefault(require("../utils/fetchTokenInfo"));
const fetchChefPairInfo_1 = __importDefault(require("../utils/fetchChefPairInfo"));
var Chef;
(function (Chef) {
    Chef[Chef["CHEF_V2"] = 0] = "CHEF_V2";
    Chef[Chef["CHEF_V3"] = 1] = "CHEF_V3";
})(Chef = exports.Chef || (exports.Chef = {}));
class ChefRewardProgram extends RewardProgam_1.default {
    constructor(chefAddress, provider) {
        super(chefAddress, provider);
        this.chef = utils_1.getChef(chefAddress);
    }
    deposit(amount, account, pid) {
        return eth_1.ethTransaction(this.stakingAddress, 'deposit', MasterChef_json_1.default, this.web3, [pid, amount], account);
    }
    withdraw(amount, account, pid) {
        return eth_1.ethTransaction(this.stakingAddress, 'withdraw', MasterChef_json_1.default, this.web3, [pid, amount], account);
    }
    withdrawReward(account, pid) {
        return eth_1.ethTransaction(this.stakingAddress, 'deposit', MasterChef_json_1.default, this.web3, [pid, 0], account);
    }
    getStakerInfo(account, pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield eth_1.ethCall(this.stakingAddress, 'userInfo', MasterChef_json_1.default, this.web3, [pid, account]);
            const user = yield fetcher_1.getChefUser(pid, account, this.chef);
            return [userInfo[0], user === null || user === void 0 ? void 0 : user.voltHarvested];
        });
    }
    getStats(account, pairAddress, networkId, pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield fetcher_1.getChefPool(pid, this.chef);
            const user = yield fetcher_1.getChefUser(pid, account, this.chef);
            const globalTotalStake = pool === null || pool === void 0 ? void 0 : pool.balance;
            const userTotalStaked = utils_1.weiToNumber(user === null || user === void 0 ? void 0 : user.amount).toString();
            let reserves, tokens, pairPrice;
            if (pairAddress.toLowerCase() === constants_1.xVOLT.toLowerCase()) {
                const token0 = yield fetchTokenInfo_1.default(constants_1.xVOLT, this.web3);
                tokens = [Object.assign({ id: constants_1.xVOLT }, token0), null];
                reserves = [globalTotalStake, null];
                pairPrice = yield fetchVoltageTokenPrice_1.default(constants_1.VOLT, networkId);
            }
            else if (pairAddress.toLowerCase() === constants_1.FUSD.toLowerCase()) {
                const token0 = yield fetchTokenInfo_1.default(constants_1.FUSD, this.web3);
                tokens = [Object.assign({ id: constants_1.FUSD }, token0), null];
                reserves = [globalTotalStake, null];
                pairPrice = 1;
            }
            else if (pairAddress.toLowerCase() === constants_1.USDC_V2.toLowerCase()) {
                const token0 = yield fetchTokenInfo_1.default(constants_1.USDC_V2, this.web3);
                tokens = [Object.assign({ id: constants_1.USDC_V2 }, token0), null];
                reserves = [globalTotalStake, null];
                pairPrice = 1;
            }
            else if (pairAddress.toLowerCase() === constants_1.FUSD_V3.toLowerCase()) {
                const token0 = yield fetchTokenInfo_1.default(constants_1.FUSD_V3, this.web3);
                tokens = [Object.assign({ id: constants_1.FUSD_V3 }, token0), null];
                reserves = [globalTotalStake, null];
                pairPrice = 1;
            }
            else if (pairAddress.toLowerCase() === constants_1.sFUSE.toLowerCase()) {
                const token0 = yield fetchTokenInfo_1.default(constants_1.sFUSE, this.web3);
                tokens = [Object.assign({ id: constants_1.sFUSE }, token0), null];
                reserves = [globalTotalStake, null];
                const fusePrice = yield fetchVoltageTokenPrice_1.default(constants_1.WFUSE, networkId);
                const priceRatio = yield eth_1.ethCall(constants_1.LIQUID_STAKING, 'priceRatio', LiquidStaking_json_1.default, this.web3);
                pairPrice = fusePrice * utils_1.weiToNumber(priceRatio);
            }
            else {
                const { reserveUSD, totalSupply, tokens: tokensInfo, totalReserves } = yield fetchChefPairInfo_1.default(pairAddress, networkId);
                const _reserves = utils_1.calculateReserves(globalTotalStake, totalSupply, totalReserves);
                tokens = tokensInfo;
                reserves = _reserves.map((reserve) => reserve.toFixed());
                pairPrice = reserveUSD / totalSupply;
            }
            const totalStakedUSD = utils_1.weiToNumber(userTotalStaked) * pairPrice;
            const globalTotalStakeUSD = utils_1.weiToNumber(globalTotalStake) * pairPrice;
            const getRewards = () => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                // const pendingTokens = await ethCall(
                //   this.stakingAddress,
                //   'pendingTokens',
                //   ABI,
                //   this.web3,
                //   [pid, account]
                // )
                const pendingTokens = {
                    pendingVolt: 0,
                    pendingBonusToken: 0,
                    bonusTokenAddress: '0x0'
                };
                const voltPerSec = (((_a = pool === null || pool === void 0 ? void 0 : pool.owner) === null || _a === void 0 ? void 0 : _a.voltPerSec) / 1e18);
                const voltPrice = yield fetchVoltageTokenPrice_1.default(constants_1.VOLT, networkId);
                const baseRewardPerSec = ((pool === null || pool === void 0 ? void 0 : pool.allocPoint) / ((_b = pool === null || pool === void 0 ? void 0 : pool.owner) === null || _b === void 0 ? void 0 : _b.totalAllocPoint)) * voltPerSec;
                const baseRewardPerDay = baseRewardPerSec * 3600 * 24;
                const baseRewardPerDayUSD = baseRewardPerDay * voltPrice;
                const baseRoiPerSec = (baseRewardPerSec * voltPrice) / globalTotalStakeUSD;
                const baseAprPercent = baseRoiPerSec * 12 * 30 * 24 * 3600;
                const bonusRewardPrice = yield fetchVoltageTokenPrice_1.default(pendingTokens.bonusTokenAddress, networkId);
                const bonusRewardPerSec = ((_c = pool === null || pool === void 0 ? void 0 : pool.rewarder) === null || _c === void 0 ? void 0 : _c.tokenPerSec) / 1e18;
                const bonusRewardPerDay = bonusRewardPerSec * 3600 * 24;
                const bonusRewardPerDayUSD = bonusRewardPerDay * bonusRewardPrice;
                const bounsRoiPerSec = (bonusRewardPerSec * bonusRewardPrice) / globalTotalStakeUSD;
                const bonusAprPercent = bounsRoiPerSec * 12 * 30 * 24 * 3600;
                return [{
                        baseRewardPerDay,
                        baseRewardPerDayUSD,
                        baseRewardSymbol: 'VOLT',
                        pendingBaseReward: pendingTokens === null || pendingTokens === void 0 ? void 0 : pendingTokens.pendingVolt,
                        baseAprPercent,
                        bonusRewardPerDay,
                        bonusRewardPerDayUSD,
                        bonusRewardSymbol: (_d = pool === null || pool === void 0 ? void 0 : pool.rewarder) === null || _d === void 0 ? void 0 : _d.symbol,
                        pendingBonusReward: pendingTokens === null || pendingTokens === void 0 ? void 0 : pendingTokens.pendingBonusToken,
                        bonusAprPercent
                    }];
            });
            const rewardsInfo = yield getRewards();
            return {
                globalTotalStake,
                rewardsInfo,
                tokens,
                totalStakedUSD,
                globalTotalStakeUSD,
                pairPrice,
                reserves
            };
        });
    }
    getStakingTimes() {
        return {
            start: Infinity,
            duration: Infinity,
            end: Infinity
        };
    }
}
exports.default = ChefRewardProgram;
