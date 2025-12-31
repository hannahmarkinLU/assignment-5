import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
  const mockProduct = {
    id: 1,
    name: "Test Product",
    price: 49.99,
    image: "https://example.com/image.jpg",
    description: "Test description",
  };

  const mockAddToCart = vi.fn();

  beforeEach(() => {
    render(
      <ProductCard
        id={mockProduct.id}
        name={mockProduct.name}
        price={mockProduct.price}
        image={mockProduct.image}
        description={mockProduct.description}
        onAddToCart={mockAddToCart}
      />
    );
  });

  afterEach(() => {
    mockAddToCart.mockClear();
  });

  test("renders without crashing", () => {
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  test("displays product name and price", () => {
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  test('contains an "Add to Cart" button', () => {
    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  test("calls onAddToCart with correct product when button is clicked", () => {
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.image,
      description: mockProduct.description,
    });
  });
});
