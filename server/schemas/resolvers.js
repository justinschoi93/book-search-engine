const { User, Book } = require('../models/');
const {signToken, AuthenticationError} = require('../utils/auth');

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
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user }
        },
        saveBook: async (parent, {}, context) => {
            // dont forget to destructure args
            const book = await Book.findById();

            return User.findOneAndUpdate(
                {},
                { $addToSet: {savedBooks: book}},
                { new: true }
            )
        },
        unSaveBook: async (parent, {}, context) => {
            const book = await Book.findById();

            return User.findOneAndUpdate(
                {$pull: {savedbooks: book}}
            )
        }
    }
}

module.exports = resolvers;