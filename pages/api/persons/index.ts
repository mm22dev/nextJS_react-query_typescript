import { NextApiRequest, NextApiResponse } from 'next'
import { IInfinitePersons } from 'lib/interfaces/IPerson'
import crypto from 'crypto'
import { randAvatar, randFullName, randQuote, randSkill } from '@ngneat/falso'

const NUM_OF_PERSONS_TO_FETCH = 4
const TOTAL_NUM_OF_PERSONS = 10

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IInfinitePersons | Error>,
): void {
  const { query } = req

  const offset = parseInt(Array.isArray(query.offset) ? query.offset[0] : query.offset, 10) || 0
  const size =
    parseInt(Array.isArray(query.size) ? query.size[0] : query.size, 10) || NUM_OF_PERSONS_TO_FETCH

  const persons =
    offset >= TOTAL_NUM_OF_PERSONS
      ? []
      : Array.from(
          {
            length:
              offset + 1 + NUM_OF_PERSONS_TO_FETCH > TOTAL_NUM_OF_PERSONS
                ? TOTAL_NUM_OF_PERSONS - offset
                : NUM_OF_PERSONS_TO_FETCH,
          },
          () => ({
            id: crypto.randomBytes(8).toString('hex'),
            avatar: randAvatar(),
            fullName: randFullName(),
            quote: randQuote(),
            skill: randSkill(),
          }),
        )
  res.status(200).json({
    size,
    offset,
    count: TOTAL_NUM_OF_PERSONS,
    persons,
  })
}
