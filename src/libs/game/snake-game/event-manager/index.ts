/** 事件监听器 */
export interface Listener<T> {
  (event: T): void;
}

/** 事件管理工具 */
export class EventManager<M> {
  /** 事件名 => 监听器列表 */
  public listeners: Map<keyof M, Listener<any>[]> = new Map();

  /** 触发事件 */
  public emit = <K extends keyof M>(eventName: K, data: M[K]) => {
    this.listeners.get(eventName)?.forEach(listener => listener(data));
  };

  /** 添加事件 */
  public addEventListener = <K extends keyof M>(eventName: K, listener: Listener<M[K]>) => {
    const plisteners = this.listeners.get(eventName) || [];
    const listeners = plisteners.filter(iListener => iListener !== listener).concat([listener]);
    this.listeners.set(eventName, listeners);
  };

  /** 移除事件 */
  public removeEventListener = <K extends keyof M>(eventName: K, listener: Listener<M[K]>) => {
    const plisteners = this.listeners.get(eventName) || [];
    const listeners = plisteners.filter(iListener => iListener !== listener);
    this.listeners.set(eventName, listeners);
  };
}
