import React, { useEffect, useState } from "react"
import useAPI from "./hooks/useAPI"
import styles from "./styles/index.modules.css"

export default function Home() {
  const apiDebts = useAPI()
  const [total, setTotal] = useState(0)
  const [debts, setDebts] = useState(apiDebts)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
  const [checkboxCount, setCheckboxCount] = useState(0)

  //gets the total of all columns
  const getTotal = () => {
    return debts.reduce((acc, debt) => {
      return acc + Number(debt.balance)
    }, 0)
  }

  //updates the total on state
  useEffect(() => {
    let newTotal = getTotal()
    setTotal(newTotal)
  }, [total, debts])

  //adds a row when add row button clicked
  const addRow = () => {
    setDebts([...debts, { balance: 0 }])
  }

  //removes a row when remove row button clicked
  const removeRow = () => {
    debts.pop()
    setDebts([...debts])
  }

  //selects or deselects all checkboxes when top checkbox clicked
  const clearCheckboxes = e => {
    if (e.target.checked === true) {
      setCheckboxCount(debts.length)
      debts.map(debt => (debt.isChecked = true))
    } else {
      setCheckboxCount(0)
      debts.map(debt => (debt.isChecked = false))
    }
  }

  //updates individual checkbox when clicked and changes isChecked property on debt object
  const handleSelect = e => {
    const item = e.target
    //loops through debts and updates isChecked if it mateches our event
    debts.forEach((debt, idx) => {
      if (String(idx) === e.target.name) {
        debt.isChecked = e.target.checked
      }
    })
    //if this target is not already in our selectedCheckbox array it adds it, if it is it removes it
    if (selectedCheckboxes.indexOf(item) !== -1) {
      selectedCheckboxes.splice(selectedCheckboxes.indexOf(item), 1)
      setCheckboxCount(checkboxCount - 1)
    } else {
      selectedCheckboxes.push(item)
      setCheckboxCount(checkboxCount + 1)
    }
    setSelectedCheckboxes([...selectedCheckboxes])
  }

  return (
    <div className="main-content-box">
      <table id="table-format">
        <thead>
          <tr>
            <th>
              <input
                className="checkbox"
                type="checkbox"
                onClick={clearCheckboxes}
              />
            </th>
            <th>Creditor</th>
            <th>First Name</th>
            <th>LastName</th>
            <th>Min Pay%</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt, idx) => {
            const {
              firstName,
              lastName,
              creditorName,
              minPaymentPercentage,
              balance,
              isChecked,
            } = debt
            return (
              <>
                <tr>
                  <td>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={isChecked}
                      name={idx}
                      onChange={handleSelect}
                    />
                  </td>
                  <td>{creditorName}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{minPaymentPercentage}</td>
                  <td>{balance}</td>
                </tr>
              </>
            )
          })}
        </tbody>
      </table>
      <div className="button-box">
        <button onClick={addRow}>Add Debt</button>
        <button onClick={removeRow}>Remove Debt</button>
      </div>
      <div className="total-box">
        <p id="total">Total</p>
        <p id="totalValue">${total}</p>
      </div>
      <div className="count-box">
        <p>Total Row Count:{debts.length} </p>
        <p>Check Row Count: {checkboxCount}</p>
      </div>
    </div>
  )
}
