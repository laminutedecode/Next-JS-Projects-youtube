import { useState, useEffect } from "react";
import { db } from "../db/configFirebase";
import { collection, getDocs } from "firebase/firestore";

export interface PostData {
  id: string; 
  title: string;
  image: string;
  author: string;
  desc: string;
}

const useFirebaseData = (): PostData[] => {
  const [data, setData] = useState<PostData[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const newData: PostData[] = [];
        querySnapshot.forEach((doc) => {
          newData.push({ id: doc.id, ...doc.data() } as PostData); 
        });
        setData((prevData) => {
          const newDataWithoutDuplicates = newData.filter((newItem) =>
            !prevData.some((prevItem) => prevItem.id === newItem.id)
          );
          return [...prevData, ...newDataWithoutDuplicates];
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getData();

    return () => setData([]);
  }, []);

  return data;
};

export default useFirebaseData;
