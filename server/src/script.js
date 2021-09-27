const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const getPost = await prisma.post.findUnique({
    where: {
      id: "52ec0146-9436-493c-9ce0-b44084f1ffca"
    },
    include: {
      likes: true,
      author: true,
    }
  })
  console.log(getPost)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })