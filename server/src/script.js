const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  const newNotification = await prisma.notification.update({
    where: {
      id: "191f7f18-42d1-49dc-8675-f63a2d11f6ca"
    },
    data: {
      read: true
    }
  }) 

  console.log(newNotification)

  /* const newChat = await prisma.chat.create({
    data: {
      users: {
        connect: [
          {handle: "@ed"},
          {handle: "@danmolloy"}
        ]
      },
    }
  })

 const getUserChats = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          handle: "@danmolloy"
        }
      }
    }
  }) */

  /* const getChat = await prisma.chat.findMany({
    where: {
      users: {
        some: {
          handle: "@danmolloy",
          handle: "@ed"
        }
      }
    }
  }) 
  console.log(getChat)
 if (getChat.length === 1) {
    const newMessage = await prisma.message.create({
      data: {
        chatId: getChat[0].id,
        time: String(Date.now()).slice(0, -3),
        authorHandle: "@danmolloy",
        content: "Hi Ed"
      }
    })
    console.log(newMessage)
  } */
  
    /* const newMessage = await prisma.message.create({
      data: {
        chatId: "4ed60676-ecba-48ec-981b-3bb76310a8f1",
        time: String(Date.now()).slice(0, -3),
        authorHandle: "@danmolloy",
        messageText: "I'm going to eat lunch now."
        }
      })
      console.log(newMessage) */

}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })