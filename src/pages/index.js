import React, { useEffect, useState } from "react"
import useAPI from "./hooks/useAPI"
import styles from "./styles/index.modules.css"

export default function Home() {
  const apiDebts = useAPI()
  const [total, setTotal] = useState(0)
  const [clickedCount, setClickedCount] = useState(0)
  const [debts, setDebts] = useState(apiDebts)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([])
  const [checkboxCount, setCheckboxCount] = useState(0)

  const getTotal = () => {
    return debts.reduce((acc, debt) => {
      return acc + Number(debt.balance)
    }, 0)
  }

  useEffect(() => {
    let newTotal = getTotal()
    setTotal(newTotal)
  }, [total, debts])

  const addRow = () => {
    setDebts([...debts, { balance: 0 }])
  }

  const removeRow = () => {
    debts.pop()
    setDebts([...debts])
  }
  const clearCheckboxes = e => {
    if (e.target.checked === true) {
      setCheckboxCount(debts.length)
      selectedCheckboxes.map(checkbox => {
        return (checkbox.checked = true)
      })
    } else {
      setCheckboxCount(0)
      selectedCheckboxes.map(checkbox => {
        return (checkbox.checked = false)
      })
    }
  }

  const handleSelect = e => {
    const item = e.target
    const isChecked = e.target.checked
    if (selectedCheckboxes.indexOf(item) !== -1) {
      selectedCheckboxes.splice(selectedCheckboxes.indexOf(item), 1)
    } else {
      selectedCheckboxes.push(item)
    }
    setSelectedCheckboxes([...selectedCheckboxes])
    console.log(selectedCheckboxes)
  }

  return (
    <div className="main-content-box">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onClick={clearCheckboxes} />
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
            } = debt
            return (
              <>
                <tr>
                  <td>
                    <input
                      className="checkbox"
                      type="checkbox"
                      name={`checkbox-${idx}`}
                      onClick={handleSelect}
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
        <p>Check Row Count: {clickedCount}</p>
      </div>
    </div>
  )
}
