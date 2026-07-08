import { render, screen } from '@/testing';
import { CardSwipe } from './card-swipe.component';

vi.mock('../../data', () => ({
  CARDS: [
    {
      type: 'game',
      content: 'Todos escriben un número del 1 al 10. Quien coincida contigo toma.',
      penalty: 2,
    },
  ],
  shuffleArray: (cards: any[], _min: number, _max: number) => cards,
}));

describe('CardSwipe', () => {
  it('should render the component', () => {
    const { baseElement } = render(<CardSwipe />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should render a card', () => {
    render(<CardSwipe />);
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
