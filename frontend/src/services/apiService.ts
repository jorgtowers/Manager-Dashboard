import axios from 'axios';
import {
  Meeting,
  Assignment,
  Client,
  Todo,
  Service,
  CriticalService,
} from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Generic CRUD functions ---
const getAll = async <T>(endpoint: string): Promise<T[]> => {
  const response = await apiClient.get<T[]>(endpoint);
  return response.data;
};

const getById = async <T>(endpoint: string, id: number): Promise<T> => {
  const response = await apiClient.get<T>(`${endpoint}/${id}`);
  return response.data;
};

const create = async <T>(endpoint: string, data: Omit<T, 'id'>): Promise<T> => {
  const response = await apiClient.post<T>(endpoint, data);
  return response.data;
};

const update = async <T extends { id?: number }>(endpoint: string, id: number, data: Partial<T>): Promise<T> => {
  const response = await apiClient.put<T>(`${endpoint}/${id}`, data);
  return response.data;
};

const remove = async (endpoint: string, id: number): Promise<void> => {
  await apiClient.delete(`${endpoint}/${id}`);
};

// --- Meetings API ---
export const meetingApi = {
  getAll: () => getAll<Meeting>('/meetings'),
  create: (data: Omit<Meeting, 'id'>) => create<Meeting>('/meetings', data),
  update: (id: number, data: Partial<Meeting>) => update<Meeting>('/meetings', id, data),
  delete: (id: number) => remove('/meetings', id),
};

// --- Assignments API ---
export const assignmentApi = {
  getAll: () => getAll<Assignment>('/assignments'),
  getById: (id: number) => getById<Assignment>('/assignments', id),
  create: (data: Omit<Assignment, 'id'>) => create<Assignment>('/assignments', data),
  update: (id: number, data: Partial<Assignment>) => update<Assignment>('/assignments', id, data),
  delete: (id: number) => remove('/assignments', id),
};

// --- Clients API ---
export const clientApi = {
  getAll: () => getAll<Client>('/clients'),
  getById: (id: number) => getById<Client>('/clients', id),
  create: (data: Omit<Client, 'id'>) => create<Client>('/clients', data),
  update: (id: number, data: Partial<Client>) => update<Client>('/clients', id, data),
  delete: (id: number) => remove('/clients', id),
};

// --- Todos API ---
export const todoApi = {
  getAll: () => getAll<Todo>('/todos'),
  getById: (id: number) => getById<Todo>('/todos', id),
  create: (data: Omit<Todo, 'id'>) => create<Todo>('/todos', data),
  update: (id: number, data: Partial<Todo>) => update<Todo>('/todos', id, data),
  delete: (id: number) => remove('/todos', id),
};

// --- Services API ---
export const serviceApi = {
  getAll: () => getAll<Service>('/services'),
  getById: (id: number) => getById<Service>('/services', id),
  create: (data: Omit<Service, 'id'>) => create<Service>('/services', data),
  update: (id: number, data: Partial<Service>) => update<Service>('/services', id, data),
  delete: (id: number) => remove('/services', id),
};

// --- Critical Services API ---
export const criticalServiceApi = {
  getAll: () => getAll<CriticalService>('/critical-services'),
  getById: (id: number) => getById<CriticalService>('/critical-services', id),
  create: (data: Omit<CriticalService, 'id' | 'status' | 'lastCheck'>) => create<CriticalService>('/critical-services', data),
  update: (id: number, data: Partial<CriticalService>) => update<CriticalService>('/critical-services', id, data),
  delete: (id: number) => remove('/critical-services', id),
};