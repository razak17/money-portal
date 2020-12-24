import * as React from 'react';
import { withApollo } from '../../../utils';
import { Layout } from '../../../components';
import { useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();
  console.log('AAAA', router);
  return (
    <Layout>
    </Layout>
  )
}

export default withApollo({ ssr: false })(Settings);

