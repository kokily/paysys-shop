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
}
