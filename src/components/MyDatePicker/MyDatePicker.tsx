import { FC, useEffect, useRef, useState, memo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { ButtonCalendar } from 'components';

import styles from './MyDatePicker.module.scss';

type Props = {
  status: TaskStatusType;
  date: number | null;
  onChange: (data: UpdateItem<'date'>) => void;
};

const MyDatePicker: FC<Props> = memo(({ status, date, onChange }) => {
    const customInputComponent = useRef(null);

    const [calendarDate, setCalendarDate] = useState<Dayjs | null>(null);

    useEffect(() => {
      const initialDate = date ? dayjs.unix(date) : null;
      setCalendarDate(initialDate);
    }, [date]);

    const calendarDateHandler = (date: Dayjs | null) => {
      if (date !== calendarDate) {
        setCalendarDate(date);
        onChange({
          name: 'date',
          value: dayjs(date).unix()
        });
        setIsOpen(false);
      };
    };

    const [isOpen, setIsOpen] = useState(false);

    const onOpenHandler = () => {
      setIsOpen((isOpen) => !isOpen);
    };

    useEffect(() => {
      const closePopperComponent = (event: Event) => {
        if (!isOpen) return;
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

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          open={isOpen}
          className={styles.myDataPicker}
          value={calendarDate}
          onChange={calendarDateHandler}
          orientation='portrait'
          showToolbar={false}
          disabled={status !== 'progress'}
          disablePast
          componentsProps={{
            actionBar: {
              actions: ['clear', 'accept'],
            },
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
                status={status}
                day={calendarDate}
                onClick={onOpenHandler}
              />
            </div>
          )}
        />
      </LocalizationProvider>
    );
  }
);

export { MyDatePicker };