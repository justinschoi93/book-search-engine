
import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
mutation SaveBook($bookId: ID!, $title: String!, $authors: [String]!, $description: String!, $image: String!) {
  saveBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image) {
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
