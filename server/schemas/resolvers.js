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
        unsaveBook: async (parent, {}, context) => {
            const book = await Book.findById();

            return User.findOneAndUpdate(
                {$pull: {savedbooks: book}}
            )
        }
    }
}

module.exports = resolvers;