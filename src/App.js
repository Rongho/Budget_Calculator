import { useEffect, useState } from 'react';
import './App.css';
import Alert from './Components/Alert';
import ExpendForm from './Components/ExpendForm';
import ExpendList from './Components/ExpendList';
import { v4 as uuid } from 'uuid'


// const InitialExpenses=[
//   {id:uuid(), charge:"Rent", amount:1600},
//   {id:uuid(), charge:"Car payment", amount:1000},
//   {id:uuid(), charge:"Credit card bill", amount:1200}
// ];

const initialExpenses = localStorage.getItem("expenses")? JSON.parse(localStorage.getItem("expenses")):[];

function App() {
  const[expenses,setexpenses]=useState(initialExpenses);

  const[charge, setCharge]=useState("");

  const[amount, setAmount]=useState("");

  const[alert, setAlert]=useState({show:false});

  const[edit, setEdit]=useState(false);

  const[id,setId]=useState(0);

  useEffect(()=>{
    console.log("we called useeffect")
    localStorage.setItem("expenses", JSON.stringify(expenses));
  },[expenses])

  const handleCharge=e=>{
    setCharge(e.target.value)
    console.log(`charge:${e.target.value}`)
  }
  const handleAmount=e=>{
    setAmount(e.target.value)
    console.log(`amount:${e.target.value}`)
  }
  const handleAlert=({type, text})=>{
    setAlert({show:true, type,text});
    setTimeout(()=>{
      setAlert({show:false})
    },3000);
  };
  const handleDelete=(id)=>{
    let templateDelete=expenses.filter(item=>item.id!==id);
    setexpenses(templateDelete);
    handleAlert({type:'danger', text:"item deleted"})
  }
  const handleEdit=(id)=>{
  let expense= expenses.find(item=> item.id ===id);
  let{ charge, amount}= expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);
  }
  const clearItem=()=>{
    setexpenses([]);
    handleAlert({type:"danger", text:"All the items are deleted"})
  }
  const handlesubmit=e=>{
    e.preventDefault();
    if(charge!==0 && amount>0){
      if(edit){
        let tempExpenses= expenses.map(item=>{
          return item.id === id ? {...item,charge,amount}:item;
        });
        setexpenses(tempExpenses);
        setEdit(false);
        handleAlert({type:"success", text:"item edited"})
      }else{
        const singlexpense={id:uuid(),charge,amount};
      setexpenses([...expenses,singlexpense]);
      handleAlert({type:'success', text:"item added"})
      }
      setCharge("");
      setAmount("");
    }else{
      handleAlert({type:"danger",text:"Fields cannot be empty. Add some value to it, to stay updated about your expenses."})
    }
    console.log(charge,amount);
  }


  return (
   <>
   {alert.show && <Alert type={alert.type} text={alert.text}/>}
   <Alert/>
   <h1>BUDGET CALCULATOR</h1>
   <main>
   <ExpendForm charge={charge}
   amount={amount} handleAmount={handleAmount}
   handleCharge={handleCharge} handlesubmit={handlesubmit} edit={edit}/>
   <ExpendList expenses={expenses} handleDelete={handleDelete} handleEdit={handleEdit} clearItem={clearItem}/>
   </main>
   <h1>
    TOTAL EXPENDITURE:<span className='total'>
    ₹{expenses.reduce((tot,curr)=>{
      return (tot+=parseInt(curr.amount));
    },0)}
    </span>
   </h1>
   </>
  );
}

export default App;
