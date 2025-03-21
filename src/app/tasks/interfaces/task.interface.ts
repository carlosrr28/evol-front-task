export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    tags: string[];
    dueDate: string;
    createdAt?: string;
    updatedAt?: string;
  }

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}


export interface TaskList {
  tasks: Task[];
}

export interface TaskTableProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  toggleSort: (criteria: "date" | "title") => void; 
}
  