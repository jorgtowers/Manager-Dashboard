import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

// Replicamos las constantes para usarlas en la definición del modelo
const STATUS = {
    PENDING: 'pendiente',
    IN_PROGRESS: 'en_progreso',
    COMPLETED: 'completado',
};

const PRIORITY = {
    HIGH: 'alta',
    MEDIUM: 'media',
    LOW: 'baja'
};

export interface AssignmentAttributes {
  id?: number;
  title: string;
  employee: string;
  department: string;
  status: 'pendiente' | 'en_progreso' | 'completado';
  priority: 'alta' | 'media' | 'baja';
  description: string;
  dueDate: string; // YYYY-MM-DD
}

class Assignment extends Model<AssignmentAttributes> implements AssignmentAttributes {
  public id!: number;
  public title!: string;
  public employee!: string;
  public department!: string;
  public status!: 'pendiente' | 'en_progreso' | 'completado';
  public priority!: 'alta' | 'media' | 'baja';
  public description!: string;
  public dueDate!: string;
}

Assignment.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  employee: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM(...Object.values(STATUS)),
    allowNull: false,
    defaultValue: STATUS.PENDING
  },
  priority: {
    type: DataTypes.ENUM(...Object.values(PRIORITY)),
    allowNull: false,
    defaultValue: PRIORITY.MEDIUM
  },
  description: { type: DataTypes.TEXT, allowNull: true },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
}, {
  sequelize,
  tableName: 'assignments'
});

export default Assignment;