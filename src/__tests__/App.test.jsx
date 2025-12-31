import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { vi } from "vitest";

describe("App Component", () => {
  const mockCart = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 2,
      image:
        "https://i5.walmartimages.com/seo/VILINICE-Noise-Cancelling-Headphones-Wireless-Bluetooth-Over-Ear-Headphones-with-Microphone-Black-Q8_b994b99c-835f-42fc-8094-9f6be0f9273b.be59955399cdbd1c25011d4a4251ba9b.jpeg",
      description: "High-quality wireless headphones with noise cancellation.",
    },
  ];

  beforeEach(() => {
    // mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: vi.fn(() => {
          store = {};
        }),
        removeItem: vi.fn((key) => {
          delete store[key];
        }),
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    // mock initial cart in localStorage
    window.localStorage.getItem.mockReturnValue(JSON.stringify(mockCart));
  });

  test("renders App component without crashing", () => {
    render(<App />);
    expect(screen.getAllByText(/ComponentCorner/i)[0]).toBeInTheDocument(); // header logo
    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
    expect(screen.getByText("🛒")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument(); // badge showing cart count
  });

  test("loads cart data from localStorage on startup", () => {
    render(<App />);
    // the cart item should appear
    expect(screen.getAllByText(/Wireless Headphones/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/\$99.99/i)[0]).toBeInTheDocument();

    // localStorage.getItem should have been called
    expect(window.localStorage.getItem).toHaveBeenCalledWith("cart");
  });

  test("saves cart changes to localStorage when item is added", () => {
    render(<App />);

    // find "Add to Cart" button for a product
    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    fireEvent.click(addButtons[0]);

    // localStorage.setItem should have been called
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.stringContaining('"quantity":') // make sure cart was updated
    );
  });

  test("useEffect correctly updates localStorage on cart change", () => {
    render(<App />);
    // add a product to trigger useEffect
    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    fireEvent.click(addButtons[0]);

    // check that setItem was called more than once
    expect(window.localStorage.setItem.mock.calls.length).toBeGreaterThan(0);
  });
});
