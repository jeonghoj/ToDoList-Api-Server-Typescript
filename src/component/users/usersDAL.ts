import { Sequelize, Model, DataTypes } from 'sequelize';
import {
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
} from 'sequelize';
import * as bcrypt from 'bcrypt-nodejs';

import { Task } from '../tasks/taskDAL';

export class User extends Model {
  public id!: number;
  public username!: number;
  public password!: string;

  validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  public getTasks!: HasManyGetAssociationsMixin<Task>;
  public addProduct!: HasManyAddAssociationMixin<Task, number>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    products: Association<User, Task>;
  };
}

export function userModelInitialize(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: new DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      charset: 'utf8',
      indexes: [
        {
          fields: ['username'],
        },
      ],
      hooks: {
        beforeCreate: (user: User): void => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
  User.hasMany(Task, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'tasks',
  });
}
