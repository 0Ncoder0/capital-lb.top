import * as uuid from "uuid";

/** 单条记录 */
class Record<T> {
  id: string = uuid.v4();
  data: T | null = null;
  createTime = new Date();
  updateTime = new Date();
  deleteTime: Date | null = null;
  constructor(record?: Record<T>) {
    record && Object.assign(this, record);
  }
  /** 更新当前记录 */
  update(data: T) {
    this.data = data;
    this.updateTime = new Date();
    return this;
  }
  /** 删除当前记录 */
  delete() {
    this.deleteTime = new Date();
    return this;
  }
}
export class Recorder<T> {
  /** 记录列表 */
  private records: Map<string, Record<T>> = new Map();

  constructor(records?: [string, Record<T>][]) {
    this.records = new Map(records);
  }

  /** 获取记录 */
  public get = (id: string) => {
    const record = this.records.get(id);
    if (!record) throw new Error(`Record not found : ${id}`);
    return record;
  };

  /** 更新或新建记录 */
  public set = (data: T, id?: string) => {
    const record = id ? this.get(id) : new Record<T>().update(data);
    return this.records.set(record.id, record);
  };

  /** 删除记录 */
  public delete = (id: string) => {
    const record = this.get(id);
    return record.delete();
  };

  /** 查询所有有效记录 */
  public getAll = () => {
    return Array.from(this.records.values()).filter(record => !record.deleteTime);
  };
}

export default Recorder;
