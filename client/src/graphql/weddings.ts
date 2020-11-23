import { gql } from 'apollo-boost';

// Add Wedding API
export const ADD_WEDDING = gql`
  mutation AddWedding(
    $husband: String!
    $bride: String!
    $reserve_pay: Int!
    $husband_rental: Int!
    $bride_rental: Int!
    $sum_rental: Int!
    $husband_company: Int!
    $bride_company: Int!
    $sum_company: Int!
    $husband_add: Int!
    $bride_add: Int!
    $sum_add: Int!
    $husband_today: Int!
    $bride_today: Int!
    $sum_today: Int!
    $husband_bouquet: Int!
    $bride_bouquet: Int!
    $sum_bouquet: Int!
    $husband_ceremony: Int!
    $bride_ceremony: Int!
    $sum_ceremony: Int!
    $husband_hanbok: Int!
    $bride_hanbok: Int!
    $sum_hanbok: Int!
    $husband_play: Int!
    $bride_play: Int!
    $sum_play: Int!
    $husband_anthem: Int!
    $bride_anthem: Int!
    $sum_anthem: Int!
    $husband_moderator: Int!
    $bride_moderator: Int!
    $sum_moderator: Int!
    $husband_officiate: Int!
    $bride_officiate: Int!
    $sum_officiate: Int!
    $husband_etc: Int!
    $bride_etc: Int!
    $sum_etc: Int!
    $husband_conv: Int!
    $bride_conv: Int!
    $sum_conv: Int!
    $husband_wedding: Int!
    $bride_wedding: Int!
    $sum_wedding: Int!
    $meals_price: Int!
    $husband_num: Int!
    $bride_num: Int!
    $sum_num: Int!
    $husband_meal: Int!
    $bride_meal: Int!
    $sum_meal: Int!
    $present_price: Int!
    $husband_present_num: Int!
    $bride_present_num: Int!
    $sum_present_num: Int!
    $husband_present: Int!
    $bride_present: Int!
    $sum_present: Int!
    $meal: String!
    $reserve: String!
    $present: String!
    $husband_reserve: Int!
    $bride_reserve: Int!
    $wedding_at: String!
    $event_at: String!
  ) {
    AddWedding(
      husband: $husband
      bride: $bride
      reserve_pay: $reserve_pay
      husband_rental: $husband_rental
      bride_rental: $bride_rental
      sum_rental: $sum_rental
      husband_company: $husband_company
      bride_company: $bride_company
      sum_company: $sum_company
      husband_add: $husband_add
      bride_add: $bride_add
      sum_add: $sum_add
      husband_today: $husband_today
      bride_today: $bride_today
      sum_today: $sum_today
      husband_bouquet: $husband_bouquet
      bride_bouquet: $bride_bouquet
      sum_bouquet: $sum_bouquet
      husband_ceremony: $husband_ceremony
      bride_ceremony: $bride_ceremony
      sum_ceremony: $sum_ceremony
      husband_hanbok: $husband_hanbok
      bride_hanbok: $bride_hanbok
      sum_hanbok: $sum_hanbok
      husband_play: $husband_play
      bride_play: $bride_play
      sum_play: $sum_play
      husband_anthem: $husband_anthem
      bride_anthem: $bride_anthem
      sum_anthem: $sum_anthem
      husband_moderator: $husband_moderator
      bride_moderator: $bride_moderator
      sum_moderator: $sum_moderator
      husband_officiate: $husband_officiate
      bride_officiate: $bride_officiate
      sum_officiate: $sum_officiate
      husband_etc: $husband_etc
      bride_etc: $bride_etc
      sum_etc: $sum_etc
      husband_conv: $husband_conv
      bride_conv: $bride_conv
      sum_conv: $sum_conv
      husband_wedding: $husband_wedding
      bride_wedding: $bride_wedding
      sum_wedding: $sum_wedding
      meals_price: $meals_price
      husband_num: $husband_num
      bride_num: $bride_num
      sum_num: $sum_num
      husband_meal: $husband_meal
      bride_meal: $bride_meal
      sum_meal: $sum_meal
      present_price: $present_price
      husband_present_num: $husband_present_num
      bride_present_num: $bride_present_num
      sum_present_num: $sum_present_num
      husband_present: $husband_present
      bride_present: $bride_present
      sum_present: $sum_present
      meal: $meal
      reserve: $reserve
      present: $present
      husband_reserve: $husband_reserve
      bride_reserve: $bride_reserve
      wedding_at: $wedding_at
      event_at: $event_at
    ) {
      ok
      error
    }
  }
`;

