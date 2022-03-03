import { NextApiRequest, NextApiResponse } from 'next'
import { IPerson } from 'lib/interfaces/IPerson'
import crypto from 'crypto'
import { randAvatar, randFullName, randQuote, randSkill } from '@ngneat/falso'

export default (req: NextApiRequest, res: NextApiResponse<IPerson | Error>): void => {
  const {
    query: { id },
  } = req

  if (typeof id === 'string') {
    res.status(200).json({
      id: crypto.randomBytes(8).toString('hex'),
      avatar: randAvatar(),
      fullName: randFullName(),
      quote: randQuote(),
      skill: randSkill(),
    })
  } else {
    res.status(500).json(new Error('id is not of correct type'))
  }
}
