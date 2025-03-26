import { test, expect } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import App from "./App";

afterEach(() => {
    cleanup();
});

test("renders App component", () => {
    render(<App />);
    const header = screen.getByText(/My todolist/i);
    expect(header).toBeInTheDocument();
});

test("add todo", () => {
    render(<App />);

    const desc = screen.getByPlaceholderText("Description");
    fireEvent.change(desc, { target: { value: "Go to coffee" } });

    const date = screen.getByPlaceholderText("Date");
    fireEvent.change(date, { target: { value: "29.01.2025" } });

    const button = screen.getByText("Add");
    fireEvent.click(button);

    const table = screen.getByRole("table");
    expect(table).toHaveTextContent(/go to coffee/i);
});
