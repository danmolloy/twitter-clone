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

it("renders", () => {})
it("unread is bold", () => {})
it("marks as read", () => {})
it("read is not bold", () => {})
it("links to user profile", () => {})

describe("Notifications", () => {
  it("renders page error", async () => {
    act(() => {
      render(
      <MockedProvider mocks={NotificationsMock}>
        <MemoryRouter initialEntries={["/notifications"]} >
          <App />
        </MemoryRouter>
      </MockedProvider>, container)
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    console.log(location.pathname)
  })
})