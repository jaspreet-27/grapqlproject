import { gql } from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import userResolvers from "../graphql/resolvers/userResolver";
import {merge} from "lodash";

const typeDefs = gql`

  type User {  
    _id: String
    Name: String
    email: String
    password:String
  }
  input UserInput {
    _id: String
    Name: String
    email: String
    password:String
  }
#################################### Query & mutation ################################
  type Query {
    getUsers(_id:String!):User
  }

  type Mutation {
    createUser(user:UserInput): User
    updateUser(_id: String!, update: UserInput): User
    deleteUser(_id:String!):User
  }
`;

export const resolvers = merge(userResolvers);

export const executableSchema = makeExecutableSchema({
  resolvers: {
    ...resolvers
  },
  typeDefs
});
