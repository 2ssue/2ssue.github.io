import React from 'react';
import {graphql} from 'gatsby';

export default function BlogPost({data: {markdownRemark: post}}) {
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <span>{post.frontmatter.categories}</span>
       | 
      <time>{post.frontmatter.date}</time>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
  );
}

export const query = graphql`
  query($slug: String!) {
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
