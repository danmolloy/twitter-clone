const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  const user = await prisma.user.findUnique({
    where: {
      handle: "@ed"
    },
    include: {
      followers: true
    }
  })

  
  if (user.followers.filter(e => e.handle === "@egg").length < 1) {
    const followUser = await prisma.user.update({
      where: {
        handle: "@ed"
      },
      include: {
        followers: true
      },
      data: {
        followers: {
          connect: {
            handle: "@egg"
          }
        }
      }
    })
    console.log(followUser)
  } else {
    const unfollowUser = await prisma.user.update({
      where: {
        handle: "@ed"
      },
      include: {
        followers: true
      },
      data: {
        followers: {
          disconnect: {
            handle: "@egg"
          }
        }
      }
    })
    console.log(unfollowUser)
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })