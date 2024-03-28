import type { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';

declare global {
  interface AddExpensePayload {
    husbandName: string;
    brideName: string;
    rentalHusband: Int;
    swordHusband: Int;
    gloveHusband: Int;
    swordSetHusband: Int;
    bouquetHusband: Int;
    companyHusband: Int;
    hostHusband: Int;
    frameHusband: Int;
    dressHusband: Int;
    etcHusband: Int;
    rentalBride: Int;
    swordBride: Int;
    gloveBride: Int;
    swordSetBride: Int;
    bouquetBride: Int;
    companyBride: Int;
    hostBride: Int;
    frameBride: Int;
    dressBride: Int;
    etcBride: Int;
    weddingHusbandCost: Int;
    weddingBrideCost: Int;
    mealsMethod: string;
    mealsPrice: Int;
    mealsHusband: Int;
    mealsBride: Int;
    mealsHusbandCost: Int;
    mealsBrideCost: Int;
    reserveMethod: string;
    reservePrice: Int;
    reserveHusbandCost: Int;
    reserveBrideCost: Int;
    eventAt: string;
    weddingAt: string;
  }

  interface AddExpenseState {
    husbandName: string;
    brideName: string;
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
    weddingAt: string;
    eventAt: string;
  }

  type MealsMethodType = 'privacy' | 'husband' | 'bride' | 'half';
  type ReserveMethodType = 'half' | 'husband' | 'bride';

  interface ExpenseContents {
    husbandName: string;
    brideName: string;
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
    weddingAt: string;
    eventAt: string;
    onBack: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onAddExpense: (e: SyntheticEvent) => void;
    setStartDate: Dispatch<SetStateAction<Date>>;
  }

  interface ExpenseDataType {
    value: string;
    title: string;
  }
}
