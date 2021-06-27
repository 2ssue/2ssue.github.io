import React from 'react';
import {Link, graphql, PageProps} from 'gatsby';
import {getMainCategory, getPostPath} from '@src/utils/postPath';

interface PostListPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      totalCount: string;
      edges: {
        node: {
          id: string;
          frontmatter: {
            date: string;
            title: string;
            categories: string;
          };
          fields: {
            slug: string;
          };
        };
      }[];
    };
  };
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
  }
`;

// styles
const pageStyles = {
  color: '#232129',
  padding: '96px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

// markup
const PostsPage = ({data}: PostListPageProps): JSX.Element => {
  return (
    <main style={pageStyles}>
      <title>Posts</title>
      <h2>{data.allMarkdownRemark.totalCount} posts here!</h2>
      <Link to="/">Go home</Link>
      <ul>
        {data.allMarkdownRemark.edges.map(
          ({
            node: {
              id,
              frontmatter,
              fields: {slug},
            },
          }) => {
            const postPath = getPostPath(slug);
            const postMainCategory = getMainCategory(frontmatter.categories);
            return (
              <a key={id} href={`/${postMainCategory}/${postPath}`}>
                <li>
                  <h3>{frontmatter.title}</h3>
                  <time>{frontmatter.date}</time>
                </li>
              </a>
            );
          }
        )}
      </ul>
    </main>
  );
};

export default PostsPage;
