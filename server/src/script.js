const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  const getPost = await prisma.post.findUnique({
    where: {
      id: "72335b85-ffdd-477f-aca6-5f5134231852"
    },
    include: {
      retweets: true
    }
  })
  
  if (getPost) {
        
    const updatedPost = await prisma.post.update({
      where: {
        id: "72335b85-ffdd-477f-aca6-5f5134231852"
      },
      include: {
        retweets: true
      },
      data: {
        retweets: {
          connect: {
            handle: "@egg"
          }
        }
      }
    })
    console.log(updatedPost)
  } 
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })