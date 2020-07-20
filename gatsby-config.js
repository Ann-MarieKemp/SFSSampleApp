/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-custom-api",
      options: {
        url:
          "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json",
        schemas: {
          debts: `id: String
          creditorName: String
          firstName: String
          lastName: String
          minPaymentPercentage: Int
          balance: Int`,
        },
      },
    },
  ],
}
