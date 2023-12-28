export interface todoI {
  id: number;
  splitId: number;
  priority: number;
  label: string;
  completed: boolean;
}

export interface splitI {
  id: number;
  start: string;
  finish?: string;
  todos: todoI[];
}
