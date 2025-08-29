import { useState } from "react";
import axios from "axios";
import currencyCountries from "./components/currencyCountris";

function App() {
  const [amount, setAmount] = useState("");
  const [sourceCur, setSourceCur] = useState("");
  const [targetCur, setTargetCur] = useState("");
  const [convertedAmt, setConvertedAmt] = useState("");
  const [finalCur, setFinalCur] = useState("");

  const fetchCurrency = async () => {
    if (!amount || !sourceCur || !targetCur) return;

    const response = await axios.post(
      "http://localhost:3000/api/convert",
      {
        amount: Number(amount),
        sourceCurrency: sourceCur,
        resultCurrency: targetCur,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Update the amount with the converted value
    setConvertedAmt(response.data.resultAmount);
    setFinalCur(targetCur);
  };
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Currency Converter
        </h1>

        {/* Amount Input */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Amount</label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter amount"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Currency Selectors */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-gray-700 mb-1 block">From</label>
            <select
              value={sourceCur}
              onChange={(e) => setSourceCur(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Select source currency</option>
              {Object.keys(currencyCountries).map((cur) => (
                <option key={cur} value={cur}>
                  {currencyCountries[cur].flag} {" - "}
                  {currencyCountries[cur].name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="text-gray-700 mb-1 block">To</label>
            <select
              value={targetCur}
              onChange={(e) => setTargetCur(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Select target currency</option>
              {Object.keys(currencyCountries).map((cur) => (
                <option key={cur} value={cur}>
                  {currencyCountries[cur].flag}
                  {" - "} {currencyCountries[cur].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={fetchCurrency}
          className="w-full bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
        >
          Convert
        </button>
        {convertedAmt && (
          <span className="border-2 border-amber-400 p-2 text-md sm:text-xl font-medium rounded-2xl text-center">
            Converted Amount : {convertedAmt} {finalCur}
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
