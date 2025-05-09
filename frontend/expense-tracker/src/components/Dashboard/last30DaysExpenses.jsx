import React, { useEffect,useState } from "react";
import {prepareExpenseBarChartData} from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const last30DaysExpenses=({data})=>{
    const [charData, setCharData] = useState([]);
    
    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setCharData(result);

        return ()=>{};

    },[data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={charData} />
        </div>
    )
};
export default last30DaysExpenses;