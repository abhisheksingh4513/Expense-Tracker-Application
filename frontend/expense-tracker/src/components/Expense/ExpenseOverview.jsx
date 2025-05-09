import React, { useState, useEffect } from "react";
import {LuPlus} from "react-icons/lu";
import {prepareExpenseLineChartData} from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";


const ExpenseOverview = ({transactions, onExpenseIncome}) => {
    const [charData, setCharData] = useState([]);
    
    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setCharData(result);

        return () => {};
    },[transactions]);
    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <div className="">
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending trends over time and gain insights of your expenses.
                    </p>
                </div>

                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg" />
                    Add Expense
                </button>
            </div>
            <div className="mt-10" >
                <CustomLineChart data={charData} />
            </div>
        </div>
    )
};
export default ExpenseOverview;