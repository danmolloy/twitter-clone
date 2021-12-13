import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import App from "../App";
import { userMock } from "./AppTestMocks";
import { MemoryRouter, Route } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Error } from "../Error";
import { Loading } from "../Loading";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { fireEvent, getByText } from "@testing-library/dom";

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
    expect(container.textContent).toMatch(/Home/gi);
    expect(pretty(container.innerHTML)).toMatchSnapshot(); 
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

  it("on signup/login there is a loading signal", () => {})

it("calls alert if new username already in use", async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
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



    fireEvent.change(container.querySelector("#name-input"), {target: {value: "Jesty Jest"}})
    fireEvent.change(container.querySelector("#handle-input"), {target: {value: "leGuin"}})
    fireEvent.change(container.querySelector("#password-input"), {target: {value: "password1"}})

    fireEvent.click(container.querySelector("#signup-submit-btn"))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(window.alert).toHaveBeenCalled();
  })

  it("calls alert if new username invalid", async() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
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



    fireEvent.change(container.querySelector("#name-input"), {target: {value: "Jesty Jest"}})
    fireEvent.change(container.querySelector("#handle-input"), {target: {value: "l"}})
    fireEvent.change(container.querySelector("#password-input"), {target: {value: "password1"}})

    fireEvent.click(container.querySelector("#signup-submit-btn"))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(window.alert).toHaveBeenCalled();
  })

  it("calls alert if new full name invalid", async () => {   
    jest.spyOn(window, 'alert').mockImplementation(() => {});
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



    fireEvent.change(container.querySelector("#name-input"), {target: {value: "Jest"}})
    fireEvent.change(container.querySelector("#handle-input"), {target: {value: "newUser"}})
    fireEvent.change(container.querySelector("#password-input"), {target: {value: "password1"}})

    fireEvent.click(container.querySelector("#signup-submit-btn"))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(window.alert).toHaveBeenCalled();
  })

  it("calls signup if new user info valid", () => {})
  it("calls alert if username invalid on login attempt", async() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
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
    fireEvent.click(container.querySelector("#form-selector"))

    fireEvent.change(container.querySelector("#handle-input"), {target: {value: "n"}})
    fireEvent.change(container.querySelector("#password-input"), {target: {value: "password1"}})

    fireEvent.click(container.querySelector("#signup-submit-btn"))
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(window.alert).toHaveBeenCalled();
  })
  it("calls login if username valid on login attempt", () => {})
});

describe("Loading component", () => {
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

  it("Retry click calls location.reload", () => {})
  it("Sign-out click removes location.storage(auth-token) and calls location.reload", () => {})
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
    let testHistory, testLocation;

    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() }
    });

    act(() => {
      render(
      <MockedProvider mocks={userMock}>
        <MemoryRouter>
          <App />
          <Route
        path="*"
        render={({ history, location }) => {
          testHistory = history;
          testLocation = location;
          return null;
        }}
      />
        </MemoryRouter>
      </MockedProvider>, container)
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    fireEvent.click(container.querySelector("#twitter-home-link"))
    expect(testLocation?.pathname).toBe('/home')

    fireEvent.click(getByText(container, 'Notifications'))
    expect(testLocation?.pathname).toBe('/notifications')

    fireEvent.click(container.querySelector("#home-link"))
    expect(testLocation?.pathname).toBe('/home')

    fireEvent.click(getByText(container, 'Messages'))
    expect(testLocation?.pathname).toBe('/messages')


    fireEvent.click(getByText(container, 'Profile'))
    expect(testLocation?.pathname).toBe('/leGuin')

    fireEvent.click(container.querySelector("#sign-out-btn"))
    expect(testLocation?.pathname).toBe('/home')
    expect(window.location.reload).toHaveBeenCalled();
  })
});