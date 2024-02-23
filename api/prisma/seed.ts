// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { BcryptAdapter } from "../src/config/bcrypt.adapter";

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
  
    const species = await prisma.species.create({
      data: {
        name: 'Dog',
      },
    });
  
    const pet = await prisma.pet.create({
      data: {
        name: 'Rex',
        ownerId: user.id,
        speciesId: species.id,
        color: 'Brown',
        missingAt: new Date('2023-01-01T00:00:00.000Z'),
        img: 'placeholder.png',
      },
    });
  
    const location = await prisma.location.create({
      data: {
        address: '123 Main St',
        city: 'Anytown',
        country: 'Country',
      },
    });
  
    const reward = await prisma.reward.create({
      data: {
        amount: 100.0,
        description: 'Reward for finding Rex',
        petId: pet.id,
        locationId: location.id,
      },
    });

    const comment = await prisma.comment.create({
        data: {
          text: 'Thank you for helping to find Rex!',
          userId: user.id,
          petId: pet.id,
        },
    });
  
    console.log({ adminPermission, userPermission, user, species, pet, location, reward, comment });
  }
  
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });