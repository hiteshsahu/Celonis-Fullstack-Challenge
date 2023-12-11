const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany()
    await prisma.tenant.deleteMany()
    const aliceUser = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@celonis.cloud',
        }
    })
    const alexUser = await prisma.user.create({
        data: {
            name: 'Max Paul',
            email: 'max.paul@celonis.cloud',
        }
    })

    const unitechTenant = await prisma.tenant.create({
        data: {
            name: "Unitech"
        }
    });
    const realityTenant = await prisma.tenant.create({
        data: {
            name: "Reality Dream"
        }
    });
    await prisma.tenant.create({
        data: {
            name: "Home Owner REIT"
        }
    });

    await prisma.user.update({
        where: { id: aliceUser.id },
        data: {
            Tenant: {
                connect: {
                    id: unitechTenant.id
                }
            }
        }
    })
    await prisma.user.update({
        where: { id: alexUser.id },
        data: {
            Tenant: {
                connect: {
                    id: realityTenant.id
                }
            }
        }
    })
}

main()