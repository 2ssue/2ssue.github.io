import React from 'react';
import {graphql, PageProps} from 'gatsby';

interface BlogPostPageProps extends PageProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        categories: string;
        date: string;
      };
    };
  };
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        categories
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

export default function BlogPost({
  data: {markdownRemark: post},
}: BlogPostPageProps): JSX.Element {
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <span>{post.frontmatter.categories}</span>|
      <time>{post.frontmatter.date}</time>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
  );
}
