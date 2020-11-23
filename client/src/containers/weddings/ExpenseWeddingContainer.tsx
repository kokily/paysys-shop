import React, { useReducer, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import ExpenseWedding from 'components/weddings/ExpenseWedding';
import { ADD_WEDDING } from 'graphql/weddings';
import { ExpenseType } from 'libs/types';
import { toast } from 'react-toastify';

const reducer = (state: ExpenseType, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const ExpenseWeddingContainer = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    husband: '',
    bride: '',
    reserve_pay: '',
    husband_rental: '',
    bride_rental: '',
    sum_rental: '',
    husband_company: '',
    bride_company: '',
    sum_company: '',
    husband_add: '',
    bride_add: '',
    sum_add: '',
    husband_today: '',
    bride_today: '',
    sum_today: '',
    husband_bouquet: '',
    bride_bouquet: '',
    sum_bouquet: '',
    husband_ceremony: '',
    bride_ceremony: '',
    sum_ceremony: '',
    husband_hanbok: '',
    bride_hanbok: '',
    sum_hanbok: '',
    husband_play: '',
    bride_play: '',
    sum_play: '',
    husband_anthem: '',
    bride_anthem: '',
    sum_anthem: '',
    husband_moderator: '',
    bride_moderator: '',
    sum_moderator: '',
    husband_officiate: '',
    bride_officiate: '',
    sum_officiate: '',
    husband_etc: '',
    bride_etc: '',
    sum_etc: '',
    husband_conv: '',
    bride_conv: '',
    sum_conv: '',
    husband_wedding: '',
    bride_wedding: '',
    sum_wedding: '',
    meals_price: '',
    husband_num: '',
    bride_num: '',
    sum_num: '',
    husband_meal: '',
    bride_meal: '',
    sum_meal: '',
    present_price: '',
    husband_present_num: '',
    bride_present_num: '',
    sum_present_num: '',
    husband_present: '',
    bride_present: '',
    sum_present: '',
    meal: 'privacy',
    reserve: 'half',
    present: 'privacy',
    event_at: '',
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
    event_at,
  } = state;
  const [startDate, setStartDate] = useState(new Date());
  const [AddWedding, { client }] = useMutation(ADD_WEDDING);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(e.target);
  };

  const onBack = () => {
    history.goBack();
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
      ].includes('')
    ) {
      toast.error('빈 칸을 모두 입력해 주세요!');
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

      const response = await AddWedding({
        variables: {
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
          meal,
          meals_price: parseInt(meals_price),
          husband_num: parseInt(husband_num),
          bride_num: parseInt(bride_num),
          sum_num: parseInt(husband_num) + parseInt(bride_num),
          husband_meal: parseInt(meals_price) * parseInt(husband_num),
          bride_meal: parseInt(meals_price) * parseInt(bride_num),
          sum_meal: parseInt(meals_price) * (parseInt(husband_num) + parseInt(bride_num)),
          present,
          present_price: parseInt(present_price),
          husband_present_num: parseInt(husband_present_num),
          bride_present_num: parseInt(bride_present_num),
          sum_present_num: parseInt(husband_present_num) + parseInt(bride_present_num),
          husband_present: parseInt(present_price) * parseInt(husband_present_num),
          bride_present: parseInt(present_price) * parseInt(bride_present_num),
          sum_present:
            parseInt(present_price) * (parseInt(husband_present_num) + parseInt(bride_present_num)),
          reserve,
          husband_reserve,
          bride_reserve,
          wedding_at: startDate.toLocaleDateString(),
          event_at,
        },
      });

      if (!response || !response.data) return;

      await client?.clearStore();

      toast.success('웨딩 빌지 전송');
      history.push('/weddings');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <ExpenseWedding
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
      onBack={onBack}
      onSubmit={onSubmit}
    />
  );
};

export default ExpenseWeddingContainer;
