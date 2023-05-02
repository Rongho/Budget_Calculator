import React from 'react'
import { IoTrashBin,IoPencil } from "react-icons/io5";

const ExpendItem = ({ expense,handleDelete,handleEdit }) => {
  const{ id, charge, amount }=expense;
  return (
    <li className="info">
     <div className="info">
      <span className="expense">{charge}</span>
      <span className="amount">{amount}</span>
     </div>
     <div>
      <button className="edit-btn" aria-label="edit button" onClick={()=>handleEdit(id)}>
        <IoPencil />
      </button>
      <button className="clear-btn" aria-label="delete button" onClick={()=>handleDelete(id)}>
        <IoTrashBin />
      </button>
     </div>
    </li>
  )
}

export default ExpendItem