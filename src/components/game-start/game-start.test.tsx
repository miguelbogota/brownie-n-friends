import { render, screen } from '@testing-library/react';
import { GameStart } from './game-start.component';
import { AppStateProvider } from '@/state';

describe('GameStart', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppStateProvider value={{ isAppInitialized: true }}>{children}</AppStateProvider>
  );

  it('should render the component', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByText('JUGADORES')).toBeInTheDocument();
  });

  it('should render the players header', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByText('JUGADORES')).toBeInTheDocument();
  });

  it('should render the player icon', () => {
    render(<GameStart />, { wrapper });
    const icon = screen.getByRole('img', { name: /logo/i });
    expect(icon).toBeInTheDocument();
  });

  it('should render the minus button', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByRole('button', { name: /decrease players/i })).toBeInTheDocument();
  });

  it('should render the plus button', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByRole('button', { name: /increase players/i })).toBeInTheDocument();
  });

  it('should render the player count', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render the player limit', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByText(/MIN: 2/i)).toBeInTheDocument();
  });

  it('should render the start game button', () => {
    render(<GameStart />, { wrapper });
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });
});
