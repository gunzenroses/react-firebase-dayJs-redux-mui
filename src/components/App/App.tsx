import { Provider } from 'react-redux';

import { MyStore } from 'redux/store';
import { NavBar, TodoList } from 'components';

import styles from './App.module.scss';

function App() {
  return (
    <Provider store={MyStore}>
      <div className={styles.container}>
        <NavBar />
        <TodoList />
      </div>
    </Provider>
  );
}


export { App };