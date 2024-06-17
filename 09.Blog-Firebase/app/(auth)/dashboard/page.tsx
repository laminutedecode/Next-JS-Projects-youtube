"use client"

import { signOut } from "firebase/auth";
import {useRouter} from "next/navigation"
import {useEffect} from "react"
import {auth} from "../../db/configFirebase"
import useClientAuth from "@/app/hooks/useClientAuth";


export default function DashboardPage() {


  const {user, redirectIfAuthenticated} = useClientAuth()

  useEffect(()=> {
    redirectIfAuthenticated()
  }, [user])

  const router = useRouter()

  const handleSignOut = ()=> {
    signOut(auth)
    router.push('/')
  }

  return (
    <>
      {user && (
        <div className="w-full h-screen flex items-center justify-center flex-col">
             <h1 className="text-4xl font-black text-blue-500">Dashboard Page</h1>
             <p><b>Votre email:</b> {user?.email}</p>
             <button onClick={handleSignOut} className="block py-1.5 bg-blue-500 px-3 text-white rounded-md hover:bg-blue-700">Déconnexion</button>
        </div>
      )}
    </>
  );
}
