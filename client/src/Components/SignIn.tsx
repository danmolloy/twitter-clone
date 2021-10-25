import { useEffect, useState } from "react"
import { useMutation, gql } from '@apollo/client'
import { AUTH_TOKEN } from "../constants";
import { Redirect, useHistory } from "react-router-dom";


const LOGIN = gql`
  mutation Mutation($handle: String!, $password: String!) {
    login(handle: $handle, password: $password) {
      token
      user {
        handle
      }
    }
  }
`;

const SIGNUP = gql`
  mutation Mutation($handle: String!, $password: String!, $name: String!) {
    signUp(handle: $handle, password: $password, name: $name) {
      token
      user {
        handle
        name
      }
    }
  }
`;


export const SignIn = () => {
  const [signUpForm, setSignUpForm] = useState(true)
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [login] = useMutation(LOGIN, { 
    variables: { 
      handle: handle, 
      password: password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      window.location.reload()
    }
  })

  const [signup, {data, loading, error}] = useMutation(SIGNUP, { 
    variables: { 
      name: name,
      handle: handle, 
      password: password
    },
    onCompleted: ({ signUp }) => {
      localStorage.setItem(AUTH_TOKEN, signUp.token);
      window.location.reload();
    }
  })

  return (
    <div className="flex flex-col items-center border bg-twitter-blue fixed w-full h-full">
      <img src="favico.ico" className="sm:flex shadow-md mt-8 w-12 h-auto mx-6 my-4 p-2 rounded bg-white"/>
      <div className="flex rounded shadow-md flex-col items-center mt-8 border bg-white">
      <h2 className="twitter-blue text-lg font-semibold">{signUpForm ? "Sign up" : "Sign in"}</h2>
      <div className="flex flex-col p-2">
        
          {signUpForm &&
           <div className="flex flex-col">
            <label htmlFor="name-input">
              Name
            </label>
            <input value={name} onChange={e => setName(e.target.value)} className="border m-2 rounded-full" id="name-input"/>
          </div>
          }
           <div className="flex flex-col">
          <label htmlFor="username-input">
            Username
          </label>
          <input value={handle} onChange={e => setHandle(e.target.value)} className="border m-2 rounded-full" id="handle-input"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password-input">Password</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} id="password-input" className="border m-2 rounded-full" />
          <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)} className="text-sm hover:underline">{`${showPassword ? "Hide": "Show"} password`}</button>
        </div>
        <button onClick={signUpForm ? () => {
          signup()}
          : () => {
            login()}
          } className="tweet-btn shadow-md">Submit</button>
      </div>
      <button onClick={() => setSignUpForm(!signUpForm)} className="hover:underline twitter-blue">{signUpForm ? "Already have an account?" : "Create an account"}</button>
    </div>
    </div>
  )
}