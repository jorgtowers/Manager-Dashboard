import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

const PRIORITY = {
    HIGH: 'alta',
    MEDIUM: 'media',
    LOW: 'baja'
};

export interface TodoAttributes {
  id?: number;
  title: string;
  priority: 'alta' | 'media' | 'baja';
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
}

class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public priority!: 'alta' | 'media' | 'baja';
  public dueDate!: string;
  public completed!: boolean;
}

Todo.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  priority: {
    type: DataTypes.ENUM(...Object.values(PRIORITY)),
    allowNull: false,
    defaultValue: PRIORITY.MEDIUM
  },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  sequelize,
  tableName: 'todos'
});

export default Todo;