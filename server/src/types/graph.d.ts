export const typeDefs = ["type Me {\n  id: ID!\n  username: String!\n  admin: Boolean!\n}\n\ntype CheckMeResponse {\n  ok: Boolean!\n  error: String\n  user: Me\n}\n\ntype Query {\n  CheckMe: CheckMeResponse!\n  ListBills(cursor: ID, user_id: ID, title: String, hall: String): ListBillsResponse!\n  ReadBill(id: ID!): ReadBillResponse!\n  ViewCart: ViewCartResponse!\n  ListItems(cursor: ID, name: String, divide: String, native: String): ListItemsResponse!\n  ReadItem(id: ID!): ReadItemResponse!\n  hello: String!\n}\n\ntype LoginUserResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  LoginUser(username: String!, password: String!): LoginUserResponse!\n  LogoutUser: LogoutUserResponse!\n  RegisterUser(username: String!, password: String!): RegisterUserResponse!\n  AddBill(title: String!, hall: String!, etc: String!): AddBillResponse!\n  RemoveBill(id: ID!): RemoveBillResponse!\n  RestoreBill(id: ID!): RestoreBillResponse!\n  AddCart(item_id: ID!, count: Int!, price: Int!): AddCartResponse!\n  RemoveCart: RemoveCartResponse!\n  RemoveOne(item_id: ID!): RemoveOneResponse!\n  AddItem(name: String!, divide: String!, native: String!, unit: String!, price: Int!): AddItemResponse!\n  RemoveItem(id: ID!): RemoveItemResponse!\n  UpdateItem(id: ID!, name: String, divide: String, native: String, unit: String, price: String): UpdateItemResponse!\n}\n\ntype LogoutUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RegisterUserResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddBillResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ListBillsResponse {\n  ok: Boolean!\n  error: String\n  bills: [Bill]\n}\n\ntype ReadBillResponse {\n  ok: Boolean!\n  error: String\n  bill: Bill\n}\n\ntype RemoveBillResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RestoreBillResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype AddCartResponse {\n  ok: Boolean!\n  error: String\n  cart: Cart\n}\n\ntype RemoveCartResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype RemoveOneResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ViewCartResponse {\n  ok: Boolean!\n  error: String\n  cart: Cart\n}\n\ntype AddItemResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ListItemsResponse {\n  ok: Boolean!\n  error: String\n  items: [Item]\n}\n\ntype ReadItemResponse {\n  ok: Boolean!\n  error: String\n  item: Item\n}\n\ntype RemoveItemResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateItemResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Bill {\n  id: ID!\n  title: String!\n  hall: String!\n  etc: String!\n  total_amount: Int!\n  items: [InputItem]\n  reserve: Int\n  username: String!\n  user_id: String!\n  cart_id: String!\n  created_at: Date!\n}\n\ntype InputItem {\n  id: ID!\n  name: String!\n  divide: String!\n  native: String!\n  unit: String!\n  price: Int!\n  count: Int!\n  amount: Int!\n}\n\ntype Cart {\n  id: ID!\n  user_id: String!\n  bill_id: String\n  completed: Boolean!\n  deleted: Boolean!\n  items: [InputItem]\n}\n\ntype Item {\n  id: ID!\n  num: Int!\n  name: String!\n  divide: String!\n  native: String!\n  unit: String!\n  price: Int!\n  created_at: Date!\n  updated_at: Date\n}\n\nscalar Date\n\ntype User {\n  id: ID!\n  username: String!\n  password: String!\n  admin: Boolean!\n  token_version: Int!\n  created_at: Date!\n  updated_at: Date\n}\n\ntype Wedding {\n  id: ID!\n  husband: String!\n  bride: String!\n  reserve_pay: Int!\n  husband_rental: Int\n  bride_rental: Int\n  sum_rental: Int!\n  husband_company: Int\n  bride_company: Int\n  sum_company: Int!\n  husband_add: Int\n  bride_add: Int\n  sum_add: Int!\n  husband_today: Int\n  bride_today: Int\n  sum_today: Int!\n  husband_bouquet: Int\n  bride_bouquet: Int\n  sum_bouquet: Int!\n  husband_ceremony: Int\n  bride_ceremony: Int\n  sum_ceremony: Int!\n  husband_hanbok: Int\n  bride_hanbok: Int\n  sum_hanbok: Int!\n  husband_play: Int\n  bride_play: Int\n  sum_play: Int!\n  husband_anthem: Int\n  bride_anthem: Int\n  sum_anthem: Int!\n  husband_moderator: Int\n  bride_moderator: Int\n  sum_moderator: Int!\n  husband_officiate: Int\n  bride_officiate: Int\n  sum_officiate: Int!\n  husband_etc: Int\n  bride_etc: Int\n  sum_etc: Int!\n  husband_conv: Int\n  bride_conv: Int\n  sum_conv: Int!\n  husband_wedding: Int\n  bride_wedding: Int\n  sum_wedding: Int!\n  meals_price: Int!\n  husband_num: Int!\n  bride_num: Int!\n  sum_num: Int!\n  husband_meal: Int!\n  bride_meal: Int!\n  sum_meal: Int!\n  present_price: Int!\n  husband_present_num: Int!\n  bride_present_num: Int!\n  sum_present_num: Int!\n  husband_present: Int!\n  bride_present: Int!\n  sum_present: Int!\n  meal: String!\n  reserve: String!\n  present: String!\n  husband_reserve: Int\n  bride_reserve: Int\n  created_at: Date!\n  updated_at: Date\n  wedding_at: String!\n  event_at: String!\n  user_id: String!\n}\n"];
/* tslint:disable */

