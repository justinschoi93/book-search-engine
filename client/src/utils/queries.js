import { gql } from '@apollo/client'

export const GET_ME = gql`
    query Me {
        me {
        _id
        username
        email
        password
        bookCount
        savedBooks {
            bookId
            authors
            title
            description
            image
            link
        }
        }
    }
`

export const GET_USERS = gql`
    query ExampleQuery {
        users {
        _id
        bookCount
        email
        password
        username
        savedBooks {
            _id
            authors
            bookId
            description
            image
            link
            title
        }
        }
    }
`