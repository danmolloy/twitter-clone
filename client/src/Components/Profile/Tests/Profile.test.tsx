import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { fireEvent, getByText } from "@testing-library/dom";
import { ProfileMock } from './ProfileMock'
import { Profile } from "../Profile";
import { userMock } from '../../App/Tests/AppTestMocks'

const currentUser = userMock[0].result.data.currentUser

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

describe("Profile component", () => {
  it("renders without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={ProfileMock} addTypename={false}>
          <MemoryRouter>
            <Profile currentUser={currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  })
})

describe("EditProfile component", () => {
})

describe("FollowButton component", () => {
  it("Edits profile without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={ProfileMock} addTypename={false}>
          <MemoryRouter initialEntries={["/artVandelay"]}>
            <Profile currentUser={currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    fireEvent.click(getByText(container, "Follow"))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    console.log(location.pathname)
  })
})

it("likes tweet in profile page",() => {})
it("retweets post in profile page")
it("posts comment without error", () => {})
it("deletes post", () => {})
it("unfollows user from tweet options", () => {})
it("follows user from tweet options", () => {})

it("follows and unfollows user from follow btn", () => {})

it("shows following", () => {})
it("shows followers", () => {})
it("shows retweets", () => {})
it("shows tweets", () => {})