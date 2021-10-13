import { gql } from '@apollo/client'
export const LOAD_USERS = gql`
query{
    getUsers{
      id
      name
      email
    }
  }
`