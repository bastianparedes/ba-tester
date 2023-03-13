import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Link {
    id: String
    title: String
    description: String
  }

  type Query {
    links: [Link]!
  }
`;
