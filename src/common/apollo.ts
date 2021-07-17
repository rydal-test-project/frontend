import {ApolloClient, InMemoryCache} from "@apollo/client";
import {URL_GQ} from "../constants/env";


export default new ApolloClient({
    uri: 'api/graphql',
    cache: new InMemoryCache()
});

