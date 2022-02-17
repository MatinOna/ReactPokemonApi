import React from 'react';
import { render, screen } from '@testing-library/react';
import {Table} from "antd";
import fakePokemons from "../../mocks/pokemos";

it('renders with expected values', () => {
    render(<Table  dataSource={fakePokemons}/>)

    expect(screen.getByRole('table', { dataIndex: /charizar/i })).toBeInTheDocument()
    expect(screen.getByRole('table', { dataIndex: /butterfree/i })).toBeInTheDocument()
})
