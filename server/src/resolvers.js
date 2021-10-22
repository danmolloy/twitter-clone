const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('./utils')

module.exports = {
  Query: {
    loggedInUser: async (_, __, context) => {

      try {
        const user = await context.prisma.user.findUnique({ where: { handle: context.user.userHandle } })
        if (!user) {
          throw new Error('No such user found')
        }

        return user
        
      }
      catch(e) {
        return `Error! ${e}`
      }
     
    },
    currentUser: async (_, __, context) => {
      try {
        const user = await context.prisma.user.findUnique({
        where: {
          handle: context.user.userHandle
        },
        include: {
          follows: {
            select: {
              handle: true
            }
          },
          followers: {
            select: {
              handle: true
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
              }
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
    getAuthoredLists: async(_, arg, context) => {
      const lists = await context.prisma.list.findMany({
        where: {
          authorHandle: arg.handle
        },
        include: {
          author: {
            select: {
              name: true,
              profilePic: true
            }
          },
          members: {
            select: {
              handle: true
            }
          },
          followers: {
            select: {
              handle: true
            }
          }
        }
      })
    
      return lists
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
            return updatedPost
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
      editProfile: async(_, {userName, handle, blurb}, context) => {
  
        try {
          const updateUser = await context.prisma.user.update({
            where: {
              handle: handle
            },
            data: {
              name: userName,
              blurb: blurb
            }
          })
          return updateUser
        }
        catch(e) {
          return `Error! ${e}`
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

        const user = await context.prisma.user.create({ data: { ...args, password } })

        const token = jwt.sign({ userHandle: user.handle }, APP_SECRET)
        
        return {
          token,
          user,
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
    }
  }