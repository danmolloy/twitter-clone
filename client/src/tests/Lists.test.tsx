import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { mocks } from './testMocks';
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { Lists } from "../Components/Lists";
import { ListTile } from "../Components/ListTile";

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

describe("Lists component", () => {
  it("renders without error", async() => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Lists currentUser={currentUserProp}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatch(/Lists/gi)
    expect(container.innerHTML).toMatch(/list-tile/gi)
  })
})

describe("ListTile component", () => {
  it("renders without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <ListTile list={mocks[6].result.data["getAuthoredLists"][0]}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatch(/My List/gi)
    expect(container.innerHTML).toMatch(/list-tile/gi)
  })
})