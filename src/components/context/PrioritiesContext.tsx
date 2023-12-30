import { createContext } from 'react';
import { priorityI } from '../../types/types';

const PrioritiesContext = createContext<priorityI[]>([]);

export default PrioritiesContext;
