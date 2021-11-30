import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { AUTH_TOKEN } from "../../../constants";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router";
import { ExploreMock, user } from "./ExploreMock";
import { Explore } from "../Explore";
import { UserExplore } from "../UserExplore";
import pretty from "pretty";
import App from '../../App/App'
import { fireEvent } from "@testing-library/dom";
import { getByText } from "@testing-library/dom";

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



describe("Explore page", () => {
  // "follows or unfollows.." must be first test for mutation and succeeding snapshots to work correctly.
  it("follows or unfollows user on follow/unfollow btn click", async () => {
    act(() => {
      render(
        <MockedProvider addTypename={false} mocks={ExploreMock}>
          <MemoryRouter initialEntries={["/explore"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 200))
    })
    expect(container.textContent).toMatch(/ExploreA complete list of users/g);
    let btn = container.querySelector(".follow-unfollow-btn")
    expect(btn.textContent).toMatch(/^Unfollow$/)

    await act(async () => {
      fireEvent.click(container.querySelector(".unfollow-btn"));
      await new Promise(resolve => setTimeout(resolve, 100));
    }) 
    expect(btn.textContent).toMatch(/^Follow$/)
     
  })

  it("renders without error", async () => {
    act(() => {
      render(
        <MockedProvider addTypename={false} mocks={ExploreMock}>
          <MemoryRouter initialEntries={["/explore"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatchSnapshot();
  })


  it("user link redirects to profile", async () => {
    act(() => {
      render(
        <MockedProvider addTypename={false} mocks={ExploreMock}>
          <MemoryRouter initialEntries={["/explore"]}>
            <App />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatch(/ExploreA complete list of users/g);
    act(() => {
      fireEvent.click(container.querySelector("#explore-user-link"))
    })
    expect(pretty(container.innerHTML)).toMatch(/profile-component/g);
    
  })
});
