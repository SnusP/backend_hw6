import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import Action from "../actions/Action";
import Trigger from "../triggers/Trigger";
import ScenarioDevice from "../scenarioDevices/ScenarioDevice";

export type ScenarioAttributes = {
  id: number;
  name: string;
  description: string;
};

export type ScenarioCreationAttributes = Optional<ScenarioAttributes, "id">;

@Table
export class Scenario extends Model<
  ScenarioAttributes,
  ScenarioCreationAttributes
> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @Column
  declare name: string;

  @AllowNull(true)
  @Column
  declare description: string;

  @HasMany(() => Action)
  actions: Action[];

  @HasMany(() => Trigger)
  triggers: Trigger[];

  @HasMany(() => ScenarioDevice)
  scenarioDevices: ScenarioDevice[];
}

export default Scenario;
