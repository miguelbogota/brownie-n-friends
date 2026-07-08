import { createRoot } from 'react-dom/client';
import { Root } from './root.tsx';

const root = createRoot(document.querySelector('#app')!);
root.render(<Root />);
