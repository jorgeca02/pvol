import { getClientSSR } from "@/utils/apolloClient";
import { GetServerSideProps, NextPage } from 'next';
import { gql } from "@apollo/client";
import Link from "next/link";


type posts= {
      id:string,
      title: string,
      body: string,
      imageUrl: string,
      createdAt: string,
      updatedAt: string
      }[]


export const getServerSideProps: GetServerSideProps = async () => {
  const query = gql`
  query Query {
    posts(limit:3){
      id
      title
      body
      imageUrl
      createdAt
      updatedAt

    }
  }
  `

  const client = getClientSSR();
  const {data} = await client.query<posts>({
    query
  })
  return {
    props: { data }
  }
}

const posts:NextPage<{data:{posts:posts}}> = ({data}) => { 
   
    return (
      <>
        {data.posts.map((post) => (
          <div className="post" key={post.id}>
                <div className="postTitle">{post.title}</div>
                <img className="postImage" src={post.imageUrl} alt={post.title} />
                <Link href={`/post/${post.id}`}>Ver más</Link>
          </div>
        ))}
      </>
        )}
  export default posts;