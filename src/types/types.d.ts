declare module '*.scss';

type MonthType = 'January' | 'February' | 'March' | 'April' | 'May'
  | 'June' | 'July' | 'August' | 'September' | 'November' | 'December';

type TaskStatusType = 'completed' | 'progress' | 'missed';

type ModeType = 'All' | 'Completed' | 'In Progress' | 'Overdue';

type ItemData = {
  status: TaskStatusType;
  title: string;
  date: number | null;
  description: string;
  fileURL: string;
};

type UploadItem<T extends keyof ItemDataRaw> = {
  name: T;
  value: ItemDataRaw[T];
};

type UpdateItem<T extends keyof ItemData> = { name: T, value: ItemData[T]};

type ItemDataRaw = {
  status: TaskStatusType;
  title: string;
  date: number | null;
  description: string;
  file: File | null;
};

type ListItem = {
  id: string;
  data: ItemData;
};

type ListItemUpdateData = { 
  id: string; 
  data: Partial<Omit<ItemData, "fileURL">>, 
  fileInfo?: string | File | null,
};

type ListItemPartial = { id: string; data: Partial<ItemData> };
