const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function getAllHandles(_, __, context) {
  try {
    const allUsers = await context.prisma.user.findMany({
      select: {
        handle: true
      }
    })
    return allUsers
  }
  catch(e) {
    console.log(e)
  }
}

async function currentUser(_, __, context) {
  try {
    const user = await context.prisma.user.findUnique({
    where: {
      handle: context.user.userHandle
    },
    include: {
      follows: {
        select: {
          handle: true,
          name: true,
          profilePic: true
        }
      },
      followers: {
        select: {
          handle: true
        }
      },
      writtenPosts: {
        include: {
          comments: {
            include: {
              author: {
                select: {
                  name: true,
                  handle: true,
                  profilePic: true
                }
              }
            }
          },
        }
      },
      notifications: {
        orderBy: {
          time: "desc"
        }
      },
      chats: {
        select: {
          content: {
            select: {
              read: true,
              authorHandle: true
            }
          },
          users: {
            select: {
              handle: true
            }
          }
        }
      },
    }
  })
  if (!user) {
    throw new Error('No such user found')
  }
  return user
  }
  catch(e) {
    throw e
  }
}

async function getAllUsers(_, __, context) {
  try {
    const allUsers = await context.prisma.user.findMany({
      where: {
        handle: {
          not: context.user.userHandle
        },
      },
        include: {
          followers: {
            select: {
              handle: true
            }
          }
      }
    })

    return allUsers
  }
  catch(e) {
    return `Error! ${e}`
  }
}

async function followsTweets(_, __, context) {
  let followingHandles = [context.user.userHandle]
  const currentUserFollowing = await context.prisma.user.findUnique({
    where: {
      handle: context.user.userHandle
    },
    select: {
      follows: {
        select: {
          handle: true
        }
      }
      }
  })

  for (let i = 0; i < currentUserFollowing.follows.length; i++) {
    followingHandles = [...followingHandles, currentUserFollowing.follows[i].handle]
  }

  const followingTweets = await context.prisma.post.findMany({
    where: {
      authorHandle: {in: followingHandles}
    },
    orderBy: [
      {
        postDate: 'desc'
      }
    ],
    include: {
      author: true,
      comments: {
        include: {
          author: {
            select: {
              name: true,
              handle: true,
              profilePic: true
            }
          }
        }
      },
      likes: {
        select: {
          handle: true
        }
      },
      retweets: {
        select: {
          handle: true
        }
      }
    }
  })

  try {
    return followingTweets
  }
  catch(e) {
    throw e
  }
}

async function getUserProfile(_, arg, context) {
  return context.prisma.user.findUnique({
    where: {
      handle: arg.handle
    },
    include: {
      retweets: {
        include: {
          retweets: {
            select: {
              handle: true
            }
          },
          author: {
            select: {
              name: true,
              handle: true,
              profilePic: true
            }
          },
          comments: {
            include: {
              author: {
                select: {
                  name: true,
                  handle: true,
                  profilePic: true
                }
              }
            }
          },
        }
      }, 
      writtenPosts: {
        include: {
          likes: {
            select: {
              handle: true
            }
          },
          author: {
            select: {
              name: true,
              handle: true,
              profilePic: true
            }
          },
          comments: {
            include: {
              author: {
                select: {
                  name: true,
                  handle: true,
                  profilePic: true
                }
              }
            }
          },
          retweets: {
            select: {
              handle: true
            }
          }
        },
        orderBy: [
          {
            postDate: 'desc'
          }
        ],
      },
      followers: {
        select: {
          handle: true,
          profilePic: true,
          name: true
        }
      },
      follows: {
        select: {
          handle: true,
          profilePic: true,
          name: true
        }
      }
    }
  })
}

async function getPost(_, arg, context) {
  const getPost = await context.prisma.post.findUnique({
    where: {
      id: arg.postID
    },
    include: {
      likes: true,
      author: true,
    }
  })
  return getPost
}

async function getChats(_, __, context) {
  const getUserChats = await context.prisma.chat.findMany({
    where: {
      users: {
        some: {
          handle: context.user.userHandle
        }
      }
    },
    orderBy: {
      lastMessageTime: "desc"
    },
    include: {
      content: {
        select: {
          time: true,
          messageText: true,
          read: true,
          authorHandle: true,
        }
      },
      users: {
        select: {
          handle: true,
          name: true,
          profilePic: true
        }
      }
    }
  })
  return getUserChats
}

async function getChatById(_, arg, context) {
  const getChatById = await context.prisma.chat.findUnique({
    where: {
      id: arg.chatId
    },
    include: {
      content: {
        select: {
          time: true,
          messageText: true,
          read: true,
          authorHandle: true,
          messageId: true,
          author: {
            select: {
              name: true,
              profilePic: true
            }
          }
        }
      },
      users: {
        select: {
          handle: true,
          name: true,
          profilePic: true
        }
      }
    }
  })

  try {
    return getChatById
  }
  catch(e) {
    console.log(e)
  }
}

async function getFollowsUsers(_, __, context) {
  try {
    const followingUsers = await context.prisma.user.findUnique({
      where: {
        handle: context.user.userHandle
      }, 
      include: {
          follows: {
            select: {
              handle: true,
              name: true,
              profilePic: true
            }
          }
        }
      })
    return followingUsers
  }
  catch(e) { 
    return e 
  }
}

async function getNotificationList(_, __, context) {
  try {
    const user = await context.prisma.user.findUnique({
      where: {
        handle: context.user.userHandle
      }, include: {
        notifications: {
          orderBy: {
            time: "desc"
          }
        }
      }
    })
    return user
  }
  catch(e) { return e }
}

async function getNotifications(_, __, context) {
  try {
    const user = await context.prisma.user.findUnique({
    where: {
      handle: context.user.userHandle
      },
    include: {
      notifications: {
        orderBy: {
          time: "desc"
        }
      },
      chats: {
        select: {
          content: {
            select: {
              read: true,
              authorHandle: true
            }
          },
          users: {
            select: {
              handle: true
            }
          }
        }
      },
    }
  })
  if (!user) {
    throw new Error('No such user found')
  }
  return user
  }
  catch(e) {
    throw e
  }
}

module.exports = {
  getAllHandles,
  currentUser,
  getAllUsers,
  followsTweets,
  getUserProfile,
  getPost,
  getChats,
  getChatById,
  getNotifications,
  getFollowsUsers,
  getNotificationList
}