import styles from '../styles/pages/SignIn.module.css';

import { Helmet } from 'react-helmet';
import Help from '../components/Help';

const HelpPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign in - Nhost</title>
      </Helmet>

      <div className={styles.container}>
        <Help />
      </div>
    </>
  );
};

export default HelpPage;
