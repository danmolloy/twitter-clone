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
    }

    },
  }