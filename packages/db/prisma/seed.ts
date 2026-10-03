import { PrismaClient, Role } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create default branch
  const branch = await prisma.branch.upsert({
    where: { id: 'main-branch' },
    update: {},
    create: {
      id: 'main-branch',
      name: 'Main Branch',
      address: 'Yangon, Myanmar',
    },
  });

  // 2. Create owner user
  const passwordHash = await argon2.hash('admin123');
  const owner = await prisma.user.upsert({
    where: { email: 'admin@storehub.local' },
    update: {},
    create: {
      email: 'admin@storehub.local',
      passwordHash,
      name: 'System Owner',
      role: Role.OWNER,
      branchId: branch.id,
    },
  });

  // 3. Create a sample category & product
  const category = await prisma.category.upsert({
    where: { name: 'General' },
    update: {},
    create: { name: 'General' },
  });

  await prisma.product.upsert({
    where: { sku: 'SKU-001' },
    update: {},
    create: {
      sku: 'SKU-001',
      barcode: '1234567890123',
      name: 'Sample Product',
      unit: 'pcs',
      costPrice: 1000,
      sellPrice: 1500,
      categoryId: category.id,
    },
  });

  console.log('✅ Seeding completed!');
  console.log(`👤 Owner: ${owner.email} / admin123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
