import * as React from 'react';
import { withApollo } from '../utils/withApollo';

interface Props {

}

export const ForgotPassword: React.FC<Props> = ({}) => {
  return(
    <div>
      Well Well Well
    </div>
  );
}

export default withApollo({ ssr: false })(ForgotPassword);

