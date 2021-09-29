const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  const userProfile = await prisma.user.findUnique({
    where: {
      handle: "@danmolloy"
    },
    select: {
      retweets: true
    }
  })
  console.log(userProfile)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })