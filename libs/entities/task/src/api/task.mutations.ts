import { createTask } from './create-task';
import { deleteTask } from './delete-task';
import { updateTask } from './update-task';

export const taskMutations = {
  create: createTask,
  delete: deleteTask,
  update: updateTask,
};
