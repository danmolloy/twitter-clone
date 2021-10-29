import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import App from "../Components/App";
import { mocks } from './testMocks';
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Sidebar } from "../Components/Sidebar";
import { fireEvent } from "@testing-library/dom";
import { getByText } from "@testing-library/dom";
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

describe("SideBar component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Sidebar currentUser={currentUserProp}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.innerHTML).toMatch(/side-bar/gi)
  })
})

describe("React Router", () => {
  it("Sidebar links to correct pathnames without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1))
    })

    fireEvent.click(container.querySelector("#twitter-home-link"))
    expect(document.location.pathname).toEqual('/home')

    fireEvent.click(getByText(container, 'Explore'))
    expect(document.location.pathname).toEqual('/explore')

    fireEvent.click(getByText(container, 'Notifications'))
    expect(document.location.pathname).toEqual('/notifications')

    fireEvent.click(getByText(container, 'Messages'))
    expect(document.location.pathname).toEqual('/messages')

    fireEvent.click(getByText(container, 'Bookmarks'))
    expect(document.location.pathname).toEqual('/bookmarks')

    fireEvent.click(getByText(container, 'Profile'))
    expect(document.location.pathname).toEqual(`/${currentUserProp.handle.slice(1)}`)
    
    fireEvent.click(getByText(container, 'Home'))
    expect(document.location.pathname).toEqual('/home')

  })
})