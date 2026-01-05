import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true }
    });
    console.log('Users:');
    users.forEach(u => console.log(`  ${u.name} (${u.email}): ${u.id}`));
    await prisma.$disconnect();
}

getUsers();
