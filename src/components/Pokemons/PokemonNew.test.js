import {render, screen} from '@testing-library/react';
import PokemonNew from "./PokemonNew";

it('displays the logo', () => {
    render(<PokemonNew />);
    const title = screen.getByText(/Nuevo Pokemon/i)
    expect(title).toBeInTheDocument()
})


it('displays the get cancel button', () => {
    render(<PokemonNew />)

    expect(
        screen.getByRole('button', { name: /cancelar/i })
    ).toBeInTheDocument()
})

it('displays the get save button', () => {
    render(<PokemonNew />)

    expect(
        screen.getByRole('button', { name: /guardar/i })
    ).toBeInTheDocument()
})
