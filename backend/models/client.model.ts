import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

const STATUS = {
    PENDING: 'pendiente',
    IN_ATTENTION: 'en_atencion',
    ATTENDED: 'atendido',
};

const PRIORITY = {
    HIGH: 'alta',
    MEDIUM: 'media',
    LOW: 'baja'
};

export interface ClientAttributes {
  id?: number;
  name: string;
  contact: string;
  need: string;
  status: 'pendiente' | 'en_atencion' | 'atendido';
  description: string;
  priority: 'alta' | 'media' | 'baja';
  date: string; // YYYY-MM-DD
}

class Client extends Model<ClientAttributes> implements ClientAttributes {
  public id!: number;
  public name!: string;
  public contact!: string;
  public need!: string;
  public status!: 'pendiente' | 'en_atencion' | 'atendido';
  public description!: string;
  public priority!: 'alta' | 'media' | 'baja';
  public date!: string;
}

Client.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
  need: { type: DataTypes.STRING, allowNull: false },
  status: {
    type: DataTypes.ENUM(...Object.values(STATUS)),
    allowNull: false,
    defaultValue: STATUS.PENDING
  },
  description: { type: DataTypes.TEXT, allowNull: true },
  priority: {
    type: DataTypes.ENUM(...Object.values(PRIORITY)),
    allowNull: false,
    defaultValue: PRIORITY.MEDIUM
  },
  date: { type: DataTypes.DATEONLY, allowNull: false },
}, {
  sequelize,
  tableName: 'clients'
});

export default Client;