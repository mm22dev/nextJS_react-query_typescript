import { NextApiRequest, NextApiResponse } from 'next'
import { IPerson } from 'lib/interfaces/IPerson'

export default (req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void => {
  const {
    query: { id },
  } = req

  if (typeof id === 'string') {
    res.status(200).json({ id: parseInt(id, 10), name: 'John Doe', age: 25 })
  } else {
    res.status(500).json(new Error('id is not of correct type'))
  }
}
