import React, {useEffect, useState} from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { toast } from "react-toastify";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
// Removed duplicate import of AddExpenseForm
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/layouts/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert]=useState({
      show:false,
      data:null,
    });
  const [openAddExpenseModal,setOpenAddExpenseModal]=useState(false);
  
  //GEt all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_EXPENSE}`);
      //console.log("API Response:", response.data); // Debugging step
      if (response.data) {
        setExpenseData(response.data); // Ensure correct structure
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
    } finally {
      setLoading(false);
    }
  };
//handle add expense
  const handleAddExpense = async (expenseData) =>{
    const { category, amount, date, icon } = expenseData;

    // Validation Checks
    if(!category.trim()){
      toast.error("category is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0){
      toast.error("Amount should be valid number and greater than 0.");
      return;
    }
    if(!date){
      toast.error("Date is required.");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Income added successfully.");
      fetchExpenseDetails();
    }catch(error){
      console.error(
      "Error adding income:",
      error.response?.data?.message || error.message
      );
    }
  };

//Delete expense
const deleteExpense = async(expenseId) => {
  try{
    await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(expenseId));

    setOpenDeleteAlert({show:false,data: null});
    toast.success("Expense details deleted successfully.");
    fetchExpenseDetails();
  }catch(error){
    console.error(
      "Error deleting income:",
      error.response?.data?.message || error.message 
    );
  }
};

//handle download expense details
const handleDownloadExpenseDetails = async () =>{
  try {
    const response = await axiosInstance.get(
      API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
      {
        responseType: "blob",
      }
    );

    //create a url for the blob
    const url =window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href=url;
    link.setAttribute("download", "expense_details.xlsx");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading expense details:", error);
    toast.error("Failed to download expense details. Please try again.");
  }
};


  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  },[]);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6" >
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={()=> setOpenAddExpenseModal(true)}
              />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(expenseId) => {
              setOpenDeleteAlert({show:true, data: expenseId});
            }}
            onDownload={handleDownloadExpenseDetails}
            />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
          >
            <AddExpenseForm onAddExpense={handleAddExpense}/>
          </Modal>

          
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={()=> setOpenDeleteAlert({show: false, data:null})}
          title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this Expense?"
              onDelete={()=> deleteExpense(openDeleteAlert.data)}
              />
        </Modal>
      </div>
      </DashboardLayout>
  );
}
export default Expense;