import { FC, memo } from 'react';
import dayjs from 'dayjs';

import { MyIcon } from 'components';

import { Months } from './constants';

type Props = {
  status: TaskStatusType;
  day?: any;
  onClick: () => void;
};

const ButtonCalendar: FC<Props> = memo(({ status, day, onClick }) => {
  const calendarDate = day ? dayjs(day).format('DD.MM.YYYY').split('.') : null;
  const month = calendarDate ? Months[parseInt(calendarDate[1])] : 'pick';
  const date = calendarDate ? calendarDate[0] : 'day';

  const onButtonClickHandler = () => {
    onClick();
  }

  return (
    <MyIcon
      status={status}
      textTop={month}
      textBottom={date}
      onClick={onButtonClickHandler}
    />
  );
});

export { ButtonCalendar };