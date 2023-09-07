
import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
  mutation SaveBook($bookToSave: BookType) {
    saveBook(bookToSave: $bookToSave) {
      savedBooks {
        title
        authors
        bookId
      }
    }
  }`;

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      password
    }
  }
}
`


export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        user {
            _id
            username
            email
            password
            bookCount
            savedBooks {
            _id
            authors
            title
            description
            bookId
            image
            link
            }
        }
        token
        }
    }

`;

// export const UNSAVE_BOOK = gql`
// `;
