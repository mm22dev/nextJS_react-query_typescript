export interface IPerson {
  id: number
  avatar: string
  fullName: string
  quote: string
  skill: string
}

export interface IInfinitePersons {
  count: number
  size: number
  offset: number
  persons: IPerson[]
}
