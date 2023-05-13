import Link from 'next/link'

import styles from '@/styles/Home.module.css'

import { GetServerSideProps, NextPage } from 'next'
import { getClientSSR } from '@/utils/apolloClient'
import { ApolloProvider, gql, useMutation } from '@apollo/client'
import { useState } from 'react'



const MUTATION = gql`
mutation createPost($title:String!,$body:String!,$imageUrl:String!){
    createPost(
        input: {
            title:$title,
            body: $body,
            imageUrl:$imageUrl
        }
    ){
        title
    }
}`
export  default function createPost(){
const client = getClientSSR();
const [title,setTitle] = useState<String>("")
const [body,setBody] = useState<String>("")
const [imageUrl,setImageUrl] = useState<String>("")
const [createPost,{loading,error}]=useMutation(MUTATION)
return(
    <>
    <input type="text" placeholder="title" onChange={(e)=>setTitle(e.target.value)}/>
    <input type="text" placeholder="body" onChange={(e)=>setBody(e.target.value)}/>
    <input type="text" placeholder="image   " onChange={(e)=>setImageUrl(e.target.value)}/>
    <button onClick={()=>createPost({variables:{title:title,body:body,imageUrl:imageUrl}})}>enviar</button>
    </>
)
}