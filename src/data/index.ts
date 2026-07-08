import type { CardProps } from '../components/card';
import { BAD_LUCK } from './bad-luck';
import { CHALLENGES } from './challenges';
import { GAMES } from './games';
import { GOOD_LUCK } from './good-luck';
import { RULES } from './rules';
import { SECRET_MISSIONS } from './secret-missions';

function shuffleArray<T>(array: T[]) {
  const result = [...array];

  for (let index = result.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = result[index]!;
    result[index] = result[randomIndex]!;
    result[randomIndex] = temp;
  }

  return result;
}

/** Mock data for card swipe game. */
export const CARDS: CardProps[] = [
  ...CHALLENGES,
  ...RULES,
  ...GAMES,
  ...BAD_LUCK,
  ...GOOD_LUCK,
  ...SECRET_MISSIONS,
];

/** Shuffled cards for card swipe game. */
export const SHUFFLED_CARDS = shuffleArray(CARDS);
