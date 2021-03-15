const {createFilePath} = require('gatsby-source-filesystem');
const path = require('path');

exports.onCreateNode = ({node, getNode, actions}) => {
  if(node.internal.type !== 'MarkdownRemark') return;
  const value = createFilePath({node, getNode, basePath: 'pages/_posts'});
  const {createNodeField} = actions;
  createNodeField({
    name: 'slug',
    node,
    value,
  });
};

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;
  const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            categories
                        }
                    }
                }
            }
        }`);
    
  result.data.allMarkdownRemark.edges.forEach(({node}) => {
    const slug = node.fields.slug;
    const uselessDateLength = 11;
    // eslint-disable-next-line no-unused-vars
    const [year, fileName] = slug.slice(1, slug.length - 1).split('/');
    const postPath = fileName.slice(uselessDateLength);
    const [postMainCategory] = node.frontmatter.categories.split(' ');

    createPage({
      path: [postMainCategory.toLowerCase(), postPath].join('/'),
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        slug: node.fields.slug,
      }
    });
  });
};