import { NavBar, TodoList } from 'components';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <NavBar />
      <TodoList />
    </div>
  );
}

export { App };

