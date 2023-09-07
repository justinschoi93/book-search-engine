const { User, Book } = require('../models/');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            return await User.findById({_id: context.user._id})
            
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
        login: async ( parent, { email, password }) => {
            const user = await User.findOne({email});
            
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
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );

                return updatedUser;
            }

            throw AuthenticationError;
        },
        unsaveBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: {bookId: bookId} } },
                    { new: true }
                );

                return updatedUser;
            }

            throw AuthenticationError;
        }
    }
}

module.exports = resolvers;