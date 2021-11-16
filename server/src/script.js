const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  // delete all msgs in chats

  const chats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          handle: "@maude"
        }
      }
    }
  })

  if (chats) {
    for (i = 0; i < chats.length; i++) {
      await prisma.message.deleteMany({
        where: {
          chatId: chats[i].chatId
        }
      })
    }
    
  }
  
    
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })