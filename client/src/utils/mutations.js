
import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
    mutation saveBook($bookToSave: BookType) {
        saveBook(bookToSave: $bookToSave) {
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
    }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


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
