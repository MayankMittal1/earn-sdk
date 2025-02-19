"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poolQuery = exports.userQuery = exports.tokenPriceQuery = exports.stablePoolQuery = exports.pairQuery = void 0;
const core_1 = require("@apollo/client/core");
function pairQuery(address) {
    return core_1.gql `
      {
        pair(id: "${address.toLowerCase()}") {
          reserveUSD
          reserve0
          reserve1
          totalSupply
          token0 {
            id
            name
            symbol
          }
          token1 {
            id
            name
            symbol
          }
        }
      }
    `;
}
exports.pairQuery = pairQuery;
function stablePoolQuery(poolAddress) {
    return core_1.gql `
    {
      swap(id: "${poolAddress.toLowerCase()}") {
        numTokens
        balances
        lpTokenSupply
        virtualPrice
        tokens {
          id
          name
          symbol
        }
      }
    }
  `;
}
exports.stablePoolQuery = stablePoolQuery;
function tokenPriceQuery(address) {
    return core_1.gql `
        {
            token(id: "${address.toLowerCase()}") {
                derivedETH
            }
            bundle(id: "1") {
                ethPrice
            }
        }
    `;
}
exports.tokenPriceQuery = tokenPriceQuery;
function userQuery(pid, account) {
    return core_1.gql `
    {
      user(id: "${pid}-${account.toLowerCase()}") {
        id
        amount
        voltHarvested
      }
    }
  `;
}
exports.userQuery = userQuery;
function poolQuery(pid) {
    return core_1.gql `
    {
      pool(id: "${pid}") {
        balance
        allocPoint
        owner {
          voltPerSec
          totalAllocPoint
        }
        rewarder {
          rewardToken
          name
          symbol
          decimals
          tokenPerSec
        }
      }
    }
  `;
}
exports.poolQuery = poolQuery;
