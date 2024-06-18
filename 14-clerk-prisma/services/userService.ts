import { prisma } from '@/lib/db';

export const addUserToDatabase = async (clerkUserId: string, name: string, email: string) => {
  try {
    const user = await prisma.user.upsert({
      where: { clerkUserId },
      update: {
        name,
        email,
      },
      create: {
        clerkUserId,
        name,
        email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error adding user to database:", error);
    throw error;
  }
};