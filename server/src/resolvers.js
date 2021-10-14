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
      }
    }
  }