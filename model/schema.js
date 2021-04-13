const { gql } = require('apollo-server-express');
const Movies = require('./movies').Movies;

exports.typeDefs = gql`
    type Movie {
        id: ID!
        name: String!
        producer: String!
        rating: Float!
    }

    type Query {
        getMovies: [Movie]!,
        getMovie(id: ID!): Movie!
    }
    type Mutation {
        addMovie(name: String!,producer: String!, rating: Float!): Movie,
        updateMovie(id: ID!,name: String!,producer: String!, rating: Float): Movie,
        deleteMovie(id: ID!): Movie!
    }

`;

exports.resolvers = {
    Query: {
        getMovies: (parent, args) => { return Movies.find({}) },
        getMovie: (parent, args) => {
            return Movies.findById(args.id);
        }
    },
    Mutation: {
        addMovie: (parent, args) => {
            return Movies.create({
                name: args.name,
                producer: args.producer,
                rating: args.rating
            })
        },
        updateMovie: (parent, args) => {
            return Movies.findByIdAndUpdate(args.id, {
                name: args.name,
                producer: args.producer,
                rating: args.rating
            },{
                new: true,
                runValidators: false,
            })
        },
        deleteMovie: (parent,args) =>{
            return Movies.findByIdAndDelete(args.id);
        }
    }
}