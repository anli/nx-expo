import { type Database, type ObjectToCamel } from '@shared/api';

export type Task = ObjectToCamel<Database['public']['Tables']['tasks']['Row']>;
