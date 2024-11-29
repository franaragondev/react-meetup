import Enzyme from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

// Set NODE_ENV to 'test' to avoid issues with page reloads
beforeAll(() => {
  process.env.NODE_ENV = "test";
});
