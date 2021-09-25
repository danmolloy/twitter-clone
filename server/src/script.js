const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const getUserProfile = await prisma.user.findUnique({
    where: {
      handle: "@danmolloy"
    },
    include: {
      writtenPosts: true,
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

  console.log(getUserProfile)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })