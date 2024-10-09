import { Sequelize } from "sequelize-typescript";
import Device from "../models/devices/Device";
import Scenario from "../models/scenarios/Scenario";
import Log from "../models/logs/Log";
import Trigger from "../models/triggers/Trigger";
import Action from "../models/actions/Action";
import ScenarioDevice from "../models/scenarioDevices/ScenarioDevice";
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    dialect: "postgres",
    logging: console.log,
  }
);

const models = [Device, Scenario, Log, Trigger, Action, ScenarioDevice];

sequelize.addModels(models);

sequelize
  .sync()
  .then(() => {
    console.log("synced models");
  })
  .catch((e) => console.log(e));

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
