import React from "react"
import useAPI from "./hooks/useAPI"
import styles from "./styles/index.modules.css"

export default function Home() {
  const debts = useAPI()
  console.log(debts)
  return (
    <div className="main-content-box">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Creditor</th>
            <th>First Name</th>
            <th>LastName</th>
            <th>Min Pay%</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {debts.map(debt => {
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
                      name="checked"
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
        <button>Add Debt</button>
        <button>Remove Debt</button>
      </div>
      <div className="total-box">
        <p id="total">Total</p>
        <p>$</p>
      </div>
      <div className="count-box">
        <p>Total Row Count: </p>
        <p>Check Row Count: </p>
      </div>
    </div>
  )
}
