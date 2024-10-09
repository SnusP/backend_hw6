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

export type LogAttributes = {
  id: number;
  scenarioId: number;
};

export type LogCreationAttributes = Optional<LogAttributes, "id">;

@Table
export class Log extends Model<LogAttributes, LogCreationAttributes> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @ForeignKey(() => Scenario)
  @Column
  declare scenarioId: number;

  @BelongsTo(() => Scenario)
  declare scenario: Scenario;
}

export default Log;
