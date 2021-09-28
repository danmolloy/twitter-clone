module.exports = {
  Query: {
    currentUser: async (_, arg, context) => {
      try {
        return context.prisma.user.findUnique({
        where: {
          handle: arg.handle
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
          writtenPosts: {
            include: {
              likes: true
            }
          }
        }
      })
    }
    catch(e) {
      throw e
    }
    },

    followsTweets: async (_, arg, context) => {
      let followingHandles = []
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
        include: {
          author: true,
          likes: true
        }
      })

      return followingTweets
    },

    getUserProfile: async(_, arg, context) => {
      return context.prisma.user.findUnique({
        where: {
          handle: arg.handle
        },
        include: {
          writtenPosts: {
            include: {
              likes: {
                select: {
                  handle: true
                }
              }
            }
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

    },
    Mutation: {
      writePost: async(_, arg, context) => {
        await context.prisma.post.create({
          data: {
            content: arg.content,
            postDate: Date(),
            authorHandle: arg.authorHandle,
          }
        })
        
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

    }
  }