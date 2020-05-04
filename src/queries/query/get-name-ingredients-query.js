import { gql } from 'apollo-boost';

const getNameIngredientsQuery = gql`
  query {
    ingredients {
      id
      name
    }
  }
`;

export default getNameIngredientsQuery;
