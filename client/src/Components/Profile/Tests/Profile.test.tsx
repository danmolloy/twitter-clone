import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { fireEvent, getByText } from "@testing-library/dom";
import { ProfileMock } from './ProfileMock'

let container: any = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  global.localStorage.setItem(AUTH_TOKEN, "auth-token");
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  global.localStorage.removeItem(AUTH_TOKEN);
});

describe("Profile component", () => {})
describe("EditProfile component", () => {})
describe("FollowButton component", () => {})
describe("ProfileDetails component", () => {})
describe("ProfileFollowers component", () => {})
describe("ProfileHeader component", () => {})
describe("ProfileTweets components", () => {})