// List Weddings API
export const LIST_WEDDINGS = gql`
  query ListWeddings($date: String, $cursor: ID) {
    ListWeddings(date: $date, cursor: $cursor) {
      ok
      error
      weddings {
        id
        husband
        bride
        reserve_pay
        husband_rental
        bride_rental
        sum_rental
        husband_company
        bride_company
        sum_company
        husband_add
        bride_add
        sum_add
        husband_today
        bride_today
        sum_today
        husband_bouquet
        bride_bouquet
        sum_bouquet
        husband_ceremony
        bride_ceremony
        sum_ceremony
        husband_hanbok
        bride_hanbok
        sum_hanbok
        husband_play
        bride_play
        sum_play
        husband_anthem
        bride_anthem
        sum_anthem
        husband_moderator
        bride_moderator
        sum_moderator
        husband_officiate
        bride_officiate
        sum_officiate
        husband_etc
        bride_etc
        sum_etc
        husband_conv
        bride_conv
        sum_conv
        husband_wedding
        bride_wedding
        sum_wedding
        meals_price
        husband_num
        bride_num
        sum_num
        husband_meal
        bride_meal
        sum_meal
        present_price
        husband_present_num
        bride_present_num
        sum_present_num
        husband_present
        bride_present
        sum_present
        meal
        reserve
        present
        husband_reserve
        bride_reserve
        created_at
        updated_at
        wedding_at
        event_at
      }
    }
  }
`;

// Read Wedding API
export const READ_WEDDING = gql`
  query ReadWedding($id: ID!) {
    ReadWedding(id: $id) {
      ok
      error
      wedding {
        id
        husband
        bride
        reserve_pay
        husband_rental
        bride_rental
        sum_rental
        husband_company
        bride_company
        sum_company
        husband_add
        bride_add
        sum_add
        husband_today
        bride_today
        sum_today
        husband_bouquet
        bride_bouquet
        sum_bouquet
        husband_ceremony
        bride_ceremony
        sum_ceremony
        husband_hanbok
        bride_hanbok
        sum_hanbok
        husband_play
        bride_play
        sum_play
        husband_anthem
        bride_anthem
        sum_anthem
        husband_moderator
        bride_moderator
        sum_moderator
        husband_officiate
        bride_officiate
        sum_officiate
        husband_etc
        bride_etc
        sum_etc
        husband_conv
        bride_conv
        sum_conv
        husband_wedding
        bride_wedding
        sum_wedding
        meals_price
        husband_num
        bride_num
        sum_num
        husband_meal
        bride_meal
        sum_meal
        present_price
        husband_present_num
        bride_present_num
        sum_present_num
        husband_present
        bride_present
        sum_present
        meal
        reserve
        present
        husband_reserve
        bride_reserve
        created_at
        updated_at
        wedding_at
        event_at
        user_id
      }
    }
  }
`;

// Remove Wedding API
export const REMOVE_WEDDING = gql`
  mutation RemoveWedding($id: ID!) {
    RemoveWedding(id: $id) {
      ok
      error
    }
  }
`;

