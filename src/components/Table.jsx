import React from 'react'
import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'

const Table = () => {
  return (
    <div className='FormStudentsList'>
        <div className="listheader">
            <h1>Students</h1>
        </div>
      <table className='Tableofstudent'>
         <thead>
            <tr className='studentitems'>
              <td >Student ID</td>
              <td >Student UserName</td>
              <td >Student Email</td>
              <td >Student Password</td>
              <td >Action</td>
             
            </tr>
         </thead>
         <tbody>
            <tr className='studentitems'>
                <td>username</td>
                <td>User@123</td>
                <td>Student$020021</td>
                <td>This is the first Student</td>
                <td>
                
                    <span className='lablestudentspan'>
                    Edit <BsFillTrashFill />
                    </span>
                    <br />
                    <span className='lablestudentspan'>
                    Delete <BsFillPencilFill />
                    </span>
                    
                </td>
                </tr>
           
         </tbody>
      </table>
    </div>
  )
}

export default Table
