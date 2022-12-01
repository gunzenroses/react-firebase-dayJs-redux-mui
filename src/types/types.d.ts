declare module '*.scss';

/**
 * @global
 * @type {MonthType}
 */

type MonthType = 'January' | 'February' | 'March' | 'April' | 'May'
  | 'June' | 'July' | 'August' | 'September' | 'November' | 'December';


/**
 * @global
 * @type {TaskStatusType}
 */
type TaskStatusType = 'completed' | 'progress' | 'missed';


/**
 * @global
 * @type {ModeType}
 */
type ModeType = 'All' | 'Completed' | 'In Progress' | 'Overdue';

/**
 * @global
 * @type {ItemData}
 */
type ItemData = {
  status: TaskStatusType;
  title: string;
  date: number | null;
  description: string;
  fileURL: string;
};

/**
 * @global
 * @type {ItemDataRaw}
 */
type ItemDataRaw = {
  status: TaskStatusType;
  title: string;
  date: number | null;
  description: string;
  file: File | null;
};

type UploadItem<T extends keyof ItemDataRaw> = {
  name: T;
  value: ItemDataRaw[T];
};

type UpdateItem<T extends keyof ItemData> = { name: T, value: ItemData[T]};

/**
 * @global
 * @type {ListItem}
 */
type ListItem = {
  id: string;
  data: ItemData;
};

/**
 * @global
 * @type {ListItemUpdateData}
 */
type ListItemUpdateData = { 
  id: string; 
  data: Partial<Omit<ItemData, "fileURL">>, 
  fileInfo?: string | File | null,
};

/**
 * @global
 * @type {ListItemPartial}
 */
type ListItemPartial = { id: string; data: Partial<ItemData> };
