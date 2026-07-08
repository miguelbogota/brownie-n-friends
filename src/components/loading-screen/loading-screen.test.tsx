import { render, screen } from '@testing-library/react';
import { LoadingScreen } from './loading-screen.component';

describe('LoadingScreen', () => {
  it('should render the component', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('CARGANDO...')).toBeInTheDocument();
  });

  it('should render the loading text', () => {
    render(<LoadingScreen />);
    expect(screen.getByText('CARGANDO...')).toBeInTheDocument();
  });

  it('should render the spinner', () => {
    render(<LoadingScreen />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });
});
