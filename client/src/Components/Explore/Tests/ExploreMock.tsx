import { Mock } from '../../App/Tests/AppTestMocks'
import { ALL_USERS } from '../Explore'
import { ExploreUser } from '../../../types'

export const user: ExploreUser =  {
  name: "Edgar Poe",
  handle: "@ed",
  blurb: "Hello world",
  profilePic: "profilePic.jpg",
  followers: [{handle: "@dan"}, {handle: "@fizzlekelly"}]
}

export const ExploreMock: Mock[] = [{
  request: {
    query: ALL_USERS
  },
  result: {
    data: {
      "getAllUsers": [
        {
          "name": "Dan Molloy",
          "handle": "@danmolloy",
          "blurb": "Hi! Click edit profile",
          "profilePic": "/profilePic.jpg",
          "followers": [
            {
              "handle": "@bob1"
            },
            {
              "handle": "@ed"
            },
            {
              "handle": "@edCarr"
            },
            {
              "handle": "@edcarl"
            },
            {
              "handle": "@edgar"
            },
            {
              "handle": "@egg"
            },
            {
              "handle": "@george"
            },
            {
              "handle": "@james"
            },
            {
              "handle": "@kell"
            },
            {
              "handle": "@lara_"
            },
            {
              "handle": "@marge"
            },
            {
              "handle": "@maude"
            },
            {
              "handle": "@ned_flanders"
            },
            {
              "handle": "@rose"
            },
            {
              "handle": "@sean"
            },
            {
              "handle": "@ted"
            },
            {
              "handle": "@thom"
            },
            {
              "handle": "@tod_is_god"
            },
            {
              "handle": "@tony"
            }
          ]
        },
        {
          "name": "Fiona Kelly",
          "handle": "@fizzlekelly",
          "blurb": "hello",
          "profilePic": "/fiona.png",
          "followers": [
            {
              "handle": "@danmolloy"
            },
            {
              "handle": "@ed"
            },
            {
              "handle": "@james"
            },
            {
              "handle": "@sean"
            }
          ]
        },
        {
          "name": "Eoghan",
          "handle": "@egg",
          "blurb": "I am an egg",
          "profilePic": "/eoghan.png",
          "followers": [
            {
              "handle": "@danmolloy"
            },
            {
              "handle": "@bob1"
            },
            {
              "handle": "@ed"
            }
          ]
        },
        {
          "name": "The Big Firkin Band",
          "handle": "@thebigfirkinband",
          "blurb": "17-piece jazz big band",
          "profilePic": "/eoghan.png",
          "followers": [
            {
              "handle": "@danmolloy"
            },
            {
              "handle": "@ed"
            }
          ]
        },
        {
          "name": "Ted Parr",
          "handle": "@ted",
          "blurb": "Click Edit Profile!",
          "profilePic": "/profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            },
            {
              "handle": "@ed"
            }
          ]
        },
        {
          "name": "Sean Molloy",
          "handle": "@sean",
          "blurb": "Click Edit Profile!",
          "profilePic": "/profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            },
            {
              "handle": "@ed"
            }
          ]
        },
        {
          "name": "Edward Carr",
          "handle": "@edCarr",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Todd Flanders",
          "handle": "@tod_is_god",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Ned Flanders",
          "handle": "@ned_flanders",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Maude Flanders",
          "handle": "@maude",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Marge Simpson",
          "handle": "@marge",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Lara Sullivan",
          "handle": "@lara_",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Edmund Carlton",
          "handle": "@edcarl",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Kelly Kelly",
          "handle": "@kell",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Rose Kelly",
          "handle": "@rose",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Thom Cat",
          "handle": "@thom",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "George Harrison",
          "handle": "@george",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "James Jamerson",
          "handle": "@james",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Edgar Poe",
          "handle": "@edgar",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "Tony Pepperoni",
          "handle": "@tony",
          "blurb": "Click Edit Profile!",
          "profilePic": "profilePic.jpg",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        },
        {
          "name": "bob bobs",
          "handle": "@bob1",
          "blurb": "",
          "profilePic": "https://yt3.ggpht.com/ytc/AKedOLT2y4hkt_FsZMoIkho6Vn8jFfGacOYxi2XkvuXL=s900-c-k-c0x00ffffff-no-rj",
          "followers": [
            {
              "handle": "@danmolloy"
            }
          ]
        }
      ]
    }
  }
} ]