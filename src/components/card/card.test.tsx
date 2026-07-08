import { render, screen } from '@/testing';
import { Card } from './card.component';

describe('Card', () => {
  it('should render the component', () => {
    render(<Card type="REGLA" text="Title" penaltyLevel={2} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('should render the bar text', () => {
    render(<Card type="JUEGO" text="Title" penaltyLevel={1} />);
    expect(screen.getByText('JUEGO')).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(<Card type="DESAFÍO" text="My Title" penaltyLevel={1} />);
    expect(screen.getByText('My Title')).toBeInTheDocument();
  });

  it('should render the penalty label', () => {
    render(<Card type="MALA SUERTE" text="Title" penaltyLevel={1} />);
    expect(screen.getByText('PENALIZACIÓN')).toBeInTheDocument();
  });

  it('should render 4 penalty icons', () => {
    render(<Card type="BUENA SUERTE" text="Title" penaltyLevel={2} />);
    const icons = screen.getAllByLabelText(/penalty level/i);
    expect(icons).toHaveLength(4);
  });

  it('should show correct number of active icons based on penalty level', () => {
    render(<Card type="REGLA" text="Title" penaltyLevel={3} />);
    const icons = screen.getAllByLabelText(/penalty level/i);
    const activeIcons = icons.filter((icon) => icon.classList.contains('active'));
    expect(activeIcons).toHaveLength(3);
  });
});
