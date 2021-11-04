const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  const readNotifications = await context.prisma.notification.updateMany({
    where: {
      notifiedUserHandle: context.user.userHandle
    },
    data: {
      read: true
    }
  })

  console.log(readNotifications) 

}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })