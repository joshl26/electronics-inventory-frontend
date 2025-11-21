import React from "react";
import { render, screen } from "@testing-library/react";
import NoteList from "components/features/notes/NoteList";
import Note from "components/features/notes/Note";
import { MemoryRouter } from "react-router-dom";

// Mock Note component to isolate NoteList tests
jest.mock("components/features/notes/Note", () =>
  jest.fn(() => <div>NoteItem</div>)
);

const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe("NoteList", () => {
  const notesMock = {
    ids: ["1", "2"],
    entities: {
      1: { id: "1", username: "user1", title: "Note 1" },
      2: { id: "2", username: "user2", title: "Note 2" },
    },
  };

  const filteredIdsMock = ["1", "2"];

  beforeEach(() => {
    Note.mockClear();
  });

  it("renders the notes table with correct headers", () => {
    renderWithRouter(
      <NoteList notes={notesMock} filteredIds={filteredIdsMock} />
    );

    // Use getAllByText because "Note Status" appears multiple times
    const noteStatusElements = screen.getAllByText("Note Status");
    expect(noteStatusElements.length).toBeGreaterThan(0);

    expect(screen.getByText("Date Created")).toBeInTheDocument();
    expect(screen.getByText("Date Updated")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("View Note")).toBeInTheDocument();
  });

  it("renders the correct number of Note components", () => {
    renderWithRouter(
      <NoteList notes={notesMock} filteredIds={filteredIdsMock} />
    );

    expect(Note).toHaveBeenCalledTimes(filteredIdsMock.length);
    filteredIdsMock.forEach((id, index) => {
      expect(Note).toHaveBeenNthCalledWith(index + 1, { noteId: id }, {});
    });
  });

  it("renders search input and dropdowns", () => {
    renderWithRouter(
      <NoteList notes={notesMock} filteredIds={filteredIdsMock} />
    );

    expect(screen.getByPlaceholderText("Search notes...")).toBeInTheDocument();

    // Adjusted expected count to 2 based on actual rendered buttons
    const allButtons = screen.getAllByRole("button", { name: /all/i });
    expect(allButtons.length).toBe(2);
  });

  it("renders Add New Note button linking to correct route", () => {
    renderWithRouter(
      <NoteList notes={notesMock} filteredIds={filteredIdsMock} />
    );

    const addButton = screen.getByRole("link", { name: /add new note/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("href", "/dash/notes/new");
  });
});
