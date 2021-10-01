import TestRenderer from 'react-test-renderer'
import { Loading } from './Loading'
import { Error } from './Error'
import { MockedProvider } from '@apollo/client/testing';
import App, { CURRENTUSER } from "./App";
import { unmountComponentAtNode } from "react-dom";
import { Sidebar } from "./Sidebar";
import pretty from "pretty";
import { render } from "@testing-library/react";

const {act} = TestRenderer;

const mockedCurrentUser: any = [
  {
    request: {
      query: CURRENTUSER,
      variables: {
        currentUserHandle: "@danmolloy"
      },
    },
    result: {
      data: {
        "currentUser": {
          "name": "Dan Molloy",
          "handle": "@danmolloy",
          "blurb": "hello world",
          "joinDate": "21 Sept 2021",
          "bgPic": "bgPic.jpg",
          "profilePic": "profilePic.jpg",
          "follows": [
            {
              "handle": "@fizzlekelly"
            },
            {
              "handle": "@thebigfirkinband"
            }
          ],
          "followers": [
            {
              "handle": "@egg"
            }
          ],
          "writtenPosts": null
        }
      }
    }
    }
];


it("initially renders Loading component without error", () => {

  const component = TestRenderer.create(
    <MockedProvider mocks={mockedCurrentUser} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const tree: any = component.toJSON();
  expect(tree.props.id).toEqual("loading-component");
  expect(tree.children.length).toEqual(2);
})

it("Error component renders", () => {
  const component  = TestRenderer.create(
    <Error />
  )
  const tree: any = component.toJSON();

  expect(tree.props.id).toEqual('error-page');
  expect(tree.children.length).toEqual(3);
})