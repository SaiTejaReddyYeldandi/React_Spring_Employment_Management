import React, {useEffect, useState} from 'react'
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../services/EmployeeService';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, [])
 
  function getAllEmployees(){
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.error("Error fetching employees:", error)
  })
}


    function addNewEmployee(){
        console.log("add new employee");
        navigator("/add-employee")
    }
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)  //here we are using `` not '' because we want to use ${id} to pass the id of the employee we want to update
    }

    function removeEmployee(id){
        console.log("delete employee with id: " + id);
        deleteEmployee(id).then((response) => {
            getAllEmployees();  
            // navigator(`/employees`)  //after deleting the employee we want to navigate to the list of employees page
            // navigator(`/delete-employee/${id}`)  //here we are using `` not '' because we want to use ${id} to pass the id of the employee we want to delete
    }
    ).catch(error => {
        console.error("Error deleting employee:", error)
    })
}

  return (
    <div className='container'>
<h2 className='text-center'> List of Employees</h2>
<button className='btn btn-primary mb-2' onClick={addNewEmployee}> Add Employee</button>
<table className='table table-striped table-bordered'>
    <thead>
        <tr>
            <th>Employee Id</th>
             <th>Employee FirstName</th>
              <th>Employee LastName</th>
               <th>Employee Emial Id</th>
               <th>Actions</th>
        </tr>
         </thead>

         <tbody>
            {
                employees.map(employee =>
                    <tr key={employee.id}>
                        <td> {employee.id}</td>
                        <td> {employee.firstName}</td>
                        <td> {employee.lastName}</td>
                        <td> {employee.email}</td>
                        <td> <button className='btn btn-info' onClick={ () => updateEmployee(employee.id)}> Update </button> </td>
                        <td> <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}> Delete </button> </td>
                    </tr>
                )
            }
         </tbody>
</table>


    </div>
  )
}


export default ListEmployeeComponent

// rcfe  told to use arrow functions so rafce this gives react arow function component export


//   const dummyData =[

//         {
//             "id": 1,
//             "firstName": "Ramnesh",
//             "lastName": "Tendulkar",
//             "email":"Ramnesh@gmail.com"
//         },
//           {
//             "id": 2,
//             "firstName": "sai",
//             "lastName": "Tendulkar",
//             "email": "sai@gmail.com"
//         },
//          {
//             "id": 3,
//             "firstName": "teja",
//             "lastName": "Tendulkar",
//             "email": "teja@gmail.com"
//         },
//          {
//             "id": 4,
//             "firstName": "reddy",
//             "lastName": "Tendulkar",
//             "email": "reddy@gmail.com"
//         },
//           {
//             "id": 5,
//             "firstName": "yeldandi",
//             "lastName": "Tendulkar",
//             "email": "yeldandi@gmail.com"
//         }

