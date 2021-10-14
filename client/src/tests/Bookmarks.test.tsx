import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import App from "../Components/App";
import { mocks } from './testMocks';
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Sidebar } from "../Components/Sidebar";
import { Error } from "../Components/Error";
import { Loading } from "../Components/Loading";
import { fireEvent } from "@testing-library/dom";
import { getByText } from "@testing-library/dom";
import pretty from "pretty";
import { Bookmarks } from "../Components/Bookmarks";
import { RightBar } from "../Components/RightBar";
import { Notifications } from "../Components/Notifications";
import { Lists } from "../Components/Lists";
import { ListTile } from "../Components/ListTile";
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

describe("Bookmarks component", () => {
  it("loads without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Bookmarks currentUser={currentUserProp}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatch(/Firkin Band/gi)
  })
})