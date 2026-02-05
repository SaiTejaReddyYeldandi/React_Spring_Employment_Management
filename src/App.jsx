import './App.css'
import FooterComponent from './Components/FooterComponent'
import HeaderComponent from './Components/HeaderComponent'
import ListEmployeeComponent from './Components/ListEmployeeComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
 import EmploymentComponent from './Components/EmploymentComponent'
export default function App() {
  return (
    <>
    <BrowserRouter>
     <HeaderComponent/>
     <Routes>

      // http:localhost:3000
      <Route path="/" element= {<ListEmployeeComponent/>}> </Route>
      <Route path="/employees" element= {<ListEmployeeComponent/>}> </Route>
    <Route path="/add-employee"      element= {<EmploymentComponent/>}> </Route>
    <Route path="/edit-employee/:id" element= {<EmploymentComponent/>}> </Route> 

     </Routes>
      <FooterComponent/>
    </BrowserRouter>
   

    </>
  )
}
