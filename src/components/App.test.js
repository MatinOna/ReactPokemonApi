import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('Render PokemonPage Component', () => {
    expect(render(<App />).container).toBeDefined();
});
