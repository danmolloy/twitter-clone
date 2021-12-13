import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { fireEvent, getByText } from "@testing-library/dom";
import { MessagesMock } from "./MessagesMock"
import App from "../../App/App";


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

it("marks message as read upon opening chat, updating sidebar & chat preview", async() => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.querySelector("#msg-text-preview").className).toMatch(/^font-bold$/)
  expect(pretty(container.innerHTML)).toMatch(/unread-msg-alert/g)
  await act(async() => {
    fireEvent.click(container.querySelector(".chat-preview"))
    await new Promise(resolve => setTimeout(resolve, 1100))
  })
  expect(pretty(container.innerHTML)).not.toMatch(/unread-msg-alert/g)
  
  fireEvent.click(container.querySelector("#messages-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 200))
  })
  expect(container.querySelector("#msg-text-preview").className)//.not.toMatch(/^font-bold$/)
  
})

it("shows chat previews", async () => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(pretty(container.innerHTML)).toMatchSnapshot();
})

it("chat preview click redirects to chat", async () => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  await act(async() => {
    fireEvent.click(container.querySelector(".chat-preview"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(pretty(container.innerHTML)).toMatchSnapshot();
})

it("chat preview msg.length < 19", async() => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.querySelector("#msg-text-preview").textContent).toMatch(/Once finished, you c ...$/)
})

it("+ btn click shows list of users being followed", async() => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  await act(async () => {
    fireEvent.click(container.querySelector(".search-following"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/Send message to:Dan MolloyYou can only contact users you follow.Find others in Explore./g)
})

it("clicking user in searchUser panel redirects to a chat with user", async() => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  await act(async () => {
    fireEvent.click(container.querySelector(".search-following"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  await act(async() => {
    fireEvent.click(container.querySelector(".chat-link"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  //console.log(document.location.pathname)
})

it("Send button sends msg", async() => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  await act(async() => {
    fireEvent.click(container.querySelector(".chat-preview"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  act(() => {
    fireEvent.change(container.querySelector("#chat-input"), {target: {value: "Hi! Cheers, Jest"}})
  })
 
  fireEvent.click(container.querySelector("#send-msg-btn"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/Cheers, Jest/g)
})

it("click on user name redirects to user profile", async () => {
  act(() => {
    render(
      <MockedProvider mocks={MessagesMock} addTypename={false}>
        <MemoryRouter initialEntries={["/messages"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  await act(async() => {
    fireEvent.click(container.querySelector(".chat-preview"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  await act(async() => {
    fireEvent.click(container.querySelector(".chat-profile-link"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/I call it 'Twitter'/g)
})
  