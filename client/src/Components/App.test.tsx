import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import App from "./App";
import { mocks } from './testMocks';
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Sidebar } from "./Sidebar";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { fireEvent } from "@testing-library/dom";
import { getByText } from "@testing-library/dom";


let container: any = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
    container.remove();
    container = null;
});

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

describe("App component", () => {

  it('renders Home component after Loading component', async () => {
    act(() => {
      render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>, container);
    });

    expect(container.textContent).toMatch(/Loading.../gi)
      
    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1))
    })
    expect(container.textContent).toMatch(/What's happening/gi)
  })
})

describe("React Router", () => {
  it("renders correct pathnames without error", async () => {
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

    expect(document.location.pathname).toEqual('/home')

    fireEvent.click(getByText(container, 'Explore'))
    expect(document.location.pathname).toEqual('/explore')

    fireEvent.click(getByText(container, 'Notifications'))
    expect(document.location.pathname).toEqual('/notifications')

    fireEvent.click(getByText(container, 'Messages'))
    expect(document.location.pathname).toEqual('/messages')

    fireEvent.click(getByText(container, 'Bookmarks'))
    expect(document.location.pathname).toEqual('/bookmarks')

    fireEvent.click(getByText(container, 'Lists'))
    expect(document.location.pathname).toEqual('/lists')

    fireEvent.click(getByText(container, 'Profile'))
    expect(document.location.pathname).toEqual(`/${mocks[0].result.data.currentUser.handle.slice(1)}`)

    fireEvent.click(getByText(container, 'Home'))
    expect(document.location.pathname).toEqual('/home')

  })
})