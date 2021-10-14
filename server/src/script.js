const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  const selectedTweet = await prisma.post.delete({
    where: {
      id: 
    }
  })

  console.log(selectedTweet)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })