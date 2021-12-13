import { XCircleIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { GETUSER } from './Profile'

export const EDIT_PROFILE = gql`
mutation Mutation($handle: String, $userName: String, $blurb: String, $profilePic: String) {
  editProfile(handle: $handle, userName: $userName, blurb: $blurb, profilePic: $profilePic) {
    name
    blurb
    handle
    profilePic
  }
}
`;

export const EditProfile = () => {
  const [editProfile, setEditProfile] = useState(false)
  const [newName, setNewName] = useState("")
  const [newBlurb, setNewBlurb] = useState("")
  const [newPic, setNewPic] = useState("/profilePic.jpg")

  const [handleSubmitEdit] = useMutation(EDIT_PROFILE, {
    variables: {
      userName: newName,
      blurb: newBlurb,
      profilePic: newPic
    }
  })

  const validateForm = () => {
   const regExFullName = new RegExp(/^[a-z]{2,}(\s)[a-z]{2,}$/i);
    if (!regExFullName.test(newName)) {
      return alert("Name invalid. Must be two names of atleast two characters seperated by a space.")
    } 
    if (newPic === "") {
      setNewPic('/profilePic.jpg')
    }
    handleSubmitEdit({
      refetchQueries: [
        GETUSER,
        'getUserProfile'
      ]
    })
    setEditProfile(false)
    setNewName("") 
    setNewPic("") 
    setNewBlurb("")
  }

  return (
    <div className="flex flex-col">
    {editProfile ?
      <div className="flex flex-col fixed rounded border -ml-60 mt-12 z-10 bg-white shadow-sm p-2">
        <button onClick={() => setEditProfile(false)} className=" w-10 self-end">
          <XCircleIcon className="w-10 p-1 h-auto text-red-500 hover:bg-red-50 rounded-full"/>
        </button>
        <label htmlFor="profile-pic-input">Profile Pic HTML</label>
        <input  id="profile-pic-input" maxLength={200} value={newPic} onChange={e => setNewPic(e.target.value)} className="border"/>
        <label htmlFor="name-input">Full Name</label>
        <input id="name-input" placeholder="Dan Molloy" maxLength={20} className="border" value={newName} onChange={e => setNewName(e.target.value)}/>
        <label htmlFor="blurb-input">Blurb</label>
        <input id="blurb-input" maxLength={40} placeholder="Hello World" className="border" value={newBlurb} onChange={e => setNewBlurb(e.target.value)}/>
        <button id="submit-edit-btn" className="border tweet-btn" onClick={() => validateForm()}>Submit</button>
      </div> 
      : 
      <button id="edit-profile-btn" className="border tweet-btn" onClick={() => setEditProfile(true)}>
      Edit profile
      </button>
      }
    </div>
  )
}