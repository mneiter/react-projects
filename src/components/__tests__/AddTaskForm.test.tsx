import { fireEvent, render, screen } from "@testing-library/react";
import { AddTaskForm } from "../tasks/AddTaskForm";

describe("AddTaskForm", () => {
    it("calls onAdd with input value", () => {
        const handleAdd = jest.fn();

        render(<AddTaskForm addTask={handleAdd} />);
        const input = screen.getByPlaceholderText(/enter task/i);
        const button = screen.getByText(/add/i);

        fireEvent.change(input, { target: { value: "Buy milk" } });
        fireEvent.click(button);

        expect(handleAdd).toHaveBeenCalledWith("Buy milk");
    });
});
