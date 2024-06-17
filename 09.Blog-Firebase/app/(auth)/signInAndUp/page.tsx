"use client"
import {useState, ChangeEvent} from "react"
import { FaGoogle } from "react-icons/fa";
import * as Yup from "yup"
import useClientAuth from "@/app/hooks/useClientAuth";

interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email("Format email non valide").required("Champs requis"),
  password: Yup.string().required("Champs requis"),
})


export default function signInAndUpPage() {

  const {user, isFetch, signUp, signIn, redirectIfAuthenticated, loginWithGoogle} = useClientAuth()
  const [isSignUpActive, setIsSignUpActive] = useState(false)
  const [formData, setFormData] = useState<FormData>({email: "", password: ""})
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleFormChange = ()=> {
    setIsSignUpActive(!isSignUpActive);
    setFormData({email: '', password: ''})
    setErrors({})
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevData)=> ({
      ...prevData, [name]: value
    }))
  }

  const handleSignUp = ()=> {
    schema.validate(formData, {abortEarly: false})
    .then(()=> {
      signUp(formData.email, formData.password)
    })
    .catch((validationErrors: Yup.ValidationError) => {
      const formattedErrors: Partial<FormData> = {}
      validationErrors.inner.forEach(error => {
        formattedErrors[error.path as keyof FormData] = error.message
      });
      setErrors(formattedErrors)
    })
  }
  const handleSignIn = ()=> {
    schema.validate(formData, {abortEarly: false})
    .then(()=> {
      signIn(formData.email, formData.password)
    })
    .catch((validationErrors: Yup.ValidationError) => {
      const formattedErrors: Partial<FormData> = {}
      validationErrors.inner.forEach(error => {
        formattedErrors[error.path as keyof FormData] = error.message
      });
      setErrors(formattedErrors)
    })
  }

  if (isFetch){
    return <h2>En cours de chargement</h2>
  }

  redirectIfAuthenticated();




  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2">
       <form className="max-w-[800px] flex flex-col gap-2 bg-white p-5 rounded-md shadow-md">

        {isSignUpActive ? (
          <h1 className="text-center text-blue-500 text-4xl mb-3 font-bold">Inscription</h1>
        ): (    
          <h1 className="text-center text-blue-500 text-4xl mb-3 font-bold">Connexion</h1>
        )}

        <label className="text-blue-500">Email</label>
        <input type="email" onChange={handleInputChange} value={formData.email} name="email" className="h-10 border border-blue-500 rounded-md p-4" />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <label className="text-blue-500">Password</label>
        <input type="password" onChange={handleInputChange} value={formData.password} name="password" className="h-10 border border-blue-500 rounded-md p-4" />
         {errors.email && <p className="text-red-500">{errors.email}</p>}


        {isSignUpActive ? (
          <button onClick={handleSignUp} type="button" className="bg-blue-500 px-3 py-1.5 text-white my-3 rounded-md hover:bg-blue-700">S'inscrire</button>
        ): (    
          <button onClick={handleSignIn} type="button" className="bg-blue-500 px-3 py-1.5 text-white my-3 rounded-md hover:bg-blue-700">Se connecter</button>
        )}

        {isSignUpActive ? (
          <a onClick={handleFormChange} href="#" className="text-red-500 hover:text-red-700">Deja inscrit ? Se connecter</a>
        ): (    
          <a onClick={handleFormChange} href="#" className="text-red-500 hover:text-red-700">Pas de compte ? Inscrivez-vous maintenant</a>
        )}

       </form>

       <button onClick={loginWithGoogle} type="button" className="mt-5 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 p-2 flex items-center gap-2">
        <FaGoogle />
        <span>{isSignUpActive ? "Inscription via Google" : "Se connecter via Google"}</span>
       </button>
    </section>
  );
}
