const style100 = {
  width: '100%',
  height: '100%',
};

const modes: ModeType[] = ['All', 'Completed', 'In Progress', 'Overdue'];

const ModeToType = {
  'All': 'all',
  'Completed': 'completed',
  'In Progress': 'progress',
  'Overdue': 'missed'
}

export { style100, modes, ModeToType };
