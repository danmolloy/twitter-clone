const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  /*const postsTweets = await prisma.post.findMany({
    where: {
      authorHandle: "@danmolloy",
      OR: [
        {
          // retweets contains @danmolloy
        }
      ]
    },
  })*/

}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })