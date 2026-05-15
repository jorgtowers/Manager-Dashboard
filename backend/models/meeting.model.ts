import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../database';

/**
 * Define la interfaz para los atributos de una Reunión.
 * Esto es para aprovechar el tipado de TypeScript.
 */
export interface MeetingAttributes {
  id?: number;
  title: string;
  date: string; // Se guarda como YYYY-MM-DD
  time: string; // Se guarda como HH:MM
  duration: number;
  participants: string;
  description: string;
}

/**
 * Clase del Modelo Meeting que extiende de Sequelize.Model
 * Contiene la definición de la tabla 'meetings' en la base de datos.
 */
class Meeting extends Model<MeetingAttributes> implements MeetingAttributes {
  public id!: number;
  public title!: string;
  public date!: string;
  public time!: string;
  public duration!: number;
  public participants!: string;
  public description!: string;
}

// Inicializamos el modelo con su esquema
Meeting.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  participants: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true }, // TEXT permite descripciones más largas
}, {
  sequelize,
  tableName: 'meetings' // Nombre explícito de la tabla
});

export default Meeting;