export interface Query {
  CheckMe: CheckMeResponse;
  ListBills: ListBillsResponse;
  ReadBill: ReadBillResponse;
  ViewCart: ViewCartResponse;
  ListItems: ListItemsResponse;
  ReadItem: ReadItemResponse;
  hello: string;
}

export interface ListBillsQueryArgs {
  cursor: string | null;
  user_id: string | null;
  title: string | null;
  hall: string | null;
}

export interface ReadBillQueryArgs {
  id: string;
}

export interface ListItemsQueryArgs {
  cursor: string | null;
  name: string | null;
  divide: string | null;
  native: string | null;
}

export interface ReadItemQueryArgs {
  id: string;
}

export interface CheckMeResponse {
  ok: boolean;
  error: string | null;
  user: Me | null;
}

export interface Me {
  id: string;
  username: string;
  admin: boolean;
}

export interface ListBillsResponse {
  ok: boolean;
  error: string | null;
  bills: Array<Bill> | null;
}

export interface Bill {
  id: string;
  title: string;
  hall: string;
  etc: string;
  total_amount: number;
  items: Array<InputItem> | null;
  reserve: number | null;
  username: string;
  user_id: string;
  cart_id: string;
  created_at: Date;
}

export interface InputItem {
  id: string;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  count: number;
  amount: number;
}

export type Date = any;

export interface ReadBillResponse {
  ok: boolean;
  error: string | null;
  bill: Bill | null;
}

export interface ViewCartResponse {
  ok: boolean;
  error: string | null;
  cart: Cart | null;
}

export interface Cart {
  id: string;
  user_id: string;
  bill_id: string | null;
  completed: boolean;
  deleted: boolean;
  items: Array<InputItem> | null;
}

export interface ListItemsResponse {
  ok: boolean;
  error: string | null;
  items: Array<Item> | null;
}

export interface Item {
  id: string;
  num: number;
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
  created_at: Date;
  updated_at: Date | null;
}

export interface ReadItemResponse {
  ok: boolean;
  error: string | null;
  item: Item | null;
}

