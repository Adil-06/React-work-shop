const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema/schema');
const graphqlResolver = require('./graphql/resolver/resolvers');
const isAuth = require('./middleware/isAuth');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(isAuth);

app.use('/graphql', graphqlHttp.graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true
}));

dotenv.config();
mongoose.connect(process.env.MONGO_CONNECTION,
  { useNewUrlParser: true,  useUnifiedTopology: true }
).then(() => { console.log("db connected") })
  .catch((err) => {
    console.log(err);
  });

app.listen(8080, () => {
  console.log('server running on 8080');
})