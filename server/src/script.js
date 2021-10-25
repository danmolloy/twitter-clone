const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.delete({
    where: {
      handle: "@hank"
    }
  })

  console.log(user)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })