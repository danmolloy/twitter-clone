import { act } from "react-dom/test-utils";
import { unmountComponentAtNode, render } from "react-dom";
import { MemoryRouter, Route } from "react-router";
import { MockedProvider } from "@apollo/client/testing";
import { AUTH_TOKEN } from "../../../constants";
import pretty from "pretty";
import { fireEvent } from "@testing-library/dom";
import { ProfileMock } from './ProfileMock'
import App from "../../App/App";
import { getByText } from "@testing-library/dom";


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
  expect(container.textContent).not.toMatch(/FollowingGeorge CostanzaDan MolloyFind more users in Explore./g)
  fireEvent.click(container.querySelector("#following-btn"))
  expect(container.textContent).toMatch(/FollowingGeorge CostanzaDan MolloyFind more users in Explore./g)
  // Test it closes window
})

it("shows followers", async () => {
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
  expect(container.textContent).not.toMatch(/FollowersDan Molloy/g)
  fireEvent.click(container.querySelector("#followers-btn"))
  expect(container.textContent).toMatch(/FollowersDan Molloy/g)
  // Test it closes window
})

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
  expect(container.textContent).not.toMatch(/You haven't retweeted any tweets./g)

  fireEvent.click(container.querySelector("#profile-retweets-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })  
  expect(container.textContent).not.toMatch(/A profound love between two people/g)
  expect(container.textContent).toMatch(/You haven't retweeted any tweets./g)
})

it("likes tweet in profile page", async () => {
  let testHistory, testLocation
  act(() => {
    render(
      <MockedProvider mocks={ProfileMock} addTypename={false}>
        <MemoryRouter>
          <App /> 
          <Route 
          path="*"
          render={({ history, location }) => {
            testHistory = history;
            testLocation = location;
            return null;
          }}
          />
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
  expect(container.querySelector("like-count")).toBe(null)
  fireEvent.click(container.querySelector("#like-button"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.querySelector("#like-count").textContent).toMatch(/^1$/)
})

it("retweets post in profile page", async () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
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
  expect(container.querySelector("#retweet-count").textContent).not.toMatch(/^1$/)
  fireEvent.click(container.querySelector("#retweet-button"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(window.alert).toHaveBeenCalled()
  expect(container.querySelector("#retweet-count").textContent).toMatch(/^1$/)
   fireEvent.click(container.querySelector("#profile-retweets-link"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  }) 
  expect(container.textContent).toMatch(/A profound love between two people/g)
  expect(container.textContent).not.toMatch(/You haven't retweeted any tweets./g)
})

it("posts comment without error", async () => {
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
  expect(container.querySelector("#comments-count").textContent).not.toMatch(/^1$/g)
  expect(pretty(container.querySelector("#single-tweet").innerHTML)).not.toMatch(/Tweet your reply/g)

  fireEvent.click(container.querySelector("#tweet-comments-btn"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(pretty(container.querySelector("#single-tweet").innerHTML)).toMatch(/Tweet your reply/g)
  fireEvent.change(container.querySelector("#comment-input"), {target: {value: "A comment from Jest!"}})
  fireEvent.click(container.querySelector("#post-comment-btn"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.querySelector("#comments-count").textContent).toMatch(/^1$/g)
})

it("deletes post", async () => {
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
  container.querySelector(".post-options").focus()
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/Delete Tweet/g)
  expect(container.textContent).toMatch(/A profound love /g)
  fireEvent.click(container.querySelector("#delete-button"))
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).not.toMatch(/A profound love /g)
  expect(container.textContent).toMatch(/You haven't posted any tweets./g)
})


/*it("follows & unfollows user from tweet options", () => {
})

it("follows and unfollows user from follow btn", () => {})

it("Edits profile without error", () => {
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
  act(() => {
    fireEvent.click(container.querySelector("#profile-link"))
  })
  await act(async() => {
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  act(() => {
    fireEvent.click(container.querySelector("#edit-profile-btn"))
  })
  expect(container.textContent).toMatch(/Profile Pic HTMLFull NameBlurbSubmit/g)
  act(() => {
    fireEvent.change(container.querySelector("#profile-pic-input"), {target: {value: "jest.jpg"}})
  })
  act(() => {
    fireEvent.change(container.querySelector("#name-input"), {target: {value: "Jesty Jest"}})
  })
  act(() => {
    fireEvent.change(container.querySelector("#blurb-input"), {target: {value: "Jest changed the blurb!"}})
  })
  await act(async () => {
    fireEvent.click(container.querySelector("#submit-edit-btn"))
    await new Promise(resolve => setTimeout(resolve, 100))
  })
  expect(container.textContent).toMatch(/Sign OutJesty Jest/g)
  expect(container.textContent).toMatch(/Jest changed the blurb!Joined Nov 24 /g)
  expect(container.querySelector("#profile-pic").src).toMatch(/jest.jpg/g)
})

  */