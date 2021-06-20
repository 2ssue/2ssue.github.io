const {createFilePath} = require('gatsby-source-filesystem');
const {getPostPath, getMainCategory} = require('./src/utils/postPath');
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
    
  const posts = result.data.allMarkdownRemark.edges;
  posts.forEach(({node}) => {
    const slug = node.fields.slug;
    const postPath = getPostPath(slug);
    const postMainCategory = getMainCategory(node.frontmatter.categories);

    createPage({
      path: [postMainCategory, postPath].join('/'),
      component: path.resolve('./src/templates/blog-post.jsx'),
      context: {
        slug,
      }
    });
  });
};