import Link from 'next/link'

import styles from '@/styles/Home.module.css'

import { GetServerSideProps, NextPage } from 'next'
import { getClientSSR } from '@/utils/apolloClient'
import { ApolloProvider, gql, useMutation } from '@apollo/client'
import { useState } from 'react'



const MUTATION = gql`
mutation createUser($name:String!,$email:String!,$password:String!){
    createUser(
        input: {
            name:$name,
            email: $email,
            password:$password
        }
    ){
        name
    }
}`
export  default function createPost(){
const client = getClientSSR();
const [name,setName] = useState<String>("")
const [email,setEmail] = useState<String>("")
const [password,setPassword] = useState<String>("")
const [createPost,{loading,error}]=useMutation(MUTATION)
return(
    <>
    <input type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>
    <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
    <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
    <button onClick={()=>createPost({variables:{name:name,email:email,password:password}})}>enviar</button>
    </>
)
}