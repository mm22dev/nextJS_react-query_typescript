import { factory, primaryKey } from '@mswjs/data'
import { randAvatar, randFullName, randQuote, randSkill } from '@ngneat/falso'

export const db = factory({
  person: {
    id: primaryKey(String),
    avatar: randAvatar,
    fullName: randFullName,
    quote: randQuote,
    skill: randSkill,
  },
})
