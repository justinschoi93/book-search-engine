const { User, Book } = require('../models/');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            return await User.findById(args.id)
        },
        users: async () => {
            return await User.find();
        }
    },
    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            try {
                const user = await User.create({username, email, password});
                const token = signToken(user);
                
                return { token, user }

            } catch (err) {
                console.log(err);
            }
        },
        login: async ( parent, { username, password }) => {
            const user = await User.findOne({username});
            
            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw){
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { bookToSave }, context) => {
            // dont forget to destructure args
            if (!context.user) {
                throw AuthenticationError;
            }
            console.log(context.user._id);
            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookToSave.bookId }},
                { new: true }
            )
        },
        unsaveBook: async (parent, {}, context) => {
            const book = await Book.findById();

            return User.findOneAndUpdate(
                {$pull: {savedbooks: book}}
            )
        }
    }
}

module.exports = resolvers;