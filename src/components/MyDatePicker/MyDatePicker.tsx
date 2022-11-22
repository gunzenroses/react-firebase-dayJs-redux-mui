import { FC, useEffect, useRef, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { ButtonCalendar } from 'components';

import styles from './MyDatePicker.module.scss';

type Props = {
  completed: boolean;
  date?: string;
  onExpire?: () => void;
}

const MyDatePicker: FC<Props> = ({ completed, date, onExpire }) => {
  const customInputComponent = useRef(null);

  const initialDate = (typeof date === 'string') ? dayjs(date) : null;

  const [calendarDate, setCalendarDate] = useState<Dayjs | null>(initialDate);

  useEffect(() => {
    if (!onExpire) return;
    const today = dayjs().unix();
    const selectedDay = dayjs(calendarDate).add(1, 'day').unix();
    if (today > selectedDay) onExpire();
  }, [calendarDate]);

  const calendarDateHandler = (date: any) => {
    setIsOpen(false);
    setCalendarDate(date);
    console.log(dayjs(calendarDate));
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closePopperComponent = (event: Event) => {
      const muiDialog = document.getElementsByClassName('MuiPaper-root')[0];
      const isInArea = event
        .composedPath()
        .some((element) => element === muiDialog);
      if (!isInArea) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerup', closePopperComponent);

    return () => {
      document.removeEventListener('pointerup', closePopperComponent);
    };
  }, [isOpen]);

  const onOpenHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        open={isOpen}
        className={styles.myDataPicker}
        value={calendarDate}
        onChange={calendarDateHandler}
        orientation='portrait'
        showToolbar={false}
        disabled={completed}
        disablePast
        componentsProps={{
          actionBar: {
            actions: ['clear', 'accept']
          }
        }}
        views={['day']}
        PopperProps={{
          anchorEl: customInputComponent.current,
          sx: {
            '& .MuiCalendarPicker-root': {
              backgroundColor: 'yellow',
            },
          },
        }}
        renderInput={() => (
          <div ref={customInputComponent} className={styles.container}>
            <TextField style={{ opacity: 0, width: 0, height: 0 }} />
            <ButtonCalendar
              completed={completed}
              day={calendarDate}
              onClick={onOpenHandler}
            />
          </div>
        )}
      />
    </LocalizationProvider>
  );
};

export { MyDatePicker };