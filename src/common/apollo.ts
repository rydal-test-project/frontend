import {ApolloClient, InMemoryCache} from "@apollo/client";
import {env} from "../constants";


export default new ApolloClient({
    uri: env.URL_GQ as string,
    cache: new InMemoryCache()
});

