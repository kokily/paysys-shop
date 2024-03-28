import type { ChangeEvent, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { readWeddingAPI } from '../../api/weddings';
import { addExpenseAPI, updateExpenseAPI } from '../../api/expense';
import { initialState } from './state';

interface Props {
  id?: string;
}

export function useExpense({ id }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  let weddingHusbandCost = 0;
  let weddingBrideCost = 0;
  let mealsHusbandCost = 0;
  let mealsBrideCost = 0;
  let reserveHusbandCost = 0;
  let reserveBrideCost = 0;

  // States
  const [startDate, setStartDate] = useState(new Date());
  const [payload, setPayload] = useState(initialState);
  const {
    husbandName,
    brideName,
    rentalHusband,
    swordHusband,
    gloveHusband,
    swordSetHusband,
    bouquetHusband,
    companyHusband,
    hostHusband,
    frameHusband,
    dressHusband,
    etcHusband,
    rentalBride,
    swordBride,
    gloveBride,
    swordSetBride,
    bouquetBride,
    companyBride,
    hostBride,
    frameBride,
    dressBride,
    etcBride,
    mealsMethod,
    mealsPrice,
    mealsHusband,
    mealsBride,
    reserveMethod,
    reservePrice,
    weddingAt,
    eventAt,
  } = payload;

  // Data Fetching for update
  const { data } = useQuery({
    queryKey: ['updateExpense'],
    queryFn: () => readWeddingAPI(id!),
    enabled: !!id,
  });

  // Data Mutations
  const addExpenseMutate = useMutation({ mutationFn: addExpenseAPI });
  const updateExpenseMutate = useMutation({ mutationFn: updateExpenseAPI });

  const onBack = () => {
    router.back();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const onAddExpense = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      [
        husbandName,
        brideName,
        rentalHusband,
        swordHusband,
        gloveHusband,
        swordSetHusband,
        bouquetHusband,
        companyHusband,
        hostHusband,
        frameHusband,
        dressHusband,
        etcHusband,
        rentalBride,
        swordBride,
        gloveBride,
        swordSetBride,
        bouquetBride,
        companyBride,
        hostBride,
        frameBride,
        dressBride,
        etcBride,
        mealsMethod,
        mealsPrice,
        mealsHusband,
        mealsBride,
        reserveMethod,
        reservePrice,
        weddingAt,
        eventAt,
      ].includes('')
    ) {
      toast.error('빈 칸 없이 입력해주세요');
      return;
    }

    // Weddings
    weddingHusbandCost =
      parseInt(husbandName) +
      parseInt(rentalHusband) +
      parseInt(swordHusband) +
      parseInt(gloveHusband) +
      parseInt(swordSetHusband) +
      parseInt(bouquetHusband) +
      parseInt(companyHusband) +
      parseInt(hostHusband) +
      parseInt(frameHusband) +
      parseInt(dressHusband) +
      parseInt(etcHusband);

    weddingBrideCost =
      parseInt(brideName) +
      parseInt(rentalBride) +
      parseInt(swordBride) +
      parseInt(gloveBride) +
      parseInt(swordSetBride) +
      parseInt(bouquetBride) +
      parseInt(companyBride) +
      parseInt(hostBride) +
      parseInt(frameBride) +
      parseInt(dressBride) +
      parseInt(etcBride);

    // Meals
    switch (mealsMethod) {
      case 'privacy':
        mealsHusbandCost = parseInt(mealsPrice) * parseInt(mealsHusband);
        mealsBrideCost = parseInt(mealsPrice) * parseInt(mealsBride);
        break;
      case 'husband':
        mealsHusbandCost =
          parseInt(mealsPrice) * (parseInt(mealsHusband) + parseInt(mealsBride));
        mealsBrideCost = 0;
        break;
      case 'bride':
        mealsHusbandCost = 0;
        mealsBrideCost =
          parseInt(mealsPrice) * (parseInt(mealsHusband) + parseInt(mealsBride));
        break;
      default:
        mealsHusbandCost =
          (parseInt(mealsPrice) * (parseInt(mealsHusband) + parseInt(mealsBride))) /
          2;
        mealsBrideCost =
          (parseInt(mealsPrice) * (parseInt(mealsHusband) + parseInt(mealsBride))) /
          2;
    }

    // Reserve
    switch (reserveMethod) {
      case 'half':
        reserveHusbandCost = parseInt(reservePrice) / 2;
        reserveBrideCost = parseInt(reservePrice) / 2;
      case 'husband':
        reserveHusbandCost = parseInt(reservePrice);
        reserveBrideCost = 0;
      default:
        reserveHusbandCost = 0;
        reserveBrideCost = parseInt(reservePrice);
    }

    if (!id) {
      // Add Expense
      await addExpenseMutate.mutateAsync(
        {
          husbandName,
          brideName,
          rentalHusband,
          swordHusband,
          gloveHusband,
          swordSetHusband,
          bouquetHusband,
          companyHusband,
          hostHusband,
          frameHusband,
          dressHusband,
          etcHusband,
          rentalBride,
          swordBride,
          gloveBride,
          swordSetBride,
          bouquetBride,
          companyBride,
          hostBride,
          frameBride,
          dressBride,
          etcBride,
          weddingHusbandCost,
          weddingBrideCost,
          mealsMethod,
          mealsPrice,
          mealsHusband,
          mealsBride,
          mealsHusbandCost,
          mealsBrideCost,
          reserveMethod,
          reservePrice,
          reserveHusbandCost,
          reserveBrideCost,
          eventAt,
          weddingAt,
        },
        {
          onSuccess: (data) => {
            toast.success('웨딩전표 저장!');
            queryClient.invalidateQueries({ queryKey: ['weddings', 'wedding'] });
            router.replace(`/wedding/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    } else {
      // Update Expense
      await updateExpenseMutate.mutateAsync(
        {
          id,
          payload: {
            husbandName,
            brideName,
            rentalHusband,
            swordHusband,
            gloveHusband,
            swordSetHusband,
            bouquetHusband,
            companyHusband,
            hostHusband,
            frameHusband,
            dressHusband,
            etcHusband,
            rentalBride,
            swordBride,
            gloveBride,
            swordSetBride,
            bouquetBride,
            companyBride,
            hostBride,
            frameBride,
            dressBride,
            etcBride,
            weddingHusbandCost,
            weddingBrideCost,
            mealsMethod,
            mealsPrice,
            mealsHusband,
            mealsBride,
            mealsHusbandCost,
            mealsBrideCost,
            reserveMethod,
            reservePrice,
            reserveHusbandCost,
            reserveBrideCost,
            eventAt,
            weddingAt,
          },
        },
        {
          onSuccess: (data) => {
            toast.success('웨딩전표 저장!');
            queryClient.invalidateQueries({ queryKey: ['weddings', 'wedding'] });
            router.replace(`/wedding/${data.id}`);
          },
          onError: (err: any) => {
            toast.error(err.error);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (data) {
      setPayload({
        husbandName: data.husbandName,
        brideName: data.brideName,
        rentalHusband: data.rentalHusband.toString(),
        swordHusband: data.swordHusband.toString(),
        gloveHusband: data.gloveHusband.toString(),
        swordSetHusband: data.swordSetHusband.toString(),
        bouquetHusband: data.bouquetHusband.toString(),
        companyHusband: data.companyHusband.toString(),
        hostHusband: data.hostHusband.toString(),
        frameHusband: data.frameHusband.toString(),
        dressHusband: data.dressHusband.toString(),
        etcHusband: data.etcHusband.toString(),
        rentalBride: data.rentalBride.toString(),
        swordBride: data.swordBride.toString(),
        gloveBride: data.gloveBride.toString(),
        swordSetBride: data.swordSetBride.toString(),
        bouquetBride: data.bouquetBride.toString(),
        companyBride: data.companyBride.toString(),
        hostBride: data.hostBride.toString(),
        frameBride: data.frameBride.toString(),
        dressBride: data.dressBride.toString(),
        etcBride: data.etcBride.toString(),
        mealsMethod: data.mealsMethod,
        mealsPrice: data.mealsPrice.toString(),
        mealsHusband: data.mealsHusband.toString(),
        mealsBride: data.mealsBride.toString(),
        reserveMethod: data.reserveMethod,
        reservePrice: data.reservePrice.toString(),
        weddingAt: data.weddingAt,
        eventAt: data.eventAt,
      });
    }
  }, [data]);

  return {
    husbandName,
    brideName,
    rentalHusband,
    swordHusband,
    gloveHusband,
    swordSetHusband,
    bouquetHusband,
    companyHusband,
    hostHusband,
    frameHusband,
    dressHusband,
    etcHusband,
    rentalBride,
    swordBride,
    gloveBride,
    swordSetBride,
    bouquetBride,
    companyBride,
    hostBride,
    frameBride,
    dressBride,
    etcBride,
    mealsMethod,
    mealsPrice,
    mealsHusband,
    mealsBride,
    reserveMethod,
    reservePrice,
    weddingAt: startDate.toLocaleDateString(),
    eventAt,
    setStartDate,
    onBack,
    onChange,
    onAddExpense,
  };
}
