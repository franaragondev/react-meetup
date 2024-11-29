import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MeetupItem from "./MeetupItem";

// Mocking localStorage before each test
beforeEach(() => {
  Object.defineProperty(global, "localStorage", {
    value: {
      getItem: jest.fn(() => JSON.stringify([])), // Returns an empty list by default
      setItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

test("renders MeetupItem without crashing", () => {
  const mockItem = {
    id: "1",
    image: "test-image.jpg",
    title: "Test Meetup",
    description: "This is a test meetup",
    address: "Test Address",
  };

  render(<MeetupItem item={mockItem} />);

  // Verifies that the title and description are in the document
  expect(screen.getByText("Test Meetup")).toBeInTheDocument();
  expect(screen.getByText("This is a test meetup")).toBeInTheDocument();
});

test("displays correct title and description", () => {
  const mockItem = {
    id: "1",
    image: "test-image.jpg",
    title: "Test Meetup",
    description: "This is a test meetup",
    address: "Test Address",
  };

  render(<MeetupItem item={mockItem} />);

  // Verifies that the title and description are in the document
  expect(screen.getByText("Test Meetup")).toBeInTheDocument();
  expect(screen.getByText("This is a test meetup")).toBeInTheDocument();
});

test("toggles favorite status and updates localStorage", () => {
  const mockItem = {
    id: "1",
    image: "test-image.jpg",
    title: "Test Meetup",
    description: "This is a test meetup",
    address: "Test Address",
  };

  render(<MeetupItem item={mockItem} />);

  // Verifies that the button says "Add to favorites" by default
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Add to favorites");

  // Simulates a click on the button to add to favorites
  fireEvent.click(button);

  // Verifies that the button now says "Remove from favorites"
  expect(button).toHaveTextContent("Remove from favorites");

  // Verifies that localStorage.setItem was called with the correct value
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "favorites",
    JSON.stringify([mockItem]) // It should add the item to the favorites array
  );

  // Simulates another click to remove from favorites
  fireEvent.click(button);

  // Verifies that the button says "Add to favorites" again
  expect(button).toHaveTextContent("Add to favorites");

  // Verifies that localStorage.setItem was called correctly to clear the favorites
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "favorites",
    JSON.stringify([]) // It should remove the item from the favorites list
  );
});
