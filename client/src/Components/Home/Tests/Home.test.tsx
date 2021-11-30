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
import { fireEvent, screen } from "@testing-library/dom";
import { TweetComments } from "../TweetComments";
import App from "../../App/App";
import { getByText } from "@testing-library/dom";
import { getAllByText } from "@testing-library/dom";

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

// Successful fetches and refetches of "followsTeets" are dependent on order of mock calls. 
it("likes a post on like btn click in home feed", async () => {
  act(() => {
    render(
      <MockedProvider mocks={HomeMock} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })

  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.querySelector("#like-count").textContent).toMatch(/^1$/)
  
  await act(async () => {
    fireEvent.click(container.querySelector("#like-button"))
    await new Promise(resolve => setTimeout(resolve, 100))
  }) 
  expect(container.querySelector("#like-count").textContent).toMatch(/^2$/)
})


it("retweets a post on retweet btn click in home feed", async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});

  act(() => {
    render(
      <MockedProvider mocks={HomeMock} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })

  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.querySelector("#retweet-count").textContent).toMatch(/^1$/)
  
 await act(async () => {
    fireEvent.click(container.querySelector("#retweet-button"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })  
  expect(container.querySelector("#retweet-count").textContent).toMatch(/^2$/)
  expect(window.alert).toHaveBeenCalled()
})


it("shows comments on comment btn click", async() => {
  act(() => {
    render(
      <MockedProvider mocks={HomeMock} addTypename={false}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })

  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).not.toMatch(/Can I please have lessons\?/g)
  act(() => {
    fireEvent.click(container.querySelector(".show-comments"))
  })
  expect(container.textContent).toMatch(/Can I please have lessons\?/g)
  
})


it("posts comment without error", async () => {
  act(() => {
    render(
      <MockedProvider mocks={HomeMock} addTypename={false}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })

  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  
  act(() => {
    fireEvent.click(container.querySelector(".show-comments"))
  })
  expect(container.textContent).toMatch(/Can I please have lessons\?/g)
  expect(container.textContent).not.toMatch(/Jest@jest•Thu Nov 11 2021Jest wants lessons/g)
  act(() => {
    fireEvent.change(container.querySelector(".comment-input"), {target: {value: "Jest wants lessons"}})
  })
  await act(async () => {
    fireEvent.click(container.querySelector(".reply-button"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/Can I please have lessons\?/g)
  expect(container.textContent).toMatch(/Jest@jest•Thu Nov 11 2021Jest wants lessons/g)
})


it("deletes post in home feed", async () => {
  act(() => {
    render(
      <MockedProvider mocks={HomeMock} addTypename={false}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })

  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  expect(container.textContent).toMatch(/My tweet/g)
  let currentUserTweet = container.querySelector("#single-tweet:nth-child(2)")
  
  currentUserTweet.querySelector(".post-options").focus()
  expect(container.textContent).toMatch(/Delete/g)
  await act(async() => {
    fireEvent.click(container.querySelector("#delete-button"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).not.toMatch(/My tweet/g)
})

it("unfollows user in home feed", async () => {
  Object.defineProperty(window, 'location', {
    value: { reload: jest.fn() }
  });
  act(() => {
    render(
      <MockedProvider mocks={HomeMock} addTypename={false}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })

  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  act(() => {
    container.querySelector(".post-options").focus()
  })
  expect(container.querySelector("#options-button").textContent).toMatch(/^Unfollow$/)
  
  await act(async () => {
    fireEvent.click(container.querySelector(".unfollow-post"))
    await new Promise(resolve => setTimeout(resolve, 200))
  })

  expect(window.location.reload).toHaveBeenCalled();
 
})

it("posts tweet", async () => {
  act(() => {
    render(
      <MockedProvider mocks={HomeMock} addTypename={false}>
        <MemoryRouter initialEntries={["/home"]}>
          <App />
        </MemoryRouter>
      </MockedProvider>, container
    )
  })

  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })

  act(() => {
    fireEvent.change(container.querySelector("#compose-tweet-content"), {target: {value: "Jest is tweeting."}})
  })
  expect(container.textContent).not.toMatch(/Jest@jest•Tue Sep 28 2021•••Jest is tweeting/g)
  await act(async() => {
    fireEvent.click(container.querySelector(".tweet-btn"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/Jest@jest•Tue Sep 28 2021•••Jest is tweeting/g)
  
})