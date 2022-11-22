import { ItemCreator, ModeList } from 'components';

import styles from './NavBar.module.scss';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <ItemCreator />
      <ModeList />
    </div>
  );
}

export { NavBar };