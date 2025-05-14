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
    vastaus: String
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
      return duunit.map((duuni) => ({
        id: duuni.id,
        firma: duuni.firma,
        title: duuni.title,
        haettu: duuni.haettu ? duuni.haettu.toISOString() : null,
        vastattu: duuni.vastattu ? duuni.vastattu.toISOString() : null,
        extra: duuni.extra,
      }));
    },
    hello: () => "Hello world from GraphQL!",
  },
};
