import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { AUTH_TOKEN } from "../../../constants";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router";
import { ComposeTweet } from "../ComposeTweet";
import pretty from "pretty";
import { HomeMock } from "./HomeMocks";
import { Home } from "../Home";
import { userMock } from '../../App/Tests/AppTestMocks'
import { HomeFeed } from "../HomeFeed";
import { SingleTweet } from "../SingleTweet";
import { fireEvent } from "@testing-library/dom";

let container: any = null

const currentUser = userMock[0].result.data

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  global.localStorage.setItem(AUTH_TOKEN, "auth-token");
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  global.localStorage.removeItem(AUTH_TOKEN)
})

describe("ComposeTweet component", () => {
  it("renders without error", () => {
    act(() => {
      render(
      <MockedProvider>
        <MemoryRouter>
          <ComposeTweet currentUser={undefined}/>
        </MemoryRouter>
      </MockedProvider>, container)
    })
    expect(container.textContent).toMatch(/Tweet/gi)
    expect(pretty(container.innerHTML)).toMatchSnapshot();
  })
})

describe("Home component", () => {
  it("renders without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={HomeMock} addTypename={false}>
          <MemoryRouter>
            <Home currentUser={currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  })
})

describe("HomeFeed component", () => {
  it("renders without error", async() => {
    act(() => {
      render(
        <MockedProvider mocks={HomeMock} addTypename={false}>
          <MemoryRouter>
            <HomeFeed
            updatePage={() => jest.fn()} 
            currentUser={currentUser} 
            followsTweets={HomeMock[0].result.data.followsTweets}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(pretty(container.innerHTML)).toMatchSnapshot();

  })
})

describe("SingleTweet component", () => {
  it("renders without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={HomeMock} addTypename={false}>
          <MemoryRouter>
            <SingleTweet 
            updatePage={() => jest.fn()}
            tweet={HomeMock[0].result.data.followsTweets[0]} 
            author={HomeMock[0].result.data.followsTweets[0].author}
            currentUser={currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    expect(pretty(container.innerHTML)).toMatchSnapshot();

  })

  it("likes tweet and unlikes tweet", async () => {
    act(() => {
      render(
        <MockedProvider mocks={HomeMock} addTypename={false}>
          <MemoryRouter>
            <SingleTweet 
            updatePage={() => jest.fn()}
            tweet={HomeMock[0].result.data.followsTweets[0]} 
            author={HomeMock[0].result.data.followsTweets[0].author}
            currentUser={currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })

    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.querySelector("#like-count").textContent).toMatch(/1/)
    fireEvent.click(container.querySelector("#like-button"))
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.querySelector("#like-count").textContent).toMatch(/2/)

  })

  it("retweets post and unretweets post", () => {})
  it("deletes post", () => {})
  it("links to user's profile", () => {})
})

describe("TweetComment component", () => {})