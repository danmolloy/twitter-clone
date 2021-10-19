import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { mocks } from './testMocks';
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Profile } from "../Components/Profile";
import { AUTH_TOKEN } from "../constants";

let container: any = null;
const currentUserProp = mocks[0].result.data.currentUser

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  global.localStorage.setItem(AUTH_TOKEN, 'auth-token')
});

afterEach(() => {
  unmountComponentAtNode(container);
    container.remove();
    container = null;
    global.localStorage.removeItem(AUTH_TOKEN)
});


describe("Profile component", () => {
  it("loads without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/danmolloy"]}>
            <Profile currentUser={currentUserProp}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatch(/Dan Molloy/gi)
  })
})

// Mock refetching