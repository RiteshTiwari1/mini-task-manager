export interface User {
  id: string;
  email: string;
  name?: string | null;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface TaskResponse {
  task: Task;
}

export interface TasksResponse {
  tasks: Task[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface TaskContextType {
  tasks: Task[];
  createTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Pick<Task, 'title' | 'description' | 'status'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
  isLoading: boolean;
}