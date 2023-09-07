import { gql } from '@apollo/client'

export const GET_ME = gql`
query Me {
    me {
      bookCount
      savedBooks {
        authors
        bookId
        description
        image
        title
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