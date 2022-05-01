import { render, screen } from '@testing-library/react';
import React from 'react';
import Score from './Score';

describe('Score component', ()=>{
  test('Score component should be rendered', ()=>{
    render(<Score score={2} />)
    expect(screen.getByText(/B/i).getAttribute("class")).toBe(
      "car active bordered"
    )
    expect(screen.getByText(/I/i).getAttribute("class")).toBe(
      "car active bordered"
    )
    expect(screen.getByText(/N/i).getAttribute("class")).toBe(
      "car inactive bordered"
    )
    expect(screen.getByText(/G/i).getAttribute("class")).toBe(
      "car inactive"
    )
    expect(screen.getByText(/O/i).getAttribute("class")).toBe(
      "car inactive"
    )
  })
})