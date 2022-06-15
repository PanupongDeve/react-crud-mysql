import { useState } from 'react'
import UpdateWageButton from './UpdateWageButton'
import Axios from 'axios'
import logo from './logo.svg'
import './App.css'

function App() {
  const clearedEmployee = {
    name: "",
    age: 0,
    country: "",
    position: "",
    wage: 0
  }
  const [employeeList, setEmployeeList] = useState([])
  const [employee, setEmployee] = useState(clearedEmployee)

  const getEmployees = () => {
    Axios.get('http://localhost:4000/employees').then((response) => {
      setEmployeeList(response.data)
    })
    .catch((err) => {
      console.log(err)
    } )
  }

  const addEmployee = () => {
    Axios.post('http://localhost:4000/create', employee).then(() => {
      // setEmployeeList([...employeeList, employee])
      getEmployees()
      setEmployee(clearedEmployee)
    })
    .catch((err) => {
      console.log(err)
    })
    
  }

  const deleteEmployee = (id) => () => {
    Axios.delete(`http://localhost:4000/delete/${id}`, employee).then(() => {
      // setEmployeeList([...employeeList, employee])
      getEmployees()
     
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleFormChange = (field) => (event) => {
    event.preventDefault()
    setEmployee({...employee, [field]: event.target.value})
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    addEmployee()
  }

  

  return (
    <div className="container">
      <h1>Employee Information</h1>
      <div className="information">
        <form onSubmit={handleOnSubmit} action="">
          <div className="mb-3">
            <label htmlFor='name' className="form-label">Name:</label>
            <input type="text" onChange={handleFormChange('name')} value={employee.name} className='form-control' placeholder='Enter name' />
          </div>
          <div className="mb-3">
            <label htmlFor='age' className="form-label">Age:</label>
            <input type="number" onChange={handleFormChange('age')} value={employee.age}  className='form-control' placeholder='Enter age' />
          </div>
          <div className="mb-3">
            <label htmlFor='country' className="form-label">Country:</label>
            <input type="text" onChange={handleFormChange('country')} value={employee.country} className='form-control' placeholder='Enter country' />
          </div>
          <div className="mb-3">
            <label htmlFor='position' className="form-label">Position:</label>
            <input type="text" onChange={handleFormChange('position')} value={employee.position} className='form-control' placeholder='Enter position' />
          </div>
          <div className="mb-3">
            <label htmlFor='wage' className="form-label">Wage:</label>
            <input type="number" onChange={handleFormChange('wage')} value={employee.wage} className='form-control' placeholder='Enter wage' />
          </div>
          <button type="submit" className='btn btn-success'>Add Employee</button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button className='btn btn-primary' onClick={getEmployees}>Show Employee</button>

        { employeeList.map((val, key) => {
          return (
            <div key={`employee-${key}`} className="emplyee card">
                <div className="card-body text-left">
                  <p className="card-text">NAME: {val.name}</p>
                  <p className="card-text">Age: {val.age}</p>
                  <p className="card-text">Country: {val.country}</p>
                  <p className="card-text">Position: {val.position}</p>
                  <p className="card-text">Wage: {val.wage}</p>
                  <div className="d-flex">
                    <UpdateWageButton id={val?.id} setEmployeeList={setEmployeeList} employeeList={employeeList} />
                    <button className="btn btn-danger" onClick={deleteEmployee(val?.id)}>Delete</button>
                  </div>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
