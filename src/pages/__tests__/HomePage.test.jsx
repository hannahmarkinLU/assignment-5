import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";

// sample props to pass into HomePage
const mockProducts = [
  {
    id: 1,
    name: "Test Product 1",
    price: 10,
    image: "https://via.placeholder.com/150",
    description: "Desc 1",
  },
  {
    id: 2,
    name: "Test Product 2",
    price: 20,
    image: "https://via.placeholder.com/150",
    description: "Desc 2",
  },
];

const mockAddToCart = vi.fn();

describe("HomePage", () => {
  test("renders without crashing", () => {
    render(<HomePage products={mockProducts} addToCart={mockAddToCart} />);
  });

  test("displays main content", () => {
    render(<HomePage products={mockProducts} addToCart={mockAddToCart} />);

    // check for Hero title
    expect(
      screen.getByText(/Welcome to Component Corner/i)
    ).toBeInTheDocument();

    // check for intro section
    expect(screen.getByText(/Why Shop With Us/i)).toBeInTheDocument();

    // check that product names are displayed
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
    });
  });
});
