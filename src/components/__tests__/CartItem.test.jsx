import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../CartItem";

describe("CartItem", () => {
  const mockItem = {
    id: 1,
    name: "Sample Item",
    quantity: 2,
    price: 15,
  };

  it("renders item information correctly", () => {
    render(<CartItem item={mockItem} removeFromCart={() => {}} />);
    expect(screen.getByText(/Sample Item/i)).toBeInTheDocument();
    expect(screen.getByText(/\$15/i)).toBeInTheDocument();
    expect(screen.getByText(/× 2/i)).toBeInTheDocument();
  });

  it("calls removeFromCart when remove button is clicked", () => {
    const removeMock = vi.fn();
    render(<CartItem item={mockItem} removeFromCart={removeMock} />);

    const removeButton = screen.getByRole("button", { name: /Remove/i });
    fireEvent.click(removeButton);

    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(removeMock).toHaveBeenCalledWith(mockItem.id);
  });
});
