import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

export interface ServiceAttributes {
  id?: number;
  name: string;
  provider: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  cost: number;
}

class Service extends Model<ServiceAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public provider!: string;
  public startDate!: string;
  public endDate!: string;
  public cost!: number;
}

Service.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  provider: { type: DataTypes.STRING, allowNull: false },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  cost: {
    type: DataTypes.FLOAT, // Usamos FLOAT para permitir decimales en el costo
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'services'
});

export default Service;