export interface Mutation {
  LoginUser: LoginUserResponse;
  LogoutUser: LogoutUserResponse;
  RegisterUser: RegisterUserResponse;
  AddBill: AddBillResponse;
  RemoveBill: RemoveBillResponse;
  RestoreBill: RestoreBillResponse;
  AddCart: AddCartResponse;
  RemoveCart: RemoveCartResponse;
  RemoveOne: RemoveOneResponse;
  AddItem: AddItemResponse;
  RemoveItem: RemoveItemResponse;
  UpdateItem: UpdateItemResponse;
}

export interface LoginUserMutationArgs {
  username: string;
  password: string;
}

export interface RegisterUserMutationArgs {
  username: string;
  password: string;
}

export interface AddBillMutationArgs {
  title: string;
  hall: string;
  etc: string;
}

export interface RemoveBillMutationArgs {
  id: string;
}

export interface RestoreBillMutationArgs {
  id: string;
}

export interface AddCartMutationArgs {
  item_id: string;
  count: number;
  price: number;
}

export interface RemoveOneMutationArgs {
  item_id: string;
}

export interface AddItemMutationArgs {
  name: string;
  divide: string;
  native: string;
  unit: string;
  price: number;
}

export interface RemoveItemMutationArgs {
  id: string;
}

export interface UpdateItemMutationArgs {
  id: string;
  name: string | null;
  divide: string | null;
  native: string | null;
  unit: string | null;
  price: string | null;
}

export interface LoginUserResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface LogoutUserResponse {
  ok: boolean;
  error: string | null;
}

export interface RegisterUserResponse {
  ok: boolean;
  error: string | null;
}

export interface AddBillResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveBillResponse {
  ok: boolean;
  error: string | null;
}

export interface RestoreBillResponse {
  ok: boolean;
  error: string | null;
}

export interface AddCartResponse {
  ok: boolean;
  error: string | null;
  cart: Cart | null;
}

export interface RemoveCartResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveOneResponse {
  ok: boolean;
  error: string | null;
}

export interface AddItemResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveItemResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateItemResponse {
  ok: boolean;
  error: string | null;
}

export interface User {
  id: string;
  username: string;
  password: string;
  admin: boolean;
  token_version: number;
  created_at: Date;
  updated_at: Date | null;
}

export interface Wedding {
  id: string;
  husband: string;
  bride: string;
  reserve_pay: number;
  husband_rental: number | null;
  bride_rental: number | null;
  sum_rental: number;
  husband_company: number | null;
  bride_company: number | null;
  sum_company: number;
  husband_add: number | null;
  bride_add: number | null;
  sum_add: number;
  husband_today: number | null;
  bride_today: number | null;
  sum_today: number;
  husband_bouquet: number | null;
  bride_bouquet: number | null;
  sum_bouquet: number;
  husband_ceremony: number | null;
  bride_ceremony: number | null;
  sum_ceremony: number;
  husband_hanbok: number | null;
  bride_hanbok: number | null;
  sum_hanbok: number;
  husband_play: number | null;
  bride_play: number | null;
  sum_play: number;
  husband_anthem: number | null;
  bride_anthem: number | null;
  sum_anthem: number;
  husband_moderator: number | null;
  bride_moderator: number | null;
  sum_moderator: number;
  husband_officiate: number | null;
  bride_officiate: number | null;
  sum_officiate: number;
  husband_etc: number | null;
  bride_etc: number | null;
  sum_etc: number;
  husband_conv: number | null;
  bride_conv: number | null;
  sum_conv: number;
  husband_wedding: number | null;
  bride_wedding: number | null;
  sum_wedding: number;
  meals_price: number;
  husband_num: number;
  bride_num: number;
  sum_num: number;
  husband_meal: number;
  bride_meal: number;
  sum_meal: number;
  present_price: number;
  husband_present_num: number;
  bride_present_num: number;
  sum_present_num: number;
  husband_present: number;
  bride_present: number;
  sum_present: number;
  meal: string;
  reserve: string;
  present: string;
  husband_reserve: number | null;
  bride_reserve: number | null;
  created_at: Date;
  updated_at: Date | null;
  wedding_at: string;
  event_at: string;
  user_id: string;
}
