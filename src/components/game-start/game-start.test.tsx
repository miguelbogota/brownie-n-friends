import { render, screen } from '@/testing';
import { GameStart } from './game-start.component';

describe('GameStart', () => {
  it('should render the component', () => {
    render(<GameStart />);
    expect(screen.getByText('JUGADORES')).toBeInTheDocument();
  });

  it('should render the players header', () => {
    render(<GameStart />);
    expect(screen.getByText('JUGADORES')).toBeInTheDocument();
  });

  it('should render the player icon', () => {
    render(<GameStart />);
    const icon = screen.getByRole('img', { name: /logo/i });
    expect(icon).toBeInTheDocument();
  });

  it('should render the minus button', () => {
    render(<GameStart />);
    expect(screen.getByRole('button', { name: /decrease players/i })).toBeInTheDocument();
  });

  it('should render the plus button', () => {
    render(<GameStart />);
    expect(screen.getByRole('button', { name: /increase players/i })).toBeInTheDocument();
  });

  it('should render the player count', () => {
    render(<GameStart />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render the player limit', () => {
    render(<GameStart />);
    expect(screen.getByText(/MIN: 2/i)).toBeInTheDocument();
  });

  it('should render the start game button', () => {
    render(<GameStart />);
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });
});
