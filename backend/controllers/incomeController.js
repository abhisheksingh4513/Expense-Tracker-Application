const User = require("../models/User");
const xlsx = require("xlsx");
const Income = require("../models/Income");

//Add income source
exports.addIncome = async(req,res)=>{
    const userId=req.user.id;

    try{
        const {icon,source,amount,date}=req.body;
        //validation :check for missing fields
        if(!source || !amount || !date){
            return res.status(400).json({message:"All fields are required"});
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: parsedDate,
        });
        await newIncome.save();
        res.status(201).json({message:"Income source added successfully",newIncome});
    }catch(error){
        res.status(500).json({message:"Internal server error",error});
    }
};

//get all income source
exports.getAllIncome = async(req,res)=>{
    const userId=req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        res.status(200).json({message:"Income source fetched successfully", income});
    }catch(error){
        res.status(500).json({message:"Internal server error",error});
    }
};

//delete income source
exports.deleteIncome = async(req,res)=>{
   
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Income source deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Internal server error",error});
    }
};

//download income source in excel format
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Convert Income data to Excel format
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0], // Format date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income Data");

        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res.status(500).json({ message: "Failed to download file." });
            }
        });
    } catch (error) {
        console.error("Error downloading income details:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};