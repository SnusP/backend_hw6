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

export type ActionAttributes = {
  id: number;
  scenarioId: number;
  type: string;
  value: string;
};

export type ActionCreationAttributes = Optional<ActionAttributes, "id">;

@Table
export class Action extends Model<ActionAttributes, ActionCreationAttributes> {
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
  @Column
  declare type: string;

  @AllowNull(false)
  @Column
  declare value: string;

  @BelongsTo(() => Scenario)
  scenario: Scenario;
}

export default Action;
