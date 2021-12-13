import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { AUTH_TOKEN } from "../../../constants";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router";
import pretty from "pretty";
import { fireEvent } from "@testing-library/dom";
import { NotificationsMock } from "./NotificationsMock";
import App from "../../App/App";

let container: any = null


beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  global.localStorage.setItem(AUTH_TOKEN, "auth-token");
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  global.localStorage.removeItem(AUTH_TOKEN)
})

describe("notifications", () => {
  it("renders page", async () => {
    act(() => {
      render(
        <MockedProvider mocks={NotificationsMock} addTypename={false}>
          <MemoryRouter initialEntries={["/notifications"]}>
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


  it("shows notification in sidebar", async() => {
    act(() => {
      render(
        <MockedProvider mocks={NotificationsMock} addTypename={false}>
          <MemoryRouter initialEntries={["/notifications"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(pretty(container.querySelector("#side-bar").innerHTML)).toMatch(/notifications-alert/g)
  })

  it("unread is bold", async () => {
    act(() => {
      render(
        <MockedProvider mocks={NotificationsMock} addTypename={false}>
          <MemoryRouter initialEntries={["/notifications"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.querySelector("#single-notification").className).toMatch(/font-semibold/g)
  })

  it("marks as read", async() => {
    act(() => {
      render(
        <MockedProvider mocks={NotificationsMock} addTypename={false}>
          <MemoryRouter initialEntries={["/notifications"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.querySelector("#single-notification").className).toMatch(/font-semibold/g)
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(container.querySelector("#single-notification").className).not.toMatch(/font-semibold/g)
    expect(pretty(container.querySelector("#side-bar").innerHTML)).not.toMatch(/notifications-alert/g)

  })

  it("links to user profile", async() => {
    act(() => {
      render(
        <MockedProvider mocks={NotificationsMock} addTypename={false}>
          <MemoryRouter initialEntries={["/notifications"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    fireEvent.click(container.querySelector("#single-notification"))
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatch(/I call it 'Twitter'/g)
  })  
})
