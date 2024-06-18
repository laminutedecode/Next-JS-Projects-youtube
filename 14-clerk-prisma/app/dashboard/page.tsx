import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { addUserToDatabase } from '@/services/userService';

export default async function PageDashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const user = await currentUser();

  // Ajoutez l'utilisateur à la base de données
  if (userId && user) {
    const fullName = user.firstName + ' ' + user.lastName || '';
    const email = user.emailAddresses[0]?.emailAddress || '';
    await addUserToDatabase(userId, fullName, email);
  }

  return (
    <section className="w-full h-screen flex items-center justify-center flex-col">
      <h1>Bienvenue {user?.firstName} {user?.lastName}</h1>
      <p>Email : {user?.emailAddresses[0]?.emailAddress}</p>
      <SignOutButton />
    </section>
  );
}