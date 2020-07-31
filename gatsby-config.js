require("dotenv").config()

module.exports = {
  siteMetadata: {
    defaultTitle: `Gatsby Startup/Hackathon Starter`,
    defaultDescription: `A starter for building a startup or hackathon project`,
    siteUrl: `https://example.com`,
    defaultImage: "./static/favicon.ico",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
      },
    },
  ],
}
