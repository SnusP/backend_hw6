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

export type TriggerAttributes = {
  id: number;
  scenarioId: number;
  type: string;
  value: string;
};

export type TriggerCreationAttributes = Optional<TriggerAttributes, "id">;

@Table
export class Trigger extends Model<
  TriggerAttributes,
  TriggerCreationAttributes
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
  @Column
  declare type: string;

  @AllowNull(false)
  @Column
  declare value: string;

  @BelongsTo(() => Scenario)
  scenario: Scenario;
}

export default Trigger;
