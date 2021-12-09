import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { fireEvent, getByText } from "@testing-library/dom";
import { ProfileMock } from './ProfileMock'
import { Profile } from "../Profile";
import { userMock } from '../../App/Tests/AppTestMocks'
import App from "../../App/App";


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

it("renders without error", async () => {
  act(() => {
    render(
      <MockedProvider mocks={ProfileMock} addTypename={false}>
        <MemoryRouter>
          <App /> 
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  fireEvent.click(container.querySelector("#profile-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(pretty(container.innerHTML)).toMatchSnapshot();
})

it("arrow button links to home", async () => {
  act(() => {
    render(
      <MockedProvider mocks={ProfileMock} addTypename={false}>
        <MemoryRouter>
          <App /> 
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  fireEvent.click(container.querySelector("#profile-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  fireEvent.click(container.querySelector("#profile-home-link"))
  expect(pretty(container.innerHTML)).toMatch(/id="home/g)
})

it("shows following", async() => {
  act(() => {
    render(
      <MockedProvider mocks={ProfileMock} addTypename={false}>
        <MemoryRouter>
          <App /> 
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  fireEvent.click(container.querySelector("#profile-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  fireEvent.click(container.querySelector("#following-btn"))
  expect(container.textContent).toMatch(/FollowersGeorge CostanzaDan MolloyFind more users in Explore./g)
  //fireEvent.click(container.querySelector("#following-btn"))
  console.log(container.textContent)
  //expect(container.textContent).toMatch(/FollowersGeorge CostanzaDan MolloyFind more users in Explore./g)

})

it("shows followers", () => {})

it("filters retweets and tweets", async () => {
  act(() => {
    render(
      <MockedProvider mocks={ProfileMock} addTypename={false}>
        <MemoryRouter>
          <App /> 
        </MemoryRouter>
      </MockedProvider>, container
    )
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  fireEvent.click(container.querySelector("#profile-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/A profound love between two people/g)
  expect(container.textContent).not.toMatch(/This user hasn't retweeted any posts./g)

  fireEvent.click(container.querySelector("#profile-retweets-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })  
  expect(container.textContent).not.toMatch(/A profound love between two people/g)
  expect(container.textContent).toMatch(/This user hasn't retweeted any posts./g)
})

it("likes tweet in profile page", () => {})
it("retweets post in profile page", () => {})
it("posts comment without error", () => {})
it("deletes post", () => {})
it("follows & unfollows user from tweet options", () => {})
it("follows and unfollows user from follow btn", () => {})
it("Edits profile without error", () => {})

