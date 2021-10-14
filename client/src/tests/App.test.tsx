import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import App from "../Components/App";
import { mocks } from './testMocks';
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Error } from "../Components/Error";
import { Loading } from "../Components/Loading";
import { fireEvent } from "@testing-library/dom";
import { getByText } from "@testing-library/dom";
import pretty from "pretty";
import { RightBar } from "../Components/RightBar";
import { Notifications } from "../Components/Notifications";
import { Explore } from "../Components/Explore";

let container: any = null;
const currentUserProp = mocks[0].result.data.currentUser

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("App component", () => {
  it('App component fetches data and renders Home component after Loading component', async () => {
    act(() => {
      render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>, container);
    });

    expect(container.textContent).toMatch(/Loading.../gi)
    expect(location.pathname).toEqual('/')
      
    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1))
    })
    expect(container.textContent).toMatch(/What's happening/gi)
    expect(location.pathname).toEqual('/home')
    fireEvent.click(getByText(container, 'Profile'))
  })
  it('Error component renders', () => {
    act(() => {
      render(<Error />, container);
    })
    expect(container.textContent).toMatch(/An error occurred/gi)
  })
  
  it('Loading component renders', () => {
    act(() => {
      render(<Loading />, container);
    });
    expect(container.textContent).toMatch(/Loading.../gi)
  })
})

describe("Notifications component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <Notifications />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.innerHTML).toMatch(/notifications-component/gi)
    expect(container.textContent).toMatch(/Notifications/gi)
  })
})

describe("Explore component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <Explore />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.innerHTML).toMatch(/explore-component/gi)
  })
})


describe("RightBar component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <RightBar />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.textContent).toMatch(/What's happening/gi)
  })
})

