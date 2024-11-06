const { default: axios } = require("axios");

export function getTradeData() {
  return axios.get("https://goldika.ir/p/price");
}
