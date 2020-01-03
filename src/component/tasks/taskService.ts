import { Task } from './taskDAL';

export class TaskService {
  getTaskList(userId: string) {
    return Task.findAll({ where: { userId } });
  }
  createTask(userId: number, task: Task) {
    return Task.create({ ...task, userId });
  }
  modifyTask(userId: number, taskId: number, task: Task) {
    return Task.update({ ...task }, { where: { id: taskId, userId } });
  }
  deleteTask(userId: number, taskId: number) {
    return Task.destroy({ where: { id: taskId, userId } });
  }
}

export default new TaskService();
