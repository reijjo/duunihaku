import type { Duuni } from "../utils/types";
import DuuniModel from "./models/duuniModel";

export const typeDefs = `
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
    findDuuniById(id: ID!): Duuni
  }

    type Mutation {
    updateDuuni(id: ID!, input: UpdateDuuniInput!): Duuni
    addDuuni(input: AddDuuniInput!): Duuni
    deleteDuuni(id: ID!): String
  }

  input AddDuuniInput {
    haettu: String!
    firma: String!
    title: String!
  }

  input UpdateDuuniInput {
    firma: String
    title: String
    haettu: String
    vastattu: String
    vastaus: String
    extra: String
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
        vastaus: duuni.vastaus,
        vastattu: duuni.vastattu ? duuni.vastattu.toISOString() : null,
        extra: duuni.extra,
      }));
    },
    findDuuniById: async (_parent: unknown, args: { id: string }) => {
      const duuni = await DuuniModel.findById(args.id);
      if (!duuni) return null;

      return {
        id: duuni.id,
        firma: duuni.firma,
        title: duuni.title,
        haettu: duuni.haettu ? duuni.haettu.toISOString() : null,
        vastattu: duuni.vastattu ? duuni.vastattu.toISOString() : null,
        vastaus: duuni.vastaus ?? "",
        extra: duuni.extra ?? "",
      };
    },
  },
  Mutation: {
    updateDuuni: async (
      _parent: unknown,
      args: { id: string; input: Partial<Duuni> }
    ) => {
      const { id, input } = args;

      const updatedData = {
        ...input,
        haettu: input.haettu ? new Date(input.haettu) : undefined,
        vastattu: input.vastattu ? new Date(input.vastattu) : undefined,
      };

      const updatedDuuni = await DuuniModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      });

      if (!updatedDuuni) return null;

      return {
        id: updatedDuuni.id,
        firma: updatedDuuni.firma,
        title: updatedDuuni.title,
        haettu: updatedDuuni.haettu?.toISOString() ?? null,
        vastattu: updatedDuuni.vastattu?.toISOString() ?? null,
        vastaus: updatedDuuni.vastaus ?? "",
        extra: updatedDuuni.extra ?? "",
      };
    },
    addDuuni: async (_parent: unknown, args: { input: Partial<Duuni> }) => {
      const { input } = args;

      if (!input.firma || !input.title) {
        throw new Error("firma or title is missing");
      }

      const duuni = new DuuniModel({
        haettu: input.haettu,
        firma: input.firma,
        title: input.title,
      });

      try {
        const savedDuuni = await duuni.save();
        return savedDuuni;
      } catch (err) {
        console.error("Failed to save duuni", err);
        throw new Error("Failed to save duuni");
      }
    },
    deleteDuuni: async (_parent: unknown, args: { id: string }) => {
      const { id } = args;

      try {
        const deleted = await DuuniModel.findByIdAndDelete(id);
        if (!deleted) {
          throw new Error("Duuni not found");
        }
        return "Duuni deleted successfully";
      } catch (err) {
        console.error("Failed to delete duuni", err);
        throw new Error("Failed to delete duuni");
      }
    },
  },
};
