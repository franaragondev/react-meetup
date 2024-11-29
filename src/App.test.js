import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App without crashing", () => {
  render(<App />);
  const appElement = screen.getByTestId("app");
  expect(appElement).toBeInTheDocument();
});

test("renders the navigation component", () => {
  render(<App />);
  const navElement = screen.getByTestId("main-navigation");
  expect(navElement).toBeInTheDocument();
});

test("renders the Layout component", () => {
  render(<App />);
  const layoutElement = screen.getByTestId("layout");
  expect(layoutElement).toBeInTheDocument();
});
