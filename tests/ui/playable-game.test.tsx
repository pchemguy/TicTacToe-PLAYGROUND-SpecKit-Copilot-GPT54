import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from '../../src/app/App';

describe('playable game UI', () => {
  it('lets a human click an empty cell and renders the automatic computer response', () => {
    render(<App />);

    const firstCell = screen.getByLabelText('Cell 0');
    const centerCell = screen.getByLabelText('Cell 4');

    fireEvent.click(firstCell);

    expect(firstCell).toHaveTextContent('X');
    expect(centerCell).toHaveTextContent('O');
  });
});