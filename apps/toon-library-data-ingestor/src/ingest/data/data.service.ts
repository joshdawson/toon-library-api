export abstract class DataService<T> {
  abstract fetch(url: string): Promise<T[]>;

  abstract insert(data: T[]): Promise<void>; 
}