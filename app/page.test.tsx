
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";

describe("Task Management", () => {
  test("menampilkan daftar tugas awal", () => {
    render(<Home />);

    expect(screen.getByText("Belaja Jenkins")).toBeInTheDocument();
    expect(screen.getByText("Belajar Playwright")).toBeInTheDocument();
  });

  test("pengguna dapat menambahkan tugas", () => {
    render(<Home />);

    const input = screen.getByTestId("task-input");

    fireEvent.change(input, {
      target: { value: "Belajar Jest" },
    });

    fireEvent.click(screen.getByTestId("add-task"));

    expect(screen.getByText("Belajar Jest")).toBeInTheDocument();
  });

  test("tidak menambahkan tugas kosong", () => {
    render(<Home />);

    fireEvent.click(screen.getByTestId("add-task"));

    expect(screen.getAllByTestId("task-item")).toHaveLength(2);
  });

  test("pengguna dapat menandai tugas selesai", () => {
    render(<Home />);

    const task = screen.getByText("Belaja Jenkins");

    fireEvent.click(task);

    expect(task).toHaveClass("line-through");
  });

  test("pengguna dapat menghapus tugas", () => {
    render(<Home />);

    const deleteButtons = screen.getAllByTestId("delete-task");

    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Belaja Jenkins")).not.toBeInTheDocument();
  });
});
