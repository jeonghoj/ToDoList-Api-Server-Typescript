import { Task } from './taskDAL';

interface TaskDTO {
  content: string;
  targetDate: string;
  isCompleted: boolean;
}

export class TaskService {
  getTaskList(userId: number): Promise<Task[]> {
    return Task.findAll({ where: { userId }, raw: true });
  }

  getTask(userId: number, taskId: string): Promise<Task | null> {
    return Task.findOne({ where: { userId, taskId }, raw: true });
  }
  createTask(userId: number, task: TaskDTO): Promise<Task> {
    return Task.create({ ...task, userId });
  }

  modifyTask(
    userId: number,
    taskId: string,
    task: TaskDTO
  ): Promise<[number, Task[]]> {
    return Task.update({ ...task }, { where: { id: taskId, userId } });
  }

  deleteTask(userId: number, taskId: string): Promise<number> {
    return Task.destroy({ where: { id: taskId, userId } });
  }
}

export default new TaskService();