// Update Wedding API
export const UPDATE_WEDDING = gql`
  mutation UpdateWedding(
    $id: ID!
    $husband: String
    $bride: String
    $reserve_pay: Int
    $husband_rental: Int
    $bride_rental: Int
    $sum_rental: Int
    $husband_company: Int
    $bride_company: Int
    $sum_company: Int
    $husband_add: Int
    $bride_add: Int
    $sum_add: Int
    $husband_today: Int
    $bride_today: Int
    $sum_today: Int
    $husband_bouquet: Int
    $bride_bouquet: Int
    $sum_bouquet: Int
    $husband_ceremony: Int
    $bride_ceremony: Int
    $sum_ceremony: Int
    $husband_hanbok: Int
    $bride_hanbok: Int
    $sum_hanbok: Int
    $husband_play: Int
    $bride_play: Int
    $sum_play: Int
    $husband_anthem: Int
    $bride_anthem: Int
    $sum_anthem: Int
    $husband_moderator: Int
    $bride_moderator: Int
    $sum_moderator: Int
    $husband_officiate: Int
    $bride_officiate: Int
    $sum_officiate: Int
    $husband_etc: Int
    $bride_etc: Int
    $sum_etc: Int
    $husband_conv: Int
    $bride_conv: Int
    $sum_conv: Int
    $husband_wedding: Int
    $bride_wedding: Int
    $sum_wedding: Int
    $meals_price: Int
    $husband_num: Int
    $bride_num: Int
    $sum_num: Int
    $husband_meal: Int
    $bride_meal: Int
    $sum_meal: Int
    $present_price: Int
    $husband_present_num: Int
    $bride_present_num: Int
    $sum_present_num: Int
    $husband_present: Int
    $bride_present: Int
    $sum_present: Int
    $meal: String
    $reserve: String
    $present: String
    $husband_reserve: Int
    $bride_reserve: Int
    $wedding_at: String
    $event_at: String
  ) {
    UpdateWedding(
      id: $id
      husband: $husband
      bride: $bride
      reserve_pay: $reserve_pay
      husband_rental: $husband_rental
      bride_rental: $bride_rental
      sum_rental: $sum_rental
      husband_company: $husband_company
      bride_company: $bride_company
      sum_company: $sum_company
      husband_add: $husband_add
      bride_add: $bride_add
      sum_add: $sum_add
      husband_today: $husband_today
      bride_today: $bride_today
      sum_today: $sum_today
      husband_bouquet: $husband_bouquet
      bride_bouquet: $bride_bouquet
      sum_bouquet: $sum_bouquet
      husband_ceremony: $husband_ceremony
      bride_ceremony: $bride_ceremony
      sum_ceremony: $sum_ceremony
      husband_hanbok: $husband_hanbok
      bride_hanbok: $bride_hanbok
      sum_hanbok: $sum_hanbok
      husband_play: $husband_play
      bride_play: $bride_play
      sum_play: $sum_play
      husband_anthem: $husband_anthem
      bride_anthem: $bride_anthem
      sum_anthem: $sum_anthem
      husband_moderator: $husband_moderator
      bride_moderator: $bride_moderator
      sum_moderator: $sum_moderator
      husband_officiate: $husband_officiate
      bride_officiate: $bride_officiate
      sum_officiate: $sum_officiate
      husband_etc: $husband_etc
      bride_etc: $bride_etc
      sum_etc: $sum_etc
      husband_conv: $husband_conv
      bride_conv: $bride_conv
      sum_conv: $sum_conv
      husband_wedding: $husband_wedding
      bride_wedding: $bride_wedding
      sum_wedding: $sum_wedding
      meals_price: $meals_price
      husband_num: $husband_num
      bride_num: $bride_num
      sum_num: $sum_num
      husband_meal: $husband_meal
      bride_meal: $bride_meal
      sum_meal: $sum_meal
      present_price: $present_price
      husband_present_num: $husband_present_num
      bride_present_num: $bride_present_num
      sum_present_num: $sum_present_num
      husband_present: $husband_present
      bride_present: $bride_present
      sum_present: $sum_present
      meal: $meal
      reserve: $reserve
      present: $present
      husband_reserve: $husband_reserve
      bride_reserve: $bride_reserve
      wedding_at: $wedding_at
      event_at: $event_at
    ) {
      ok
      error
      wedding {
        id
        husband
        bride
        reserve_pay
        husband_rental
        bride_rental
        sum_rental
        husband_company
        bride_company
        sum_company
        husband_add
        bride_add
        sum_add
        husband_today
        bride_today
        sum_today
        husband_bouquet
        bride_bouquet
        sum_bouquet
        husband_ceremony
        bride_ceremony
        sum_ceremony
        husband_hanbok
        bride_hanbok
        sum_hanbok
        husband_play
        bride_play
        sum_play
        husband_anthem
        bride_anthem
        sum_anthem
        husband_moderator
        bride_moderator
        sum_moderator
        husband_officiate
        bride_officiate
        sum_officiate
        husband_etc
        bride_etc
        sum_etc
        husband_conv
        bride_conv
        sum_conv
        husband_wedding
        bride_wedding
        sum_wedding
        meals_price
        husband_num
        bride_num
        sum_num
        husband_meal
        bride_meal
        sum_meal
        present_price
        husband_present_num
        bride_present_num
        sum_present_num
        husband_present
        bride_present
        sum_present
        meal
        reserve
        present
        husband_reserve
        bride_reserve
        created_at
        updated_at
        wedding_at
        event_at
        user_id
      }
    }
  }
`;
