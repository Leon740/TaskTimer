import { createContext } from 'react';

interface priorityObjI {
  id: number;
  number: number;
  label: string;
  color: string;
  border: string;
}

const PrioritiesArrContext = createContext<priorityObjI[]>([]);

export default PrioritiesArrContext;
