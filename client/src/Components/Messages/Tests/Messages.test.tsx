import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { fireEvent, getByText } from "@testing-library/dom";
import { MessagesMock } from "./MessagesMock"
import { Messages } from "../Messages";
import { userMock } from '../../App/Tests/AppTestMocks';
import { BrowserRouter } from "react-router-dom";
import { Chat } from "../Chat";
import App from "../../App/App";

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

describe("Messages component", () => {
  it("renders without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={MessagesMock} addTypename={false}>
          <MemoryRouter>
            <Messages currentUser={currentUser} />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  })

  it("routes to chat", async () => {
    act(() => {
      render(
        <MockedProvider mocks={MessagesMock} addTypename={false}>
          <BrowserRouter >
            <Messages currentUser={currentUser} />
          </BrowserRouter>
        </MockedProvider>, container
      )
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    fireEvent.click(container.querySelector(".chat-preview"))

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
    })
    expect(document.location.pathname).toMatch(/\/messages\/395ed01a-5e12-4220-b94e-ab0bc76a691c/)
    
  })

  it("render list of following", async () => {
    act(() => {
      render(
        <MockedProvider mocks={MessagesMock} addTypename={false}>
          <MemoryRouter>
            <Messages currentUser={currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    fireEvent.click(container.querySelector(".search-following"))

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(pretty(container.innerHTML)).toMatchSnapshot();

  })

})

describe("Search users", () => {
  it("Links to chat", async () => {
    act(() => {
      render(
        <MockedProvider mocks={MessagesMock} addTypename={false}>
          <MemoryRouter>
            <Messages currentUser={currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    fireEvent.click(container.querySelector(".search-following"))

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    
    await act(async () => {
      fireEvent.click(container.querySelector(".chat-link"))

      await new Promise(resolve => setTimeout(resolve, 1000))
    })

    console.log(document.location.pathname)
  })
})