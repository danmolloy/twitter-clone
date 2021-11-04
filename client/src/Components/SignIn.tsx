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

  const regExFullName = new RegExp(/^[a-z]{2,}(\s)[a-z]{2,}$/i);
  const regex = new RegExp(/^[a-z,0-9,_]{3,}$/i);
  

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
      <div className="flex flex-col p-2 max-w-xs">
        
          {signUpForm &&
           <div className="flex flex-col">
            <label htmlFor="name-input">
              Full Name
            </label>
            <p className="text-xs text-gray-500">Must contain letters and space only</p>
            <input value={name} placeholder="Dan Molloy" maxLength={20} onChange={e => setName(e.target.value)} className="px-2 border m-2 rounded-full" id="name-input"/>
          </div>
          }
           <div className="flex flex-col">
          <label htmlFor="username-input">
            Username
          </label>
          {signUpForm && <p className="text-xs text-gray-500">Must only contain letters, numbers or underscores and must be between 6-12 characters long.</p>}
          <input placeholder="dan_molloy1" value={handle} onChange={e => setHandle(e.target.value)} maxLength={12} className="border m-2 rounded-full px-2" id="handle-input"/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password-input">Password</label>
          {signUpForm && <p className="text-xs text-gray-500">Must be 6-20 characters long</p>}
          <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} maxLength={20} id="password-input" className="px-2 border m-2 rounded-full" />
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