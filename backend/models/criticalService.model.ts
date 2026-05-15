import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

const STATUS = {
    UP: 'up',
    DOWN: 'down'
};

export interface CriticalServiceAttributes {
  id?: number;
  name: string;
  ip: string;
  status: 'up' | 'down';
  lastCheck: string; // Se guarda como HH:MM
  department: string;
}

class CriticalService extends Model<CriticalServiceAttributes> implements CriticalServiceAttributes {
  public id!: number;
  public name!: string;
  public ip!: string;
  public status!: 'up' | 'down';
  public lastCheck!: string;
  public department!: string;
}

CriticalService.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  ip: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM(...Object.values(STATUS)),
    allowNull: false,
    defaultValue: STATUS.UP
  },
  lastCheck: { type: DataTypes.STRING, allowNull: false },
  department: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  tableName: 'critical_services'
});

export default CriticalService;