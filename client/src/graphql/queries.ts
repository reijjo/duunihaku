import { gql } from "@apollo/client";

export const GET_ALL_DUUNIT = gql`
  query GetAllDuunit {
    getAllDuunit {
      id
      firma
      title
      haettu
      vastattu
      extra
    }
  }
`;
