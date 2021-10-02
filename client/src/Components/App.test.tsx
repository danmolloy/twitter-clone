import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing';
import { Home } from './Home';
import { Notifications } from './Notifications';
import { MemoryRouter, Router } from 'react-router';
import { mocks } from './testMocks';
import { Loading } from './Loading';
import { Error } from './Error';
import { Sidebar } from './Sidebar';
import { Profile } from './Profile';

const {act} = TestRenderer

it("Loading component renders without error", () => {
  const component = TestRenderer.create(
    <Loading />
  );
  const tree = component.toJSON()
  expect(tree.props.id).toEqual('loading-component');
})

it("Error component renders without error", () => {
  const component = TestRenderer.create(
    <Error />
  );
  const tree = component.toJSON()
  expect(tree.props.id).toEqual('error-page')
})

it("Sidebar component renders without error", async () => {
  const component = TestRenderer.create(
    <MockedProvider>
      <MemoryRouter>
        <Sidebar data={mocks[0].result.data}/>
      </MemoryRouter>
    </MockedProvider>
  );

  await act( async() => {
    await new Promise(resolve => setTimeout(resolve, 10));
  })

  const tree = component.toJSON();
  expect(tree.props.id).toEqual('side-bar')
})

it("Home component renders without error", async() => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter>
        <Home data={mocks[0].result.data}/>
      </MemoryRouter>
    </MockedProvider>
  );

  await act( async () => {
    await new Promise(resolve => setTimeout(resolve, 1));
  })

  const tree = component.toJSON();
  expect(tree.props.id).toEqual('home');
  expect(tree.children[0].props.id).toEqual('home-header');
  expect(tree.children[1].props.id).toEqual('compose-tweet');
})

it("Notifications component renders without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Notifications />
    </MockedProvider>
  );

  const tree = component.toJSON();
  expect(tree.props.id).toEqual('notifications-component')
})

it("Profile component renders without error", async () => {
    const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={["/@cheese"]}>
        <Profile data={mocks[0].result.data}/>
      </MemoryRouter>
    </MockedProvider>
  );

  const tree = component.toJSON();
  expect(tree.props.id).toEqual('profile-component')

})