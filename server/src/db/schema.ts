import DuuniModel from "./models/duuniModel";

export const typeDefs = `
  type Query {
    hello: String
  }

  type Duuni {
    id: ID!
    firma: String!
    title: String!
    haettu: String
    vastattu: String
    extra: String
  }

  type Query {
    getAllDuunit: [Duuni!]!
  }
`;

export const resolvers = {
  Query: {
    getAllDuunit: async () => {
      const duunit = await DuuniModel.find({}).sort({ haettu: -1 });
      return duunit;
    },
    hello: () => "Hello world from GraphQL!",
  },
};
