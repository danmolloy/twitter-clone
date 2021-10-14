import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { mocks } from './testMocks';
import { MemoryRouter } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { fireEvent } from "@testing-library/dom";
import pretty from "pretty";
import { SingleTweet } from "../Components/SingleTweet";

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

describe("SingleTweet component", () => {
  it("fetches data without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <SingleTweet currentUser={currentUserProp} author={mocks[0].result.data.currentUser} tweet={mocks[1].result.data.followsTweets[0]}/>
          </MemoryRouter>
        </MockedProvider>, container)
    })
    expect(pretty(container.innerHTML)).toMatch(/This is a tweet/gi)
  })

  it("likes a tweet without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SingleTweet currentUser={currentUserProp} author={mocks[0].result.data.currentUser} tweet={mocks[1].result.data.followsTweets[0]}/>
          </MemoryRouter>
        </MockedProvider>, container)
    })

    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })

    expect(container.querySelector("#like-count").textContent).toEqual("")
    fireEvent.click(container.querySelector("#like-button"))

    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })

    expect(container.querySelector("#like-count").textContent).toEqual("1")

    })

  it("retweets a tweet without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <SingleTweet currentUser={currentUserProp} author={mocks[0].result.data.currentUser} tweet={mocks[1].result.data.followsTweets[0]}/>
          </MemoryRouter>
        </MockedProvider>, container)
    })

    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(container.querySelector("#retweet-count").textContent).toEqual("")
    fireEvent.click(container.querySelector("#retweet-button"))
    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })
    expect(container.querySelector("#retweet-count").textContent).toEqual("1")
  })

  it("deletes a tweet without error", async() => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
          <SingleTweet currentUser={currentUserProp} author={mocks[0].result.data.currentUser} tweet={mocks[1].result.data.followsTweets[0]}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
    })

    fireEvent.focus(container.querySelector("#tweet-options"))
    console.log(pretty(container.innerHTML))
    fireEvent.click(container.querySelector("#tweet-options"))

  })
})