import './App.css';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error'
import GetAllUser from './Components/GetAllUser';

const inmemoryCache = new InMemoryCache();
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`graphql error ${message}`);
    })
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" })
]);

const client = new ApolloClient({
   cache :inmemoryCache,
  link: link
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Graphql client</h1>
        <GetAllUser/>
      </div>
    </ApolloProvider>
  );
}

export default App;
