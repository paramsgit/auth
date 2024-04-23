import * as React from 'react';
import { useRouter } from 'next/router';
import Layout from '../layout';
import PinForm from './pinForm';
interface IPaymentPageProps {
}

const PaymentPage: React.FunctionComponent<IPaymentPageProps> = (props) => {
    const router = useRouter();
  let { id } = router.query;
  if(typeof(id)!=="string")
    {id="null"}
  return <>
 <Layout>
    <div className='flex w-full justify-center'>
    {id!=("null" || undefined) && <PinForm qid={id}/>}

    </div>
</Layout>  
  </>;
};

export default PaymentPage;
