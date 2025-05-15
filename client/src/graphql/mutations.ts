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

export const ADD_DUUNI = gql`
  mutation AddDuuni($input: AddDuuniInput!) {
    addDuuni(input: $input) {
      haettu
      firma
      title
    }
  }
`;

export const DELETE_DUUNI = gql`
  mutation DeleteDuuni($id: ID!) {
    deleteDuuni(id: $id)
  }
`;
