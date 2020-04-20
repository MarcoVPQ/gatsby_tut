import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby';

import Head from '../components/head'
import Layout from '../components/layout';
import blogStyles from './blog.module.scss'

const BlogPage = () => {

    const posts = useStaticQuery(graphql`
       query{
        allContentfulBlogPost(sort: { fields: publishedDate,order: DESC}){
        edges{
            node{
                title
                slug
                publishedDate(formatString:"MMMM Do, YYYY")
            }
          }
        }
    }`
)    
    
    return (
        <Layout>
         <Head title="Blog" />
         <h1>Blog page</h1>
         <ol className={blogStyles.posts}>
         {
            posts.allContentfulBlogPost.edges.map((item, index) => (
                <li key={index} className={blogStyles.post}>
                  <Link to={`blog/${item.node.slug}`}>
                    <h2>{item.node.title}</h2>
                    <p>{item.node.publishedDate}</p>
                  </Link>
                </li>
            )) 
         }
         </ol>
        </Layout>
    )
}

export default BlogPage