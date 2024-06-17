import {useState, useEffect} from 'react'
import {db, storage} from "../db/configFirebase"
import {doc, collection, setDoc} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Toasts from './Toasts'
import {useRouter} from "next/navigation"

interface FormData {
  title?: string;
  desc?: string;
  author?: string;
}


export default function Form() {

  const [inputs, setInputs] = useState<FormData>({})
  const [showToast, setShowToast] = useState<boolean>(false)
  const [file, setFile] = useState<File | undefined>()
  const [submit, setSubmit] = useState<boolean>(false)


  const router = useRouter()

  useEffect(()=> {
      if(submit){
        savePost()
        router.push('/')
      }
  }, [submit])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setInputs((prevInputs)=> ({...prevInputs, [name]: value}))
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
  e.preventDefault();
  setShowToast(true);
  if(file){
    const storageRef = ref(storage, "images/"+ file?.name);
    uploadBytes(storageRef, file).then(()=> {
      getDownloadURL(storageRef).then(async (url)=> {
        setInputs((prevInputs) => ({...prevInputs, image: url}));
        setSubmit(true)
      })
    })
  }
}


  const savePost = async ()=> {
    const docRef = doc(collection(db, "posts"))
    await setDoc(docRef, inputs)
  }

  return (
    <div className='mt-4'>

      {showToast && (
        <div className='absolute top-10 right-10'>
            <Toasts msg="Post créer avec succes" closeToast={()=> setShowToast(false)} />
        </div>
      )}


        <form onSubmit={handleSubmit}>
            <input 
              type="text"
              name='title'
              placeholder='Titre'
              required
              onChange={handleChange}
              className='w-full mb-4 border-[1px] p-2 rounded-md'
            />
            <textarea 
              name='desc'
              placeholder='Description'
              required
              onChange={handleChange}
              className='w-full mb-4 border-[1px] p-2 rounded-md'
            />
            
            <input 
              type="text"
              name='author'
              placeholder='Auteur'
              required
              onChange={handleChange}
              className='w-full mb-4 border-[1px] p-2 rounded-md'
            />
            <input 
              type="file"
              name='file'
              required
              accept='image/gif, image/jpeg, image/png'
              onChange={(e)=> setFile(e.target.files?.[0])}
              className='w-full mb-4 border-[1px] p-2 rounded-md'
            />

            <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md">
              Créer un post
            </button>
            
        </form>


    </div>
  )
}
