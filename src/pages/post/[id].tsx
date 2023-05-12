import Link from 'next/link'

import styles from '@/styles/Home.module.css'

import { GetServerSideProps, NextPage } from 'next'
import { getClientSSR } from '@/utils/apolloClient'
import { gql } from '@apollo/client'
import { useState } from 'react'

type post= {
  id:string,
  title: string,
  body: string,
  imageUrl: string,
  createdAt: string,
  updatedAt: string,
  comments: {
    user:{
      name:string
    },
    body:string
  }[]
  }
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id

const query = gql`
query {
    post(id:"${id?.toString()}") {
      id
      title
      body
      imageUrl
      createdAt
      updatedAt
      comments {
        user{
          name
        }
        body
      }
        

    }
}
`
const client = getClientSSR();
const {data} = await client.query<post>({
query
})


return {
props: { data }
}
}


const post:NextPage<{data:{post:post}}> = ({data}) => {
  const [comment, setComment]=useState<string>("")
  return (
    
      <div className="post" >
            <div className="postTitle">{data.post.title}</div>
            <img className="postImage" src={data.post.imageUrl} alt={data.post.title} />
            <div className="postBody">{data.post.body}</div>
            <div className="postCommentsTitle">Comments</div>
            <div className="postComments">
              {data.post.comments.map((comment) => (
                <div className="comment" key={comment.body}>
                  <div className="commentUser">{comment.user.name}</div>
                  <div className="commentBody">{comment.body}</div>
                </div>
              ))}
              <input className="commentInput" type="text" placeholder="Add a comment" onChange={(e) => setComment(e.target.value)} value={comment}/>
              <button className="commentButton" onClick={() => {data.post.comments.push({user:{name:"User"},body:comment});setComment("a");}}>Add</button>

            </div>
            <div className="postDate">{"Created at:" + new Date(Number(data.post.createdAt)).toUTCString()}</div>
            <div className="postDate">{"Last Uptated:"+new Date(Number(data.post.updatedAt)).toUTCString()}</div>
      </div>
  )
}
export default post;