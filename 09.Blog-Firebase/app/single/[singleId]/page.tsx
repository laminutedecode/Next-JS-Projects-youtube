"use client"

import {useState, useEffect} from "react"
import useFirebaseData, {PostData} from "@/app/hooks/useFirebaseData";
import {useRouter} from "next/navigation"
import { FaArrowLeft } from "react-icons/fa6";


interface ArticleDetailsProps {
  params: {
    singleId: string
  }
}

export default function SinglePage({params}: ArticleDetailsProps) {


  const router = useRouter()
  const [articleDetails, setArticleDetails] = useState<PostData | null>(null);
  const articlesData = useFirebaseData();

  useEffect(()=> {
      if(params && params.singleId && articlesData.length > 0){
          const article = articlesData.find((item) => item.id === params.singleId);
          if(article){
            setArticleDetails(article)
          }else {
            console.log('Une erreur est survenue')
          }
      }
  }, [params, articlesData])


  console.log(articleDetails)

  return (
    <div className="w-full  pt-20">
        {articleDetails && (
          <div className="bg-[#f1f1f1] max-w-[1200px] m-auto p-3 md:p-12 md:px-24 lg:px-36">
              <FaArrowLeft className="text-[50px] cursor-pointer rounded-full p-2 bg-blue-500 text-white hover:scale-105 transition-all mb-5" onClick={()=> router.back()} />
              <img src={articleDetails?.image} alt="" className="w-[900px] h-[600px] object-cover" />
              <h1 className="text-blue-700 font-black text-4xl mt-3">{articleDetails?.title} </h1>
              <span className="text-blue-500 text-[14px]">{articleDetails?.author} </span>
              <p className="mt-2">{articleDetails?.desc} </p>
          </div>
        )}
    </div>
  );
}
