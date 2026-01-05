import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.groceryItem.deleteMany({}).then(r => {
    console.log('Deleted: ' + r.count + ' items');
    prisma.$disconnect();
});
