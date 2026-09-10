import axios from 'axios';
import { EenhedenEenheid, WoningwaarderingResultaat } from './types';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const woningwaarderingApi = {
  async bereken(eenheid: EenhedenEenheid): Promise<WoningwaarderingResultaat> {
    const response = await api.post<WoningwaarderingResultaat>('/bereken', eenheid);
    return response.data;
  },

  async health() {
    const response = await api.get('/health');
    return response.data;
  },
};
