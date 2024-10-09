import { Log, LogAttributes } from "../../models/logs/Log";
import LogRepository from "../../repositories/logs/LogRepository";

class LogService {
  private logRepository: LogRepository;

  constructor() {
    this.logRepository = new LogRepository();
  }

  async getById(id: number): Promise<Log> {
    const log = await this.logRepository.findById(id);
    if (!log) {
      throw new Error("Log not found");
    }
    return log;
  }

  async getAll(): Promise<Log[]> {
    return await this.logRepository.findAll();
  }

  async create(logData: Omit<LogAttributes, "id">): Promise<Log> {
    return await this.logRepository.create(logData);
  }

  async delete(log: LogAttributes): Promise<number> {
    const deletedRowsCount = await this.logRepository.delete(log);
    if (deletedRowsCount === 0) {
      throw new Error("Log not found");
    }
    return deletedRowsCount;
  }
}

export default LogService;
