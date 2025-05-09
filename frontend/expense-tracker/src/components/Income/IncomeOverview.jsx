import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    console.log("Transactions:", transactions); // Debugging step
    const result = prepareIncomeBarChartData(transactions);
    console.log("Processed Chart Data:", result); // Debugging step
    setCharData(result);
  }, [transactions]);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-medium">Income Overview</h5>
          <p className="text-sm text-gray-500">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-6">
        {charData.length > 0 ? (
          <CustomBarChart data={charData} />
        ) : (
          <p className="text-gray-500 text-sm">No income data available for the chart.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;