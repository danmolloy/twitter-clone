const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('./utils')

module.exports = {
  Query: {
    currentUser: async (_, __, context) => {
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
    },
    getAllUsers: async (_, __, context) => {
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
    },
    followsTweets: async (_, arg, context) => {
      let followingHandles = [arg.handle]
      const currentUserFollowing = await context.prisma.user.findUnique({
        where: {
          handle: arg.handle
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
    },

    getUserProfile: async(_, arg, context) => {
      return context.prisma.user.findUnique({
        where: {
          handle: arg.handle
        },
        include: {
          retweets: true, 
          writtenPosts: {
            include: {
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
            },
            orderBy: [
              {
                postDate: 'desc'
              }
            ],
          },
          followers: {
            select: {
              handle: true
            }
          },
          follows: {
            select: {
              handle: true
            }
          }
        }
      })
    },

    getPost: async(_, arg, context) => {
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
    },
    getChats: async(_, __, context) => {
      const getUserChats = await context.prisma.chat.findMany({
        where: {
          users: {
            some: {
              handle: context.user.userHandle
            }
          }
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
    },
    getChatById: async(_, arg, context) => {
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

    },
    Mutation: {
      writePost: async(_, arg, context) => {
        await context.prisma.post.create({
          data: {
            content: arg.content,
            postDate: String(Date.now()).slice(0, -3),
            authorHandle: arg.authorHandle,
          }
        })
      },
      bookmarkPost: async(_, {postID, handle}, context) => {
        try {
          const bookmarkPost = await context.prisma.post.findUnique({
            where: {
              id: postID
            },
            include: {
              bookmarks: true
            }
          })
        
          if (bookmarkPost.bookmarks.filter(e => e.handle === handle).length >= 1) {
            const unBookmarked = await context.prisma.post.update({
              where: {
                id: postID
              },
              include: {
                bookmarks: true
              },
              data: {
                bookmarks: {
                  disconnect: {
                    handle: handle
                  }
                }
              }
            })
            return unBookmarked
          } else if (bookmarkPost.bookmarks.filter(e => e.handle === handle).length === 0) {
            const bookmarked = await context.prisma.post.update({
              where: {
                id: postID
              },
              include: {
                bookmarks: true
              },
              data: {
                bookmarks: {
                  connect: {
                    handle: handle
                  }
                }
              }
            })
            return bookmarked
          }

          }
          catch(e) {
            return `Error! ${e}`
          }
      },
      likePost: async (_, {postID, handle}, context) => {
        try {
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
                notifiedUserHandle: getPost.authorHandle
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
      },
      retweetPost: async (_, {postID, handle}, context) => {
        try {
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
      },
      deletePost: async (_, { postId }, context) => {
        try {
          const deletePost = await context.prisma.post.delete({
            where: {
              id: postId
            }
          })

          return deletePost
        }
        catch(e) {
          return `Error! ${e}`
        }
      },
      editProfile: async(_, {userName, handle, blurb, profilePic}, context) => {
  
        try {
          const updateUser = await context.prisma.user.update({
            where: {
              handle: handle
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
      },
      followUnfollowUser: async(_, {followHandle, currentUserHandle}, context) => {
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
      },
      signUp: async(_, args, context) => {
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

        const token = jwt.sign({ userHandle: user.handle }, APP_SECRET)
        
        try {
          return {
          token,
          user,
        }}
        catch(e) {
          return e
        }
      },
      login: async(_, args, context) => {
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
      },
      deleteUser: async(_, __, context) => {
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
      },
      newMessage: async(_, args, context) => {
        try {
          const newMessage = await context.prisma.message.create({
            data: {
              chatId: args.chatId,
              time: String(Date.now()).slice(0, -3),
              authorHandle: context.user.userHandle,
              messageText: args.content
              }
            })
            return newMessage
          }
        
        catch(e) {
          console.log(`Error! ${e}`)
        }
      },
      readMessages: async(_, args, context) => {
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
      },
      createOrGetChat: async(_, args, context) => {
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
      },
      readNotifications: async (_, __, context) => {
        const readNotifications = await context.prisma.notification.updateMany({
          where: {
            notifiedUserHandle: context.user.userHandle
          },
          data: {
            read: true
          }
        })
        return readNotifications
      },
      newComment: async (_, args, context) => {
        const newComment = await context.prisma.comment.create({
          data: {
            authorHandle: context.user.userHandle,
            text: args.text,
            time: String(Date.now()).slice(0, -3),
            postId: args.postId
          }
        })
        try {
          return newComment
        }
        catch(e) {
          console.log(e)
        }
      }
    }
  }