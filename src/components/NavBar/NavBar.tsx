import { ItemCreator, ModeList } from 'components';

import styles from './NavBar.module.scss';

/**
 * @component
 * @description Component consists out of 'ItemCreator'{@link ItemCreator} and 'ModeList'{@link ModeList} elements.
 * @returns {ReactElement}
 * 
 * @example 
 * return (
 *     <NavBar />
 * )
 * 
*/

const NavBar = () => {
  return (
    <div className={styles.container}>
      <ItemCreator />
      <ModeList />
    </div>
  );
}

export { NavBar };