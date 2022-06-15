import Axios from 'axios'
import { useState } from 'react'

const UpdateWageButton = (props) => {
    const { id, setEmployeeList, employeeList } = props
    const [newWage, setNewWage] = useState('')


    const updateEmployeeWage = () => {
        Axios.put("http://localhost:4000/update", { wage: newWage, id }).then((respnse) => {
          const UpdatedEmployeeList = employeeList.map((val) => {
            if (val.id === id) {
                val.wage = newWage
              return val
            }
    
            return val
          })
          setEmployeeList(UpdatedEmployeeList)
        })
        .catch((err) => {
          console.log(err)
        })
      }

    return (
        <>
            <input type="number" 
                stlye={{ with: "300px"}} 
                placeholder="15000..." 
                className='form-control'
                value={newWage}
                onChange={(event) => {
                    setNewWage(event.target.value)
                }}  
            />
            <button style={{ marginRight: '15px', marginLeft: '15px'}} className="btn btn-warning" onClick={updateEmployeeWage}>Update</button>
        </>
    )
}

export default UpdateWageButton