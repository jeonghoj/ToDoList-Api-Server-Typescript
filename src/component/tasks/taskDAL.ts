import { Model, Sequelize, DataTypes } from 'sequelize';

export class Task extends Model {
  public id!: number;
  public userId!: string;
  public content!: string;
  public targetDate!: string;
  public isCompleted!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function taskModelInitialize(sequelize: Sequelize): void {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      targetDate: {
        type: DataTypes.DATE,
      },
      content: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tasks',
      charset: 'utf8',
    }
  );
}
