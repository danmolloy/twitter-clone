import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { AUTH_TOKEN } from "../../../constants";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router";
import pretty from "pretty";
import { fireEvent } from "@testing-library/dom";
import { NotificationsMock } from "./NotificationsMock";
import { Notifications } from "../Notifications";
import { SingleNotification } from "../SingleNotification";

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

describe("Notifications component", () => {
  it("renders without error", async () => {
    act(() => {
      render(<MockedProvider mocks={NotificationsMock}>
        <MemoryRouter>
          <Notifications />
        </MemoryRouter>
      </MockedProvider>, container)
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
  })
})

describe("SingleNotification component", () => {
  it("renders without error", async () => {
    act(() => {
      render(<MockedProvider mocks={NotificationsMock}>
        <MemoryRouter>
          <SingleNotification />
        </MemoryRouter>
      </MockedProvider>, container)
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
  })
})
