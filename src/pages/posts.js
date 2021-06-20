import * as React from 'react';
import {Link, graphql} from 'gatsby';
import {getMainCategory, getPostPath} from '../utils/postPath';

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

// markup
const PostsPage = ({data}) => {
  return (
    <main style={pageStyles}>
      <title>Posts</title>
      <h2>{data.allMarkdownRemark.totalCount} posts here!</h2>
      <Link to="/">Go home</Link>
      <ul>
        {data.allMarkdownRemark.edges.map(({node: {id, frontmatter, fields: {slug}}}) => {
          const postPath = getPostPath(slug);
          const postMainCategory = getMainCategory(frontmatter.categories);
          return (
            <a key={id} href={`/${postMainCategory}/${postPath}`}>
              <li>
                <h3>{frontmatter.title}</h3>
                <time>{frontmatter.date}</time>
              </li>
            </a>
          );})}
      </ul>
    </main>
  );
};

export const query = graphql`
    query {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
            edges {
              node {
                id
                frontmatter {
                  date(formatString: "DD MMMM, YYYY")
                  title
                  categories
                }
                fields {
                  slug
                }
              }
            }
        }
    }`;

export default PostsPage;
