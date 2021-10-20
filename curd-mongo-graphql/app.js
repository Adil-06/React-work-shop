const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');

const authRouter = require('./routes/authRoutes');
const publishRoutes = require('./routes/publisherRoutes')
const bookRoutes = require('./routes/bookRoutes')
const orderRouter = require('./routes/orderRoutes')
const productRoute = require('./routes/productRoutes');
const customerRoute = require ('./routes/customerRoutes')

const signupRoute = require('./routes/userRoutes')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// for db connection
dotenv.config();
mongoose.connect(process.env.URL,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  }, () => {
    console.log(" db connected")
  });


// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/user', authRouter);
app.use('/api', publishRoutes)
app.use('/api', bookRoutes);
app.use('/', orderRouter);
app.use('/', productRoute);
app.use('/', customerRoute);
//for signup users
app.use('/', signupRoute);

// for graphql middlewares
app.use('/graphql', graphqlHttp.graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('server runing')
})