const typeDefs = `
type Book {
    _id: ID!
    authors: [String]
    title: String!
    description: String!
    bookId: ID!
    image: String!
}

type User {
    _id: ID!
    username: String
    email: String
    password: String
    bookCount: Int 
    savedBooks: [Book]
}

input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    title: String!
  }

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth!
    saveBook(bookData: BookInput!): User
    unsaveBook(bookId: String!): User
}
`

module.exports = typeDefs;