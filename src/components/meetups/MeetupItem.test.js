import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MeetupItem from "./MeetupItem";

beforeEach(() => {
  // Mock of localStorage (empty by default, unless specified otherwise in each test)
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

  // Check that the button says "Add to favorites"
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Add to favorites");

  // Click the button to add to favorites
  fireEvent.click(button);

  // Check that the button now says "Remove from favorites"
  expect(button).toHaveTextContent("Remove from favorites");

  // Verify that localStorage.setItem has been called correctly
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "favorites",
    JSON.stringify([mockItem])
  );

  // Click again to remove from favorites
  fireEvent.click(button);

  // Check that the button says "Add to favorites" again
  expect(button).toHaveTextContent("Add to favorites");

  // Verify that localStorage.setItem has been updated correctly
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "favorites",
    JSON.stringify([])
  );
});
