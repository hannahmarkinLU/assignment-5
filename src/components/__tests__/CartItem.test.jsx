import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../CartItem";

describe("CartItem", () => {
  const mockItem = {
    name: "Sample Item",
    quantity: 2,
    price: 15,
  };

  it("renders item information correctly", () => {
    render(<CartItem item={mockItem} removeItem={() => {}} />);
    expect(screen.getByText(/Sample Item/i)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockItem.price} × ${mockItem.quantity}`)
    ).toBeInTheDocument();
  });

  it("calls removeItem when remove button is clicked", () => {
    const removeMock = vi.fn();
    render(<CartItem item={mockItem} removeItem={removeMock} />);

    const removeButton = screen.getByRole("button", { name: /Remove/i });
    fireEvent.click(removeButton);

    expect(removeMock).toHaveBeenCalledTimes(1);
    expect(removeMock).toHaveBeenCalledWith(mockItem);
  });
});
