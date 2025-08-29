import axios from "axios";

let cache = {
  rates: null,
  timeStamp: null,
};

export const convertCurrency = async (req, res) => {
  const { amount, sourceCurrency, resultCurrency } = req.body;

  if (!amount || !sourceCurrency || !resultCurrency) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const now = Date.now();

    const cacheDuration = 24 * 60 * 60 * 1000; //  24 hours in ms

    if (
      cache.rates &&
      cache.timeStamp &&
      now - cache.timeStamp < cacheDuration
    ) {
      console.log("Using cache");
    } else {
      console.log("Fetching fresh rates...");
      const response = await axios.get(process.env.API_KEY);

      console.log(response.data.rates);
      cache.rates = response.data.rates;
      cache.timeStamp = now; //  update cache timestamp
    }

    const rates = cache.rates;

    if (!rates[sourceCurrency] || !rates[resultCurrency]) {
      return res.status(400).json({ message: "Invalid currency code" });
    }

    const convertedAmount =
      amount * (rates[resultCurrency] / rates[sourceCurrency]);

    res.status(200).json({
      message: "success",
      resultAmount: convertedAmount.toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching rates:", error.message);
    res.status(500).json({ message: "Error fetching rates" });
  }
};
