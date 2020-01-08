import { Request, Response } from 'express';
import TaskService from '../../component/tasks/taskService';
import logger from '../../config/logger';

export class Controller {
  async getTasks(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const tasks = await TaskService.getTaskList(userId);
    res.json({
      data: tasks,
    });
  }

  async getTask(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const taskId = req.params.id;
    const task = await TaskService.getTask(userId, taskId);
    if (task === null) {
      res.status(404).json({
        data: task,
        msg: 'Task Not Found',
      });
    } else {
      res.json({
        data: task,
      });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const task = {
      content: req.body.content,
      targetDate: req.body.targetDate,
      isCompleted: req.body.isCompleted,
    };
    const createdTask = await TaskService.createTask(userId, task);
    res.json({
      data: { id: createdTask.id },
    });
  }

  async modifyTask(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const taskId = req.params.id;
    const task = {
      content: req.body.content,
      targetDate: req.body.targetDate,
      isCompleted: req.body.isCompleted,
    };
    const result = await TaskService.modifyTask(userId, taskId, task);
    logger.info(`${result}`);
    if (result[0] !== 1) {
      res.status(404).json({
        data: result,
        msg: 'Not Found',
      });
    } else {
      res.json({
        data: result,
      });
    }
  }
  async deleteTask(req: Request, res: Response): Promise<void> {
    const userId = req.user.id;
    const taskId = req.params.id;
    const result = await TaskService.deleteTask(userId, taskId);
    logger.info(`${result}`);
    if (result !== 1) {
      res.status(404).json({
        data: result,
        msg: 'Not Found',
      });
    } else {
      res.json({
        data: result,
      });
    }
  }
}
export default new Controller();
