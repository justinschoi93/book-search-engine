const typeDefs = `
type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Query {
    books: [Book]
    book(id: ID!): Book
    users: [User]
    user(id: ID!): User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(): Book
    removeBook
}
`

module.exports = typeDefs;