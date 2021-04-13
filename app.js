const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//? GRAPHQL ///

const { ApolloServer, gql } = require('apollo-server-express');

// const { typeDefs } = require('./model/schema');
const { readFileSync } = require('fs')

const typeDefs = readFileSync('./graphql/typeDef.gql').toString('utf-8')

const {resolvers} = require('./graphql/resolvers')

//? APOLLO SERVER INSTANCE 

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,       //! If we have set NODE_ENV = "PRODUCTION" then this is required to enable the graphql playground
    introspection: true     //! If we have set NODE_ENV = "PRODUCTION" then this is required to enable the graphql playground
});

/* const server = new ApolloServer({
    typeDefs: schema schema .typeDefs,
    resolvers: schema.resolvers,
    playground: true,       //! If we have set NODE_ENV = "PRODUCTION" then this is required to enable the graphql playground
    introspection: true     //! If we have set NODE_ENV = "PRODUCTION" then this is required to enable the graphql playground

}); */

//? EXPRESS SERVER LISTENING

const app = express();

//? APOLLO SERVER LISTENING

/* server.start().then(() => {
    console.log('Apollo server started!')
}) */

server.applyMiddleware({ app });

app.use(express.json());        // BODY PARSER
app.use(morgan('dev'));
app.use('*', cors);

/* app.use((req, res) => {
    res.status(200);
    res.send('Hello From Express server');
    res.end();
}) */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:` + PORT + `${server.graphqlPath}`);
})