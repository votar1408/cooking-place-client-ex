import { gql } from 'apollo-boost';

const addIngredientMutation = gql`
  mutation(
    $name: String!
    $totalCalories: String!
    $proteins: String!
    $carbohydrates: String!
    $fats: String!
    $createdBy: ID!
  ) {
    addIngredient(
      name: $name
      totalCalories: $totalCalories
      proteins: $proteins
      carbohydrates: $carbohydrates
      fats: $fats
      createdBy: $createdBy
    ) {
      id
      name
      totalCalories
      proteins
      carbohydrates
      fats
      createdBy
      msg
    }
  }
`;

export default addIngredientMutation;
