import { createContext } from 'react';

interface priorityI {
  id: number;
  number: number;
  label: string;
  color: string;
  border: string;
  background: string;
}

const PrioritiesContext = createContext<priorityI[]>([]);

export default PrioritiesContext;
