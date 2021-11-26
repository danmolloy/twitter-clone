import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import App from "../App";
import { userMock } from "./AppTestMocks";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Error } from "../Error";
import { Loading } from "../Loading";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { fireEvent, getByText } from "@testing-library/dom";
import { UserOptions } from "../UserOptions";
import { InMemoryCache } from "@apollo/client";

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

describe("App component", () => {
  it("fetches user data and renders Home component after Loading component", async () => {
    act(() => {
      render(
        <MockedProvider mocks={userMock} addTypename={false}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </MockedProvider>,
        container
      );
    });

    expect(container.textContent).toMatch(/Loading.../gi);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    console.log(container.textContent)
    /* expect(container.textContent).toMatch(/Home/gi);
    expect(pretty(container.innerHTML)).toMatchSnapshot(); */
  });
});

describe("Sign in component", () => {
  it("renders if no auth-token", async () => {
    act(() => {
      global.localStorage.removeItem(AUTH_TOKEN);
      render(
        <MockedProvider mocks={userMock} addTypename={false}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </MockedProvider>,
        container
      );
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(container.textContent).toMatch(/password/gi);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});

/* describe("Loading component", () => {
  it("renders without error", () => {
    act(() => {
      render(<Loading />, container);
    });
    expect(container.textContent).toMatch(/Loading.../gi);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});

describe("Error component", () => {
  it("renders without error", () => {
    act(() => {
      render(<Error />, container);
    });
    expect(container.textContent).toMatch(/An error occurred/gi);
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});

describe("Header component", () => {
  it("renders without error", () => {
    act(() => {
      render(<Header pageTitle="Home" blurb="Hello!" />, container);
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"w-full p-2 border-b border-r\\">
        <h2 class=\\"text-xl font-semibold\\">Home</h2>
        <p>Hello!</p>
      </div>"
    `);
  });
});

describe("Sidebar component", () => {
  it("renders without error", async () => {
    act(() => {
      render(
      <MockedProvider mocks={userMock}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </MockedProvider>, container)
    })
    
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(container.textContent).not.toMatch(/error/gi)
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  })

  it("clicking links return expected pathnames", async() => {

    act(() => {
      render(
      <MockedProvider mocks={userMock}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>, container)
    })


    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    fireEvent.click(getByText(container, 'Notifications'))
    expect(document.location.pathname).toMatch(/\/notifications/)

    fireEvent.click(container.querySelector("#twitter-home-link"))
    expect(document.location.pathname).toMatch(/\/home/)
    
    fireEvent.click(container.querySelector("#home-link"))
    expect(document.location.pathname).toMatch(/\/home/)

    fireEvent.click(getByText(container, 'Messages'))
    expect(document.location.pathname).toMatch(/\/messages/)

    fireEvent.click(container.querySelector("#sign-out-btn"))
    expect(document.location.pathname).toMatch(/\/home/)

    fireEvent.click(getByText(container, 'Delete User'))
    expect(document.location.pathname).toMatch(/\/home/)

    fireEvent.click(getByText(container, 'Profile'))
    expect(document.location.pathname).toMatch(/\/ed/)
  })
});

 */