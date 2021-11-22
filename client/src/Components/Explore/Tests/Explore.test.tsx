import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { AUTH_TOKEN } from "../../../constants";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router";
import { ExploreMock, user } from "./ExploreMock";
import { Explore } from "../Explore";
import { UserExplore } from "../UserExplore";
import pretty from "pretty";

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

describe("Explore component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider mocks={ExploreMock}>
          <MemoryRouter>
            <Explore currentUserHandle="@ed" />
          </MemoryRouter>
        </MockedProvider>,
        container
      );
    });
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });

  it("follows a user", () => {
    act(() => {
      render(
        <MockedProvider mocks={ExploreMock} addTypename={false}>
          <MemoryRouter>
            <Explore currentUserHandle="@ed"/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    console.log(pretty(container.innerHTML))
  });

  it("Unfollows a user", () => {})
});

describe("UserExplore component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider mocks={ExploreMock}>
          <MemoryRouter>
            <UserExplore user={user} currentUserHandle="@ed" />
          </MemoryRouter>
        </MockedProvider>,
        container
      );
      expect(container.textContent).toMatch(/Poe/gi);
      expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
        "<div class=\\"border-b flex flex-row justify-between hover:bg-gray-100 \\"><a class=\\"flex flex-row m-4\\" href=\\"/ed\\"><img src=\\"profilePic.jpg\\" class=\\"w-12 sm:w-16 h-auto rounded-full \\">
            <div class=\\"flex flex-col ml-4\\">
              <h3 class=\\"font-semibold\\">Edgar Poe</h3>
              <p class=\\"text-gray-500\\">@ed</p>
              <p>Hello world</p>
            </div>
          </a>
          <div><button class=\\"follow-btn\\">Follow</button></div>
        </div>"
      `);
    });
  });
});
