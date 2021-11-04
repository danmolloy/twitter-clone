const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')


  const currentUser = async (_, __, context) => {
    try {
      const user = await context.prisma.user.findUnique({
      where: {
        handle: context.user.userHandle
      },
      include: {
        follows: {
          select: {
            handle: true,
            name: true
          }
        },
        followers: {
          select: {
            handle: true
          }
        },
        writtenPosts: true,
        notifications: true,
        chats: {
          select: {
            content: {
              select: {
                read: true,
              }
            },
            users: {
              select: {
                handle: true
              }
            }
          }
        },
        bookmarks: {
          include: {
            author: {
              select: {
                name: true,
                handle: true,
                profilePic: true
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
            },
          }
        }
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
    currentUser
  }