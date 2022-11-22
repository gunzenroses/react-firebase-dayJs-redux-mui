import { FC, memo } from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';

import { MyIcon } from 'components';

import { Months } from './constants';
import styles from './ButtonCalendar.module.scss';

type Props = {
  completed: boolean;
  day?: any;
  onClick: () => void;
};

const cn = classNames.bind(styles);

const ButtonCalendar: FC<Props> = memo(({ completed, day, onClick }) => {
  const calendarDate = day ? dayjs(day).format('DD.MM.YYYY').split('.') : null;

  const month = calendarDate ? Months[parseInt(calendarDate[1])] : 'pick';
  const date = calendarDate ? calendarDate[0] : 'day';

  const onButtonClickHandler = () => {
    onClick();
  }

  return (
    <MyIcon
      completed={completed}
      textTop={month}
      textBottom={date}
      onClick={onButtonClickHandler}
    />
  );
});

export { ButtonCalendar };