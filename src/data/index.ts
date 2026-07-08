import type { CardProps } from '../components/card';
import { BAD_LUCK } from './bad-luck';
import { CHALLENGES } from './challenges';
import { GAMES } from './games';
import { GOOD_LUCK } from './good-luck';
import { RULES } from './rules';
import { SECRET_MISSIONS } from './secret-missions';

/** Mock data for card swipe game. */
export const CARDS: CardProps[] = [
  ...CHALLENGES,
  ...RULES,
  ...GAMES,
  ...BAD_LUCK,
  ...GOOD_LUCK,
  ...SECRET_MISSIONS,
];

export { shuffleArray } from './utils';
