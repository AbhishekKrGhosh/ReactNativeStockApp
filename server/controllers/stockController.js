import { stockData } from "../data/stocks.js";

export const getAllStocks = (req, res) => {
  res.json(stockData);
};

export const getStockBySymbol = (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const stock = stockData[symbol];
  if (stock) {
    res.json(stock);
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
};
