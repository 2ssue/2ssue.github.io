module.exports = {
  siteMetadata: {
    title: '2ssue Blog',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-135038079-1',
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'public/assets/images/grass.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './src/pages/_posts',
      },
      __key: 'posts',
    },
  ],
};
