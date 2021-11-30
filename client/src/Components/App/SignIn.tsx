import { useState } from "react"
import { useQuery, useMutation, gql } from '@apollo/client'
import { AUTH_TOKEN } from "../../constants";
import { UserHandles } from "../../types";


const USER_HANDLES = gql`
  query GetAllHandles {
    getAllHandles {
      handle
    }
  }
`;

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

const regExFullName = new RegExp(/^[a-z]{2,}(\s)[a-z]{2,}$/i);
const regexUserName = new RegExp(/^[a-zA-Z0-9_]{3,}$/gi);

export const SignIn = () => {
  const [signUpForm, setSignUpForm] = useState(true)
  const [name, setName] = useState("")
  const [handle, setHandle] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const {loading, error, data} = useQuery(USER_HANDLES)

  const [login] = useMutation(LOGIN, { 
    variables: { 
      handle: `@${handle}`, 
      password: password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      window.location.reload()
    }
  })

  const [signup] = useMutation(SIGNUP, { 
    variables: { 
      name: name,
      handle: `@${handle}`, 
      password: password
    },
    onCompleted: ({ signUp }) => {
      localStorage.setItem(AUTH_TOKEN, signUp.token);
      window.location.reload();
    }
  })

  const ValidateSignUp = (fullName: string, userName: string) => {
    if (data && data.getAllHandles.map((i: UserHandles) => 
      i.handle.slice(1)).includes(userName) ) {
      return alert("Username is already taken. Please try another name.")
      }

    if (!regExFullName.test(fullName)) {
      return alert("Full Name invalid. Ensure exactly two names are at least 2 characters in length, contain letters only and are seperated by a space.")
    }
    if (!regexUserName.test(userName)) {
      return alert("Username invalid. May only contain letters, numbers, exactly 0 or 1 underscores and must be between 3-12 characters long.")
    }
    else {
      signup()
    }
  }

  const checkUser = () => {
    if (data && data.getAllHandles.map((i: UserHandles) => 
    i.handle.slice(1)).includes(handle)) {
      login()
    }
    else {
      alert("User not found.")
    }
  }

  return (
    <div className="welcome-background flex flex-col items-center border fixed w-full h-full">
      <div className="sm:hidden flex flex-row items-center">
      <img alt="White Twitter bird" src="/whiteTwitterLogo.png" className="w-8 h-auto"/>
      </div>
      <div className="flex rounded shadow-md flex-col sm:self-start sm:ml-8 sm:ml-24 items-center sm:mt-8 border bg-white z-10">
      <h2 className="text-lg font-semibold">{signUpForm ? "Sign Up" : "Sign In"}</h2>
      <div className="flex flex-col p-2 max-w-xs">
          {signUpForm &&
            <div className="flex flex-col py-4">
              <label htmlFor="name-input">
                Full Name
              </label>
              <input value={name} placeholder="Dan Molloy" maxLength={20} onChange={e => setName(e.target.value)} className="px-2 border m-2 rounded-full w-72" id="name-input"/>
              <p className="text-xs text-gray-500 px-2">Must contain letters and space only</p>
            </div>}
          <div className="flex flex-col py-4">
            <label htmlFor="username-input">
              Username
            </label>
          <input placeholder="dan_molloy1" value={handle} onChange={e => setHandle(e.target.value)} maxLength={12} className="border m-2 rounded-full px-2 w-72" id="handle-input"/>
          {signUpForm && <p className="text-xs text-gray-500 px-2">Must only contain letters, numbers, underscores and must be between 3-12 characters long. Must be unique.</p>}
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="password-input">Password</label>
          <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} maxLength={20} id="password-input" className="px-2 border m-2 rounded-full" />
          {signUpForm && <p className="text-xs text-gray-500 px-2">Must be 3-20 characters long</p>}
         <button 
          type="button" 
          onClick={() => setShowPassword(!showPassword)} className="text-sm hover:underline">{`${showPassword ? "Hide": "Show"} password`}</button>
        </div>
        <button onClick={signUpForm ? () => {
          ValidateSignUp(name, handle)}
          : () => {
            checkUser()}
          } className="tweet-btn shadow-md">Submit</button>
      </div>
      <button onClick={() => setSignUpForm(!signUpForm)} className="hover:underline twitter-blue py-2">{signUpForm ? "Already have an account?" : "Create an account"}</button>
    </div>
    <img alt="Blue Twitter bird" src="/whiteTwitterLogo.png" className="hidden sm:flex sm:fixed w-1/2 sm:w-3/4 h-auto sm:justify-end sm:ml-24 sm:ml-48 md:mt-48 lg:mt-0"/>
    </div>
  )
}