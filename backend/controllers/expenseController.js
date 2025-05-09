//const User = require('../models/User');
const xlsx = require("xlsx");
const Expense = require("../models/Expense");

//Add expense source
exports.addExpense = async(req,res)=>{
    const userId=req.user.id;

    try{
        const {icon,category,amount,date}=req.body;
        //validation :check for missing fields
        if(!category || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: parsedDate,
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    }catch(error){
        res.status(500).json({message:"Internal server error",error});
    }
};

//get all Expense source
exports.getAllExpense = async(req,res)=>{
    const userId=req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        res.json(expense);
    }catch(error){
        res.status(500).json({message:"Internal server error",error});
    }
};

//delete Expense source
exports.deleteExpense = async(req,res)=>{
   
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message:"Expense source deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error",error});
    }
};

//download income source in excel format
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Convert Expense data to Excel format
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0], // Format date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense Data");

        const filePath = "expense_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ message: "Failed to download file." });
            }
        });
    } catch (error) {
        console.error("Error downloading expense details:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};