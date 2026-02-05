import React, { useState , useEffect} from 'react'
import { createEmployee, getEmployeeById } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { updateEmployee } from '../services/EmployeeService'
const EmploymentComponent = () => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const {id} = useParams();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

   const navigator = useNavigate();

    useEffect(() => {
    if(id){
        getEmployeeById(id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        }).catch(error => {
            console.error("Error fetching employee details", error);
        })
    }
            
   }, [id])


  function validateForm() {
    let valid = true;
    const errorsCopy= {...errors}
    if (firstName.trim()) {
        errorsCopy.firstName = ''
  }else{
    errorsCopy.firstName = 'First Name is required';
    valid = false;
  }
if (lastName.trim()) {
    errorsCopy.lastName = ''
}else{
    errorsCopy.lastName = 'Last Name is required';
    valid = false;
}
if (email.trim()) {
    errorsCopy.email = ''
}else{
    errorsCopy.email = 'Email is required';
    valid = false;
}
setErrors(errorsCopy);
return valid;

  }



const handleFirstName = (e) => setFirstName(e.target.value);
const handleEmail = (e) => setEmail(e.target.value);
const handleLastName = (e) => setLastName(e.target.value);

  const saveorUpdateEmployee = (e) => {
    e.preventDefault();


    if (validateForm()) {
    const employee = {firstName, lastName, email};
    console.log(employee);
    // Call the service to create employee
    
    if(id){
        updateEmployee(id, employee).then((response) => {
            console.log("Employee updated successfully", response.data);
            navigator("/employees");
        }).catch(error => {
            console.error("Error updating employee", error);
        })
    }
    else{
         createEmployee(employee).then((response) => {
        console.log("Employee created successfully", employee);
         navigator("/employees");
         }).catch(error => {
        console.error("Error creating employee", error);
         })

       

        }
    }
}
  
  function pageTitle(){
if(id){
    return  <h2 className='text-center '> Update Employee</h2>
    }
    else{
        return <h2 className='text-center'> Add Employee</h2>
    }

}

  return (
    <div className='container'>
        <br />
        <br />
        <div className='row'>
    <div className='card col-md-6 offset-md-3 offset-md-3'>
   {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'> First Name: </label>
                            <input
                                type="text"
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                value={firstName}
                                onChange={handleFirstName}
                                // onChange={(e) => setFirstName(e.target.value)}
                                ></input>
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'> Last Name: </label>
                            <input
                                type="text"
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                 className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                value={lastName}
                                onChange={handleLastName}
                                // both works onChange={(e) => setLastName(e.target.value)}
                                ></input>
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'> Email: </label>
                            <input
                                type="text"
                                placeholder='Enter Employee Email'
                                name='email'
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={handleEmail}
                                // both works onChange={(e) => setEmail(e.target.value)}
                                ></input>
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>
                        <button className='btn btn-success' onClick={saveorUpdateEmployee}> Submit </button>
                    </form>
                </div>
            </div>
        </div>
    </div>


  )


}

export default EmploymentComponent


//   function handleFirstName(e){
//     setFirstName(e.target.value);
    
//   }

//   function handleLastName(e){
//     setLastName(e.target.value);
//   }

//   function handleEmail(e){
//     setEmail(e.target.value);
//   }

  // lets write above code in arroe function format