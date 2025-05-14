import { gql } from "@apollo/client";

export const UPDATE_DUUNI = gql`
  mutation UpdateDuuni($id: ID!, $input: UpdateDuuniInput!) {
    updateDuuni(id: $id, input: $input) {
      id
      firma
      title
      haettu
      vastattu
      vastaus
      extra
    }
  }
`;
