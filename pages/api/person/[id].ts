import { NextApiRequest, NextApiResponse } from 'next'
import { IPerson } from 'lib/interfaces/IPerson'
import { db } from 'mocks/db'

export default function handler(req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void {
  const {
    query: { id },
  } = req

  if (typeof id === 'string') {
    res.status(200).json(db.person.create({ id }))
  } else {
    res.status(500).json(new Error('id is not of correct type'))
  }
}
