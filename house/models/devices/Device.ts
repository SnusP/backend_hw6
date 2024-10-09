import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  DataType,
} from "sequelize-typescript";
import { Optional } from "sequelize";

export type DeviceAttributes = {
  id: number;
  userId: number;
  name: string;
  type: string;
  settings: Record<string, any>;
};

export type DeviceCreationAttributes = Optional<DeviceAttributes, "id">;

@Table
export class Device extends Model<DeviceAttributes, DeviceCreationAttributes> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare userId: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(false)
  @Column
  declare type: string;

  @Column(DataType.JSON)
  declare settings: Record<string, any>;
}

export default Device;
