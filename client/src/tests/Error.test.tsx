import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { mocks } from './testMocks';
import { Error } from "../Components/Error";


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

describe("Error component", () => {

  it('renders', () => {
    act(() => {
      render(<Error />, container);
    })
    expect(container.textContent).toMatch(/An error occurred/gi)
  })
})