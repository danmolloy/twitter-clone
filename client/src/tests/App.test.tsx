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
import { Home } from "../Components/Home";
import { SingleTweet } from "../Components/SingleTweet";
import { Profile } from "../Components/Profile";
import { Bookmarks } from "../Components/Bookmarks";

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

describe("App component", () => {
  it('App component fetches data and renders Home component after Loading component', async () => {
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
      
    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1))
    })
    expect(container.textContent).toMatch(/What's happening/gi)
    expect(location.pathname).toEqual('/home')
    fireEvent.click(getByText(container, 'Profile'))
  })
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
})

describe("Home component", () => {
  it("renders without error", async () => {
    act(() => {
      render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Home currentUser={mocks[0].result.data.currentUser}/>
        </MemoryRouter>
      </MockedProvider>, container)
    })

    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    
    expect(container.textContent).toMatch(/Home/gi)
  })
})

describe("Profile component", () => {
  it("loads without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter initialEntries={["/danmolloy"]}>
            <Profile currentUser={mocks[0].result.data.currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.textContent).toMatch(/Dan Molloy/gi)
  })
})

describe("Bookmarks component", () => {
  it("loads without error", async () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Bookmarks currentUser={mocks[0].result.data.currentUser}/>
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

describe("Lists component", () => {})
describe("ListTile component", () => {})
describe("Notifications component", () => {})
describe("ComposeTweet component", () => {})
describe("Explore component", () => {})
describe("Messages component", () => {})
describe("RightBar component", () => {})

describe("SideBar component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Sidebar currentUser={mocks[0].result.data.currentUser}/>
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.innerHTML).toMatch(/side-bar/gi)
  })
})

describe("SingleTweet component", () => {
  it("fetches data without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <SingleTweet currentUser={mocks[0].result.data.currentUser} author={mocks[0].result.data.currentUser} tweet={mocks[1].result.data.followsTweets[0]}/>
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
            <SingleTweet currentUser={mocks[0].result.data.currentUser} author={mocks[0].result.data.currentUser} tweet={mocks[1].result.data.followsTweets[0]}/>
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
            <SingleTweet currentUser={mocks[0].result.data.currentUser} author={mocks[0].result.data.currentUser} tweet={mocks[1].result.data.followsTweets[0]}/>
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
})


describe("React Router", () => {
  it("Sidebar links to correct pathnames without error", async () => {
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

    fireEvent.click(container.querySelector("#twitter-home-link"))
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