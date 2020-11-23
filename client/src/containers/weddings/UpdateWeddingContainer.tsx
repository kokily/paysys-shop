import { useMutation, useQuery } from '@apollo/react-hooks';
import UpdateWedding from 'components/weddings/UpdateWedding';
import { READ_WEDDING, UPDATE_WEDDING } from 'graphql/weddings';
import { SavingWedding } from 'libs/types';
import React, { useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const reducer = (state: SavingWedding, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const UpdateWeddingContainer = () => {
  const history = useHistory();
  const { weddingId }: any = useParams();
  const { data, loading, error } = useQuery(READ_WEDDING, {
    variables: { id: weddingId },
  });
  const [UpdateWeddingResolver] = useMutation(UPDATE_WEDDING);
  const [state, dispatch] = useReducer(reducer, {
    husband: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband,
    bride: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride,
    reserve_pay: data?.ReadWedding?.ok && data.ReadWedding.wedding.reserve_pay,
    husband_rental: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_rental,
    bride_rental: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_rental,
    husband_company: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_company,
    bride_company: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_company,
    husband_add: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_add,
    bride_add: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_add,
    husband_today: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_today,
    bride_today: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_today,
    husband_bouquet: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_bouquet,
    bride_bouquet: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_bouquet,
    husband_ceremony: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_ceremony,
    bride_ceremony: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_ceremony,
    husband_hanbok: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_hanbok,
    bride_hanbok: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_hanbok,
    husband_play: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_play,
    bride_play: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_play,
    husband_anthem: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_anthem,
    bride_anthem: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_anthem,
    husband_moderator: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_moderator,
    bride_moderator: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_moderator,
    husband_officiate: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_officiate,
    bride_officiate: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_officiate,
    husband_etc: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_etc,
    bride_etc: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_etc,
    husband_conv: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_conv,
    bride_conv: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_conv,
    meals_price: data?.ReadWedding?.ok && data.ReadWedding.wedding.meals_price,
    husband_num: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_num,
    bride_num: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_num,
    present_price: data?.ReadWedding?.ok && data.ReadWedding.wedding.present_price,
    husband_present_num: data?.ReadWedding?.ok && data.ReadWedding.wedding.husband_present_num,
    bride_present_num: data?.ReadWedding?.ok && data.ReadWedding.wedding.bride_present_num,
    meal: data?.ReadWedding?.ok && data.ReadWedding.wedding.meal,
    reserve: data?.ReadWedding?.ok && data.ReadWedding.wedding.reserve,
    present: data?.ReadWedding?.ok && data.ReadWedding.wedding.present,
    wedding_at: data?.ReadWedding?.ok && data.ReadWedding.wedding.wedding_at,
    event_at: data?.ReadWedding?.ok && data.ReadWedding.wedding.event_at,
  });
  const {
    husband,
    bride,
    reserve_pay,
    husband_rental,
    bride_rental,
    husband_company,
    bride_company,
    husband_add,
    bride_add,
    husband_today,
    bride_today,
    husband_bouquet,
    bride_bouquet,
    husband_ceremony,
    bride_ceremony,
    husband_hanbok,
    bride_hanbok,
    husband_play,
    bride_play,
    husband_anthem,
    bride_anthem,
    husband_moderator,
    bride_moderator,
    husband_officiate,
    bride_officiate,
    husband_etc,
    bride_etc,
    husband_conv,
    bride_conv,
    meals_price,
    husband_num,
    bride_num,
    present_price,
    husband_present_num,
    bride_present_num,
    meal,
    reserve,
    present,
    wedding_at,
    event_at,
  } = state;
  const [startDate, setStartDate] = useState(new Date(wedding_at));

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(e.target);
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      [
        husband,
        bride,
        reserve_pay,
        husband_rental,
        bride_rental,
        husband_company,
        bride_company,
        husband_add,
        bride_add,
        husband_today,
        bride_today,
        husband_bouquet,
        bride_bouquet,
        husband_ceremony,
        bride_ceremony,
        husband_hanbok,
        bride_hanbok,
        husband_play,
        bride_play,
        husband_anthem,
        bride_anthem,
        husband_moderator,
        bride_moderator,
        husband_officiate,
        bride_officiate,
        husband_etc,
        bride_etc,
        husband_conv,
        bride_conv,
        meals_price,
        husband_num,
        bride_num,
        present_price,
        husband_present_num,
        bride_present_num,
        meal,
        reserve,
        present,
        wedding_at,
        event_at,
      ].includes('')
    ) {
      toast.error('빈 칸을 모두 채우세요!');
      return;
    }

    try {
      let husband_reserve = 0;
      let bride_reserve = 0;

      if (reserve === 'half') {
        husband_reserve = reserve_pay / 2;
        bride_reserve = reserve_pay / 2;
      } else if (reserve === 'husband') {
        husband_reserve = reserve_pay;
        bride_reserve = 0;
      } else {
        husband_reserve = 0;
        bride_reserve = reserve_pay;
      }

      const response = await UpdateWeddingResolver({
        variables: {
          id: weddingId,
          husband,
          bride,
          reserve_pay,
          husband_rental,
          bride_rental,
          sum_rental: husband_rental + bride_rental,
          husband_company,
          bride_company,
          sum_company: husband_company + bride_company,
          husband_add,
          bride_add,
          sum_add: husband_add + bride_add,
          husband_today,
          bride_today,
          sum_today: husband_today + bride_today,
          husband_bouquet,
          bride_bouquet,
          sum_bouquet: husband_bouquet + bride_bouquet,
          husband_ceremony,
          bride_ceremony,
          sum_ceremony: husband_ceremony + bride_ceremony,
          husband_hanbok,
          bride_hanbok,
          sum_hanbok: husband_hanbok + bride_hanbok,
          husband_play,
          bride_play,
          sum_play: husband_play + bride_play,
          husband_anthem,
          bride_anthem,
          sum_anthem: husband_anthem + bride_anthem,
          husband_moderator,
          bride_moderator,
          sum_moderator: husband_moderator + bride_moderator,
          husband_officiate,
          bride_officiate,
          sum_officiate: husband_officiate + bride_officiate,
          husband_etc,
          bride_etc,
          sum_etc: husband_etc + bride_etc,
          husband_conv,
          bride_conv,
          sum_conv: husband_conv + bride_conv,
          husband_wedding:
            husband_rental +
            husband_company +
            husband_add +
            husband_today +
            husband_bouquet +
            husband_ceremony +
            husband_hanbok +
            husband_play +
            husband_anthem +
            husband_moderator +
            husband_officiate +
            husband_etc +
            husband_conv,
          bride_wedding:
            bride_rental +
            bride_company +
            bride_add +
            bride_today +
            bride_bouquet +
            bride_ceremony +
            bride_hanbok +
            bride_play +
            bride_anthem +
            bride_moderator +
            bride_officiate +
            bride_etc +
            bride_conv,
          sum_wedding:
            husband_rental +
            husband_company +
            husband_add +
            husband_today +
            husband_bouquet +
            husband_ceremony +
            husband_hanbok +
            husband_play +
            husband_anthem +
            husband_moderator +
            husband_officiate +
            husband_etc +
            husband_conv +
            bride_rental +
            bride_company +
            bride_add +
            bride_today +
            bride_bouquet +
            bride_ceremony +
            bride_hanbok +
            bride_play +
            bride_anthem +
            bride_moderator +
            bride_officiate +
            bride_etc +
            bride_conv,
          meals_price,
          husband_num,
          bride_num,
          sum_num: husband_num + bride_num,
          present_price,
          husband_present_num,
          bride_present_num,
          sum_num: husband_num + bride_num,
          meal,
          reserve,
          present,
          wedding_at: startDate.toLocaleDateString(),
          event_at,
        },
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const onBack = () => {
    history.goBack();
  };

  if (loading) return null;
  if (error) return null;

  return (
    <UpdateWedding
      husband={husband}
      bride={bride}
      reserve_pay={reserve_pay}
      husband_rental={husband_rental}
      bride_rental={bride_rental}
      husband_company={husband_company}
      bride_company={bride_company}
      husband_add={husband_add}
      bride_add={bride_add}
      husband_today={husband_today}
      bride_today={bride_today}
      husband_bouquet={husband_bouquet}
      bride_bouquet={bride_bouquet}
      husband_ceremony={husband_ceremony}
      bride_ceremony={bride_ceremony}
      husband_hanbok={husband_hanbok}
      bride_hanbok={bride_hanbok}
      husband_play={husband_play}
      bride_play={bride_play}
      husband_anthem={husband_anthem}
      bride_anthem={bride_anthem}
      husband_moderator={husband_moderator}
      bride_moderator={bride_moderator}
      husband_officiate={husband_officiate}
      bride_officiate={bride_officiate}
      husband_etc={husband_etc}
      bride_etc={bride_etc}
      husband_conv={husband_conv}
      bride_conv={bride_conv}
      meals_price={meals_price}
      husband_num={husband_num}
      bride_num={bride_num}
      present_price={present_price}
      husband_present_num={husband_present_num}
      bride_present_num={bride_present_num}
      meal={meal}
      reserve={reserve}
      present={present}
      wedding_at={wedding_at}
      event_at={event_at}
      setStartDate={setStartDate}
      onChange={onChange}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default UpdateWeddingContainer;
