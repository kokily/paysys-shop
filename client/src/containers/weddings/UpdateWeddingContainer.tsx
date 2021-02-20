import { useMutation, useQuery } from '@apollo/react-hooks';
import UpdateWedding from 'components/weddings/UpdateWedding';
import { READ_WEDDING, UPDATE_WEDDING } from 'graphql/weddings';
import client from 'libs/client';
import { UpdateType } from 'libs/types';
import React, { useReducer, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const reducer = (state: UpdateType, action: any) => {
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
    husband: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband,
    bride: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride,
    reserve_pay: data?.ReadWedding?.wedding && data.ReadWedding.wedding.reserve_pay.toString(),
    husband_rental:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_rental.toString(),
    bride_rental: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_rental.toString(),
    sum_rental: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_rental.toString(),
    husband_company:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_company.toString(),
    bride_company: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_company.toString(),
    sum_company: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_company.toString(),
    husband_add: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_add.toString(),
    bride_add: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_add.toString(),
    sum_add: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_add.toString(),
    husband_today: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_today.toString(),
    bride_today: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_today.toString(),
    sum_today: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_today.toString(),
    husband_bouquet:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_bouquet.toString(),
    bride_bouquet: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_bouquet.toString(),
    sum_bouquet: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_bouquet.toString(),
    husband_ceremony:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_ceremony.toString(),
    bride_ceremony:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_ceremony.toString(),
    sum_ceremony: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_ceremony.toString(),
    husband_hanbok:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_hanbok.toString(),
    bride_hanbok: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_hanbok.toString(),
    sum_hanbok: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_hanbok.toString(),
    husband_play: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_play.toString(),
    bride_play: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_play.toString(),
    sum_play: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_play.toString(),
    husband_anthem:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_anthem.toString(),
    bride_anthem: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_anthem.toString(),
    sum_anthem: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_anthem.toString(),
    husband_moderator:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_moderator.toString(),
    bride_moderator:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_moderator.toString(),
    sum_moderator: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_moderator.toString(),
    husband_officiate:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_officiate.toString(),
    bride_officiate:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_officiate.toString(),
    sum_officiate: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_officiate.toString(),
    husband_etc: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_etc.toString(),
    bride_etc: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_etc.toString(),
    sum_etc: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_etc.toString(),
    husband_conv: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_conv.toString(),
    bride_conv: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_conv.toString(),
    sum_conv: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_conv.toString(),
    husband_wedding:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_wedding.toString(),
    bride_wedding: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_wedding.toString(),
    sum_wedding: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_wedding.toString(),
    meals_price: data?.ReadWedding?.wedding && data.ReadWedding.wedding.meals_price.toString(),
    husband_num: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_num.toString(),
    bride_num: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_num.toString(),
    sum_num: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_num.toString(),
    husband_meal: data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_meal.toString(),
    bride_meal: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_meal.toString(),
    sum_meal: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_meal.toString(),
    present_price: data?.ReadWedding?.wedding && data.ReadWedding.wedding.present_price.toString(),
    husband_present_num:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_present_num.toString(),
    bride_present_num:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_present_num.toString(),
    sum_present_num:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_present_num.toString(),
    husband_present:
      data?.ReadWedding?.wedding && data.ReadWedding.wedding.husband_present.toString(),
    bride_present: data?.ReadWedding?.wedding && data.ReadWedding.wedding.bride_present.toString(),
    sum_present: data?.ReadWedding?.wedding && data.ReadWedding.wedding.sum_present.toString(),
    meal: data?.ReadWedding?.wedding && data.ReadWedding.wedding.meal,
    reserve: data?.ReadWedding?.wedding && data.ReadWedding.wedding.reserve,
    present: data?.ReadWedding?.wedding && data.ReadWedding.wedding.present,
    wedding_at: data?.ReadWedding?.wedding && data.ReadWedding.wedding.wedding_at,
    event_at: data?.ReadWedding?.wedding && data.ReadWedding.wedding.event_at,
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
      toast.error('빈 칸을 모두 채우세요!!!');
      return;
    }

    try {
      let husband_reserve = 0;
      let bride_reserve = 0;

      if (reserve === 'half') {
        husband_reserve = parseInt(reserve_pay) / 2;
        bride_reserve = parseInt(reserve_pay) / 2;
      } else if (reserve === 'husband') {
        husband_reserve = parseInt(reserve_pay);
        bride_reserve = 0;
      } else {
        husband_reserve = 0;
        bride_reserve = parseInt(reserve_pay);
      }

      const response = await UpdateWeddingResolver({
        variables: {
          id: weddingId,
          husband,
          bride,
          reserve_pay: parseInt(reserve_pay),
          husband_rental: parseInt(husband_rental),
          bride_rental: parseInt(bride_rental),
          sum_rental: parseInt(husband_rental) + parseInt(bride_rental),
          husband_company: parseInt(husband_company),
          bride_company: parseInt(bride_company),
          sum_company: parseInt(husband_company) + parseInt(bride_company),
          husband_add: parseInt(husband_add),
          bride_add: parseInt(bride_add),
          sum_add: parseInt(husband_add) + parseInt(bride_add),
          husband_today: parseInt(husband_today),
          bride_today: parseInt(bride_today),
          sum_today: parseInt(husband_today) + parseInt(bride_today),
          husband_bouquet: parseInt(husband_bouquet),
          bride_bouquet: parseInt(bride_bouquet),
          sum_bouquet: parseInt(husband_bouquet) + parseInt(bride_bouquet),
          husband_ceremony: parseInt(husband_ceremony),
          bride_ceremony: parseInt(bride_ceremony),
          sum_ceremony: parseInt(husband_ceremony) + parseInt(bride_ceremony),
          husband_hanbok: parseInt(husband_hanbok),
          bride_hanbok: parseInt(bride_hanbok),
          sum_hanbok: parseInt(husband_hanbok) + parseInt(bride_hanbok),
          husband_play: parseInt(husband_play),
          bride_play: parseInt(bride_play),
          sum_play: parseInt(husband_play) + parseInt(bride_play),
          husband_anthem: parseInt(husband_anthem),
          bride_anthem: parseInt(bride_anthem),
          sum_anthem: parseInt(husband_anthem) + parseInt(bride_anthem),
          husband_moderator: parseInt(husband_moderator),
          bride_moderator: parseInt(bride_moderator),
          sum_moderator: parseInt(husband_moderator) + parseInt(bride_moderator),
          husband_officiate: parseInt(husband_officiate),
          bride_officiate: parseInt(bride_officiate),
          sum_officiate: parseInt(husband_officiate) + parseInt(bride_officiate),
          husband_etc: parseInt(husband_etc),
          bride_etc: parseInt(bride_etc),
          sum_etc: parseInt(husband_etc) + parseInt(bride_etc),
          husband_conv: parseInt(husband_conv),
          bride_conv: parseInt(bride_conv),
          sum_conv: parseInt(husband_conv) + parseInt(bride_conv),
          husband_wedding:
            parseInt(husband_rental) +
            parseInt(husband_company) +
            parseInt(husband_add) +
            parseInt(husband_today) +
            parseInt(husband_bouquet) +
            parseInt(husband_ceremony) +
            parseInt(husband_hanbok) +
            parseInt(husband_play) +
            parseInt(husband_anthem) +
            parseInt(husband_moderator) +
            parseInt(husband_officiate) +
            parseInt(husband_etc) +
            parseInt(husband_conv),
          bride_wedding:
            parseInt(bride_rental) +
            parseInt(bride_company) +
            parseInt(bride_add) +
            parseInt(bride_today) +
            parseInt(bride_bouquet) +
            parseInt(bride_ceremony) +
            parseInt(bride_hanbok) +
            parseInt(bride_play) +
            parseInt(bride_anthem) +
            parseInt(bride_moderator) +
            parseInt(bride_officiate) +
            parseInt(bride_etc) +
            parseInt(bride_conv),
          sum_wedding:
            parseInt(husband_rental) +
            parseInt(husband_company) +
            parseInt(husband_add) +
            parseInt(husband_today) +
            parseInt(husband_bouquet) +
            parseInt(husband_ceremony) +
            parseInt(husband_hanbok) +
            parseInt(husband_play) +
            parseInt(husband_anthem) +
            parseInt(husband_moderator) +
            parseInt(husband_officiate) +
            parseInt(husband_etc) +
            parseInt(husband_conv) +
            parseInt(bride_rental) +
            parseInt(bride_company) +
            parseInt(bride_add) +
            parseInt(bride_today) +
            parseInt(bride_bouquet) +
            parseInt(bride_ceremony) +
            parseInt(bride_hanbok) +
            parseInt(bride_play) +
            parseInt(bride_anthem) +
            parseInt(bride_moderator) +
            parseInt(bride_officiate) +
            parseInt(bride_etc) +
            parseInt(bride_conv),
          meals_price: parseInt(meals_price),
          husband_num: parseInt(husband_num),
          bride_num: parseInt(bride_num),
          sum_num: parseInt(husband_num) + parseInt(bride_num),
          husband_meal: parseInt(meals_price) * parseInt(husband_num),
          bride_meal: parseInt(meals_price) * parseInt(bride_num),
          sum_meal: parseInt(meals_price) * (parseInt(husband_num) + parseInt(bride_num)),
          present_price: parseInt(present_price),
          husband_present_num: parseInt(husband_present_num),
          bride_present_num: parseInt(bride_present_num),
          sum_present_num: parseInt(husband_present_num) + parseInt(bride_present_num),
          husband_present: parseInt(husband_present_num) * parseInt(present_price),
          bride_present: parseInt(bride_present_num) * parseInt(present_price),
          sum_present:
            (parseInt(husband_present_num) + parseInt(bride_present_num)) * parseInt(present_price),
          husband_reserve,
          bride_reserve,
          meal,
          reserve,
          present,
          wedding_at: startDate.toLocaleDateString(),
          event_at,
        },
      });

      if (!response || !response.data) return;

      await client.clearStore();

      toast.success('웨딩 수정 완료');
      history.push(`/wedding/${weddingId}`);
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
      reserve_pay={parseInt(reserve_pay)}
      husband_rental={parseInt(husband_rental)}
      bride_rental={parseInt(bride_rental)}
      husband_company={parseInt(husband_company)}
      bride_company={parseInt(bride_company)}
      husband_add={parseInt(husband_add)}
      bride_add={parseInt(bride_add)}
      husband_today={parseInt(husband_today)}
      bride_today={parseInt(bride_today)}
      husband_bouquet={parseInt(husband_bouquet)}
      bride_bouquet={parseInt(bride_bouquet)}
      husband_ceremony={parseInt(husband_ceremony)}
      bride_ceremony={parseInt(bride_ceremony)}
      husband_hanbok={parseInt(husband_hanbok)}
      bride_hanbok={parseInt(bride_hanbok)}
      husband_play={parseInt(husband_play)}
      bride_play={parseInt(bride_play)}
      husband_anthem={parseInt(husband_anthem)}
      bride_anthem={parseInt(bride_anthem)}
      husband_moderator={parseInt(husband_moderator)}
      bride_moderator={parseInt(bride_moderator)}
      husband_officiate={parseInt(husband_officiate)}
      bride_officiate={parseInt(bride_officiate)}
      husband_etc={parseInt(husband_etc)}
      bride_etc={parseInt(bride_etc)}
      husband_conv={parseInt(husband_conv)}
      bride_conv={parseInt(bride_conv)}
      meals_price={parseInt(meals_price)}
      husband_num={parseInt(husband_num)}
      bride_num={parseInt(bride_num)}
      present_price={parseInt(present_price)}
      husband_present_num={parseInt(husband_present_num)}
      bride_present_num={parseInt(bride_present_num)}
      meal={meal}
      reserve={reserve}
      present={present}
      wedding_at={startDate}
      event_at={event_at}
      setStartDate={setStartDate}
      onChange={onChange}
      onSubmit={onSubmit}
      onBack={onBack}
    />
  );
};

export default UpdateWeddingContainer;
