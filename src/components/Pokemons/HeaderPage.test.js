import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderPage from "./HeaderPage";

it('displays the logo', () => {
    render(<HeaderPage />);
    const logo = screen.getByText(/Listado de Pokemon/i)
    expect(logo).toBeInTheDocument()
})

it('displays the get started button', () => {
    render(<HeaderPage />)

    expect(
        screen.getByRole('button', { name: /nuevo/i })
    ).toBeInTheDocument()
})

it('displays the get search button', () => {
    render(<HeaderPage />)

    expect(
        screen.getByRole('textbox', { placeholder: /nombre/i })
    ).toBeInTheDocument()
})
