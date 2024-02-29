// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { BcryptAdapter } from "../../src/config/bcrypt.adapter";
import { seedData } from "./data";

const prisma = new PrismaClient();

async function main() {

    const adminPermission = await prisma.permission.create({
      data: {
        name: 'Admin',
      },
    });

    const userPermission = await prisma.permission.create({
        data: {
            name: 'User',
        },
    });
  
    const user = await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        email: 'john.doe@example.com',
        password: BcryptAdapter.hash('123456'), 
        dateOfBirth: new Date('1990-01-01T00:00:00.000Z'),
        img: 'placeholder.png',
        permissions: {
          connect: [{ id: adminPermission.id }],
        },
      },
    });

    seedData.users.forEach( async (user) => {
      await prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          dateOfBirth: user.dateOfBirth,
          phoneNumber: user.phoneNumber,
          permissions: {
            connect: [{ id: userPermission.id}]
          }
        }
      })
    })

    
    await prisma.species.createMany({
      data: seedData.species,
    })
  
    await prisma.pet.createMany({
      data: seedData.pets,
    })
  
    await prisma.location.createMany({
      data: seedData.locations,
    })
  
    await prisma.reward.createMany({
      data: seedData.rewards,
    })

    await prisma.comment.createMany({
      data: seedData.comments,
    })
  
    console.log(`Database seeded\n Admin user: ${JSON.stringify(user)}`);
  }
  
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });