const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function writePost(_, arg, context) {
  try {
    const post = await context.prisma.post.create({
      data: {
        content: arg.content,
        postDate: String(Date.now()).slice(0, -3),
        authorHandle: context.user.userHandle,
      }
    })

    return post
  }
  catch(e) {
    console.log(e)
  }
}

async function likePost(_, {postID}, context) {
  try {
    const handle = context.user.userHandle
    const getPost = await context.prisma.post.findUnique({
      where: {
        id: postID
      },
      include: {
        likes: true
      }
    })
  
    if (getPost && getPost.likes.filter(e => e.handle === handle).length < 1) {
  
      const updatedPost = await context.prisma.post.update({
        where: {
          id: postID
        },
        include: {
          likes: true
        },
        data: {
          likes: {
            connect: {
              handle: handle
            }
          }
        }
      })
      
      const newNotification = await context.prisma.notification.create({
        data: {
          sentFromUser: context.user.userHandle,
          tweetId: postID,
          text: `${context.user.userHandle} liked your tweet: ${getPost.content}`,
          notifiedUserHandle: getPost.authorHandle,
          time: String(Date.now()).slice(0, -3)
        }
      })
      return updatedPost, newNotification

    } else if (getPost && getPost.likes.filter(e => e.handle === handle).length === 1) {
      const updatedPost = await context.prisma.post.update({
        where: {
          id: postID
        },
        include: {
          likes: true
        },
        data: {
          likes: {
            disconnect: {
              handle: handle
            }
          }
        }
      })
      return updatedPost
    }
    
  }
  catch(e) {
    return `Error! ${e}`
  }
}

async function retweetPost(_, {postID}, context) {
  try {
    const handle = context.user.userHandle
    const getPost = await context.prisma.post.findUnique({
      where: {
        id: postID
      },
      include: {
        retweets: true
      }
    })
  
    if (getPost && getPost.retweets.filter(e => e.handle === handle).length < 1) {
  
      const updatedPost = await context.prisma.post.update({
        where: {
          id: postID
        },
        include: {
          retweets: true
        },
        data: {
          retweets: {
            connect: {
              handle: handle
            }
          }
        }
      })
      const newNotification = await context.prisma.notification.create({
        data: {
          sentFromUser: context.user.userHandle,
          tweetId: postID,
          text: `${context.user.userHandle} retweeted your tweet: "${getPost.content}"`,
          notifiedUserHandle: getPost.authorHandle,
          time: String(Date.now()).slice(0, -3)
        }
      })
      return updatedPost
    } else if (getPost && getPost.retweets.filter(e => e.handle === handle).length === 1) {
      const updatedPost = await context.prisma.post.update({
        where: {
          id: postID
        },
        include: {
          retweets: true
        },
        data: {
          retweets: {
            disconnect: {
              handle: handle
            }
          }
        }
      })
      return updatedPost
    }
    
  }
  catch(e) {
    return `Error! ${e}`
  }
}

async function deletePost(_, { postId }, context) {
  try {
    const deletePost = await context.prisma.post.delete({
      where: {
        id: postId
      }
    })

    return deletePost
  }
  catch(e) {
    console.log(e)
    return `Error! ${e}`
  }
}

async function editProfile(_, {userName, blurb, profilePic}, context) {
  
  try {
    const updateUser = await context.prisma.user.update({
      where: {
        handle: context.user.userHandle
      },
      data: {
        name: userName,
        blurb: blurb,
        profilePic: profilePic
      }
    })
    return updateUser
  }
  catch(e) {
    console.log(e)
  }
}

async function followUnfollowUser(_, {followHandle}, context) {
  
  const currentUserHandle = context.user.userHandle

  const user = await context.prisma.user.findUnique({
    where: {
      handle: followHandle
    },
    include: {
      followers: true
    }
  })

  
  if (user.followers.filter(e => e.handle === currentUserHandle).length < 1) {
    const followUser = await context.prisma.user.update({
      where: {
        handle: followHandle
      },
      include: {
        followers: true
      },
      data: {
        followers: {
          connect: {
            handle: currentUserHandle
          }
        }
      }
    })
    const newNotification = await context.prisma.notification.create({
      data: {
        sentFromUser: context.user.userHandle,
        text: `${context.user.userHandle} has started following you.`,
        notifiedUserHandle: followHandle,
        time: String(Date.now()).slice(0, -3)
      }
    })
    return followUser
  } else {
    const unfollowUser = await context.prisma.user.update({
      where: {
        handle: followHandle
      },
      include: {
        followers: true
      },
      data: {
        followers: {
          disconnect: {
            handle: currentUserHandle
          }
        }
      }
    })
    return unfollowUser
  }
}

async function signUp(_, args, context) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.prisma.user.create({ data: { 
    ...args, 
    password,
    joinDate: String(Date.now()).slice(0, -3),
    blurb: "Click Edit Profile!",
    follows: {
      connect: {
        handle: "@danmolloy"
      }
    },
    followers: {
      connect: {
        handle: "@danmolloy"
      }
    },
  },
  include: {
    follows: {
      select: {
        handle: true
      }, 
    },
    followers: {
      select: {
        handle: true
      }
    },
    writtenPosts: true
  }
 })

 const newNotification = await context.prisma.notification.create({
  data: {
    sentFromUser: "@danmolloy",
    text: `@danmolloy has started following you.`,
    notifiedUserHandle: args.handle,
    time: String(Date.now()).slice(0, -3)
    }
  })

const newChat = await context.prisma.chat.create({
  data: {
    lastMessageTime: String(Date.now()).slice(0, -3),
    users: {
      connect: [
        {handle: "@danmolloy"},
        {handle: args.handle}
      ]
    },
  }
})


const newMessage = await context.prisma.message.create({
  data: {
    chatId: newChat.id,
    time: String(Date.now()).slice(0, -3),
    authorHandle: "@danmolloy",
    messageText: `Hi ${args.handle}! Welcome to Twitter. To get you started, we are following each other. You can unfollow me by navigating to my profile.`
    }
  })

const secondMessage = await context.prisma.message.create({
  data: {
    chatId: newChat.id,
    time: String(Date.now()).slice(0, -3),
    authorHandle: "@danmolloy",
    messageText: `Find other users to follow in Explore. You can comment, like and retweet their posts, as well as message them. We have some interesting users here!`
    }
  })

  const thirdMessage = await context.prisma.message.create({
    data: {
      chatId: newChat.id,
      time: String(Date.now()).slice(0, -3),
      authorHandle: "@danmolloy",
      messageText: `Check out your profile - you can view your posts, retweets, and edit some of your user details.`
      }
    })

    const forthMessage = await context.prisma.message.create({
      data: {
        chatId: newChat.id,
        time: String(Date.now()).slice(0, -3),
        authorHandle: "@danmolloy",
        messageText: `Once finished, either sign out or delete your account. Upon delete, all trace of you will be erased. Cheers, Dan`
        }
      })

  const token = jwt.sign({ userHandle: user.handle }, APP_SECRET)
  
  try {
    return {
    token,
    user,
    newNotification,
    newChat,
    newMessage,
    secondMessage,
    thirdMessage,
    forthMessage
  }}
  catch(e) {
    return e
  }
}

async function login(_, args, context) {
  const user = await context.prisma.user.findUnique({ where: { handle: args.handle } })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userHandle: user.handle }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function deleteUser(_, __, context) {
  try {
    const deleteUser = await context.prisma.user.delete({
      where: {
        handle: context.user.userHandle
      }
    })
    return deleteUser
  }
  catch(e) {
    return `Error! ${e}`
  }
}

async function newMessage(_, args, context) {
  try {
    const newMessage = await context.prisma.message.create({
      data: {
        chatId: args.chatId,
        time: String(Date.now()).slice(0, -3),
        authorHandle: context.user.userHandle,
        messageText: args.content
        }
      })

      const lastMessageTime = await context.prisma.chat.update({
        where: {
          id: args.chatId
        },
        data: {
          lastMessageTime: String(Date.now()).slice(0, -3)
        }
      })
      return newMessage, lastMessageTime
    }
  
  catch(e) {
    console.log(`Error! ${e}`)
  }
}

async function readMessages(_, args, context) {
  try {
    const readMessages = await context.prisma.message.updateMany({
      where: {
        chatId: args.chatId,
      },
      data: {
        read: true
      }
    })
    return readMessages
  }
  catch(e) {
    console.log(`Error! ${e}`)
  }
}

async function createOrGetChat(_, args, context) {
  try {
    const getChat = await context.prisma.chat.findFirst({
      where: {
        users: {
          some: {
            handle: context.user.userHandle,
            handle: args.handle
          }
        }
      }
    })
  
    if (getChat === null) {
      const newChat = await context.prisma.chat.create({
        data: {
          users: {
            connect: [
              {handle: context.user.userHandle},
              {handle: args.handle}
            ]
          },
        }
      })
      return newChat
    }
    else {
      return getChat
    }
  }
  catch(e) {
    console.log(`Error! ${e}`)
  }
}

async function readNotifications(_, __, context) {
  const readNotifications = await context.prisma.notification.updateMany({
    where: {
      notifiedUserHandle: context.user.userHandle
    },
    data: {
      read: true
    }
  })
  return readNotifications
}

async function newComment(_, args, context) {

  const getPost = await context.prisma.post.findUnique({
    where: {
      id: args.postId
    }
  })

  const newComment = await context.prisma.comment.create({
    data: {
      authorHandle: context.user.userHandle,
      text: args.text,
      time: String(Date.now()).slice(0, -3),
      postId: args.postId
    }
  })
  const newNotification = await context.prisma.notification.create({
    data: {
      sentFromUser: context.user.userHandle,
      tweetId: args.postId,
      text: `${context.user.userHandle} commented on your tweet: ${context.user.userHandle}: "${args.text}"`,
      notifiedUserHandle: getPost.authorHandle,
      time: String(Date.now()).slice(0, -3)
    }
  })
  try {
    return newComment, newNotification
  }
  catch(e) {
    console.log(e)
  }
}

module.exports = {
  writePost,
  likePost,
  retweetPost,
  deletePost,
  editProfile,
  followUnfollowUser,
  signUp,
  login,
  deleteUser,
  newMessage,
  readMessages,
  createOrGetChat,
  readNotifications,
  newComment
}