import type { CardProps } from '@/components/card';

const MIN_NORMAL_CARDS = 5;
const MAX_NORMAL_CARDS = 8;

/** Checks if a card is a special card (not a normal card) */
const itsSpecialCard = (card: CardProps) => card.type !== 'DESAFÍO' && card.type !== 'JUEGO';

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

/**
 * Shuffles an array of cards, ensuring that:
 * - Normal cards (DESAFÍO or JUEGO) are grouped in batches of 5-8
 * - Special cards (REGLA, MALA SUERTE, BUENA SUERTE, MISIÓN SECRETA) are interspersed
 * - The order of normal cards within each batch is randomized
 * - The order of special cards is randomized
 */
export function shuffleArray(
  cards: CardProps[],
  minNormalCards = MIN_NORMAL_CARDS,
  maxNormalCards = MAX_NORMAL_CARDS,
) {
  const normalCards = shuffle(cards.filter((card) => !itsSpecialCard(card)));
  const specialCards = shuffle(cards.filter((card) => itsSpecialCard(card)));

  const result: CardProps[] = [];

  while (normalCards.length > 0 || specialCards.length > 0) {
    // Agregar entre 5 y 8 cartas normales
    const amount =
      Math.floor(Math.random() * (maxNormalCards - minNormalCards + 1)) + minNormalCards;

    for (let i = 0; i < amount && normalCards.length > 0; i++) {
      result.push(normalCards.pop()!);
    }

    // Luego una especial
    if (specialCards.length > 0) {
      result.push(specialCards.pop()!);
    }
  }

  // Si quedaron normales al final
  while (normalCards.length > 0) {
    result.push(normalCards.pop()!);
  }

  return result;
}
