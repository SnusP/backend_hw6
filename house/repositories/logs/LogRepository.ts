import {
  Log,
  LogAttributes,
  LogCreationAttributes,
} from "../../models/logs/Log";

class LogRepository {
  async findById(id: number): Promise<Log | null> {
    return await Log.findByPk(id);
  }

  async findAll(): Promise<Log[]> {
    return await Log.findAll();
  }

  async create(logData: Omit<LogCreationAttributes, "id">): Promise<Log> {
    return await Log.create(logData);
  }

  async delete(log: LogAttributes): Promise<number> {
    return await Log.destroy({
      where: { id: log.id },
    });
  }
}

export default LogRepository;
