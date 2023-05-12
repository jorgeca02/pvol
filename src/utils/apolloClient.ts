import {ApolloClient, InMemoryCache} from '@apollo/client';
// se generan clientes para extraer la informacion de las urls:

//client side: se genera un cliente para cada usuario porque cada uno tiene su maquina
export const clientCSR = new ApolloClient({
    uri: "https://practicaopcional.deno.dev/graphql",
    cache: new InMemoryCache(),
    ssrMode: false, //informa al cliente que esta del lado del cliente
})

//server side: es una funcion que genera un cliente nuevo cada vez que la llamo, 
//pq el servidor no puede compartir la cache, cada servidor tendra que tener la suya
export const getClientSSR = () => new ApolloClient({
    uri: "https://practicaopcional.deno.dev/graphql",   
    cache: new InMemoryCache(),
    ssrMode: true, //informa al cliente que esta del lado del servidor
})