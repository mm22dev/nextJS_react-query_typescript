import { NextApiRequest, NextApiResponse } from 'next'
import { IPerson } from 'lib/interfaces/IPerson'

const NUM_OF_PERSONS_TO_FETCH = 4
const TOTAL_NUM_OF_PERSONS = 10

export default (req: NextApiRequest, res: NextApiResponse<IPerson[] | Error>): void => {
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
          (_, index) => ({
            id: offset + index + 1,
            name: 'John Doe',
            age: TOTAL_NUM_OF_PERSONS - offset + index + 1,
          }),
        )
  res.status(200).json({
    size,
    offset,
    count: TOTAL_NUM_OF_PERSONS,
    persons,
  })
}
