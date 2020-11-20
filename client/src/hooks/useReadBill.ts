import { useQuery } from '@apollo/react-hooks';
import { CHECK_ME } from 'graphql/auth';
import { READ_BILL } from 'graphql/bills';

const useReadBill = (frontId) => {
  const bill = useQuery(READ_BILL, {
    variables: { id: frontId },
  });

  const me = useQuery(CHECK_ME);

  return [bill, me];
};

export default useReadBill;
