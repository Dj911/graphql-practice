const Movies = require('../model/movies').Movies;

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