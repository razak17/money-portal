import * as React from 'react';
import { withApollo, useIsAuth } from '../../../../utils';
import { EditDeleteAccountButton } from '../../../../components';

interface Props {

}

export const AccountDetails: React.FC<Props> = ({}) => {
  useIsAuth();
  return(
    <>
      <EditDeleteAccountButton  />
    </>
  );
}

export default withApollo({ ssr: false })(AccountDetails);
