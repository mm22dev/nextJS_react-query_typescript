export interface IPerson {
  id: number
  name: string
  age: number
}

export interface IInfinitePersons {
  count: number
  size: number
  offset: number
  persons: IPerson[]
}
