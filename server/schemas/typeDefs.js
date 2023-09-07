const typeDefs = `
type Book {
    _id: ID!
    authors: [String]
    title: String!
    description: String!
    bookId: ID!
    image: String!
    link: String!
}

type User {
    _id: ID!
    username: String
    email: String
    password: String
    bookCount: Int 
    savedBooks: [Book]
}

input BookType {
    _id: ID
    authors: [String]!
    title: String!
    description: String!
    bookId: ID!
    image: String
    link: String
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
    saveBook(bookId: ID!, title: String!, authors: [String]!, description: String!, image: String! ): User
    unsaveBook(bookId: ID!): User
}
`

module.exports = typeDefs;