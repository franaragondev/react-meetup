import "@testing-library/jest-dom";

// Set NODE_ENV to 'test' to avoid issues with page reloads
beforeAll(() => {
  process.env.NODE_ENV = "test";
});
