import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import Scenario from "../scenarios/Scenario";
import Device from "../devices/Device";

export type ScenarioDeviceAttributes = {
  id: number;
  scenarioId: number;
  deviceId: number;
};

export type ScenarioDeviceCreationAttributes = Optional<
  ScenarioDeviceAttributes,
  "id"
>;

@Table
export class ScenarioDevice extends Model<
  ScenarioDeviceAttributes,
  ScenarioDeviceCreationAttributes
> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @ForeignKey(() => Scenario)
  @Column
  declare scenarioId: number;

  @AllowNull(false)
  @ForeignKey(() => Device)
  @Column
  declare deviceId: number;

  @BelongsTo(() => Scenario)
  scenario: Scenario;

  @BelongsTo(() => Device)
  device: Device;
}

export default ScenarioDevice;
