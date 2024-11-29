/* eslint-disable testing-library/no-debugging-utils */
import { shallow } from "enzyme";
import MeetupItem from "./MeetupItem";

test("renders MeetupItem without crashing", () => {
  const mockItem = {
    image: "test-image.jpg",
    title: "Test Meetup",
    description: "This is a test meetup",
  };

  const wrapper = shallow(<MeetupItem item={mockItem} />);
  expect(wrapper.exists()).toBe(true);
});
