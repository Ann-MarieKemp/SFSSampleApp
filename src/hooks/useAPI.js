import { graphql, useStaticQuery } from "gatsby"

const useAPI = () => {
  const data = useStaticQuery(graphql`
    {
      allCustomApi {
        nodes {
          creditorName
          firstName
          lastName
          minPaymentPercentage
          balance
        }
      }
    }
  `)
  return data.allCustomApi.nodes.map(debt => ({
    creditorName: debt.creditorName,
    firstName: debt.firstName,
    lastName: debt.lastName,
    minPaymentPercentage: debt.minPaymentPercentage,
    balance: debt.balance,
    isChecked: false,
  }))
}

export default useAPI
