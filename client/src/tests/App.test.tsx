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
          <Home currentUser={currentUserProp}/>
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
            <Profile currentUser={currentUserProp}/>
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

describe("Notifications component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <Notifications />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.innerHTML).toMatch(/notifications-component/gi)
    expect(container.textContent).toMatch(/Notifications/gi)
  })
})

describe("ComposeTweet component", () => {
  it("renders withour error", async () => {
    act(() => {
      render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <ComposeTweet currentUser={currentUserProp}/>
        </MemoryRouter>
      </MockedProvider>, container)
    })
    await act(async() => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })
    expect(container.innerHTML).toMatch(/compose-tweet/gi)
  })
})

describe("Explore component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <Explore />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.innerHTML).toMatch(/explore-component/gi)
  })
})

describe("Messages component", () => {})

describe("RightBar component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider>
          <MemoryRouter>
            <RightBar />
          </MemoryRouter>
        </MockedProvider>, container
      )
    })
    expect(container.textContent).toMatch(/What's happening/gi)
  })
})

describe("SideBar component", () => {
  it("renders without error", () => {
    act(() => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Sidebar currentUser={currentUserProp}/>
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
    expect(document.location.pathname).toEqual(`/${currentUserProp.handle.slice(1)}`)

    fireEvent.click(getByText(container, 'Home'))
    expect(document.location.pathname).toEqual('/home')

  })
})