import type { ChangeEvent, SetStateAction, Dispatch } from 'react';

declare global {
  interface ListWeddingsQueries {
    husbandName?: string;
    brideName?: string;
    cursor?: string;
  }

  interface ListWeddingsState {
    divide: 'husband' | 'bride';
    husbandName: string;
    brideName: string;
  }

  // Expense Types
  interface AddExpenseState {
    husbandName: string;
    brideName: string;
    weddingAt: string;
    eventAt: string;
    rentalHusband: string;
    swordHusband: string;
    gloveHusband: string;
    swordSetHusband: string;
    bouquetHusband: string;
    companyHusband: string;
    hostHusband: string;
    frameHusband: string;
    dressHusband: string;
    etcHusband: string;
    rentalBride: string;
    swordBride: string;
    gloveBride: string;
    swordSetBride: string;
    bouquetBride: string;
    companyBride: string;
    hostBride: string;
    frameBride: string;
    dressBride: string;
    etcBride: string;
    weddingHusbandCost: string;
    weddingBrideCost: string;
    mealsMethod: string;
    mealsPrice: string;
    mealsHusband: string;
    mealsBride: string;
    mealsHusbandCost: string;
    mealsBrideCost: string;
    reserveMethod: string;
    reservePrice: string;
    reserveHusbandCost: string;
    reserveBrideCost: string;
  }

  interface AddExpensePayload {
    husbandName: string;
    brideName: string;
    weddingAt: string;
    eventAt: string;
    rentalHusband: number;
    swordHusband: number;
    gloveHusband: number;
    swordSetHusband: number;
    bouquetHusband: number;
    companyHusband: number;
    hostHusband: number;
    frameHusband: number;
    dressHusband: number;
    etcHusband: number;
    rentalBride: number;
    swordBride: number;
    gloveBride: number;
    swordSetBride: number;
    bouquetBride: number;
    companyBride: number;
    hostBride: number;
    frameBride: number;
    dressBride: number;
    etcBride: number;
    weddingHusbandCost: number;
    weddingBrideCost: number;
    mealsMethod: string;
    mealsPrice: number;
    mealsHusband: number;
    mealsBride: number;
    mealsHusbandCost: number;
    mealsBrideCost: number;
    reserveMethod: string;
    reservePrice: number;
    reserveHusbandCost: number;
    reserveBrideCost: number;
  }

  type MealsMethodType = 'privacy' | 'husband' | 'bride' | 'half';
  type ReserveMethodType = 'half' | 'husband' | 'bride';

  interface ExpenseContents {
    husbandName: string;
    brideName: string;
    weddingAt: Date;
    eventAt: string;
    rentalHusband: string;
    swordHusband: string;
    gloveHusband: string;
    swordSetHusband: string;
    bouquetHusband: string;
    companyHusband: string;
    hostHusband: string;
    frameHusband: string;
    dressHusband: string;
    etcHusband: string;
    rentalBride: string;
    swordBride: string;
    gloveBride: string;
    swordSetBride: string;
    bouquetBride: string;
    companyBride: string;
    hostBride: string;
    frameBride: string;
    dressBride: string;
    etcBride: string;
    mealsMethod: string;
    mealsPrice: string;
    mealsHusband: string;
    mealsBride: string;
    reserveMethod: string;
    reservePrice: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    setStartDate: Dispatch<SetStateAction<Date>>;
  }

  interface ExpenseDataType {
    value: string;
    title: string;
  }
}
