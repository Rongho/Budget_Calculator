import React from 'react'
import ExpendItem from './ExpendItem'
import { IoTrashBin } from "react-icons/io5";
const ExpendList = ({expenses,handleDelete,handleEdit,clearItem}) => {
  return (
    <>
    <ul className="list">
    {expenses.map(expense=>{
        return <ExpendItem key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit}/>
    })}
    {expenses.length>0 && (<button className='btn' onClick={clearItem}>remove expenses <IoTrashBin className="btn-icon"/></button>)}
    </ul>
    
    </>
    
  )
}

export default ExpendList