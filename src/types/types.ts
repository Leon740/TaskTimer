export interface todoObjI {
  id: number;
  splitId: number;
  priority: number;
  label: string;
  completed: boolean;
}

export interface splitObjI {
  id: number;
  start: string;
  finish?: string;
  todos: todoObjI[];
}
