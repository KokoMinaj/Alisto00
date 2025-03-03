
export interface Task {
  id: string;
  title: string;
  location?: string;
  category?: string;
  tag?: string;
  completed: boolean;
  project?: string;
}

export interface Project {
  id: string;
  name: string;
  count: number;
}
