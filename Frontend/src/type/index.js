export const UserType = {
  id: '',
  email: '',
  name: '',
  avatar: ''
};

export const TaskType = {
  id: '',
  title: '',
  description: '',
  dueDate: '',
  priority: 'low', // 'low' | 'medium' | 'high'
  status: 'todo', // 'todo' | 'in-progress' | 'completed'
  createdBy: '',
  assignedTo: [],
  sharedWith: [],
  createdAt: '',
  updatedAt: '',
  updatedBy: ''
};

export const AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: false
};

export const TaskFormDataType = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'low',
  status: 'todo'
};