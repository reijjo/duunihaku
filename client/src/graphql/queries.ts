import { gql } from "@apollo/client";

export const GET_ALL_DUUNIT = gql`
  query GetAllDuunit($sortBy: SortOption) {
    getAllDuunit(sortBy: $sortBy) {
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

export const FIND_DUUNI_BY_ID = gql`
  query FindDuuniById($id: ID!) {
    findDuuniById(id: $id) {
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
