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
import { ComposeTweet } from "../Components/ComposeTweet";

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

describe("Loading component", () => {
  it('App component initially renders Loading component', async () => {
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
      
  })
  
  it('Loading component renders', () => {
    act(() => {
      render(<Loading />, container);
    });
    expect(container.textContent).toMatch(/Loading.../gi)
  })
})