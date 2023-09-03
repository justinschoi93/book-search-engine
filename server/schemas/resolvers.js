const { User, Book } = require('../models/');

const resolvers = {
    Query: {
        books: async () => {
            return await Book.find({});
        },
        book: async (parent, args) => {
            return await Book.findById(args.id)
        },
        users: async () => {
            return await User.find({});
        },
        user: async (parent, args) => {
            return await User.findById(args.id)
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            // dont forget to destructure args
        },
        saveBook: async (parent, args) => {
            // dont forget to destructure args

        }
    }
}

module.exports = resolvers;