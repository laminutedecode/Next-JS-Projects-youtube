
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import {useRouter} from "next/navigation"
interface CardProps {
  data: {
    id:string;
    title: string;
    image: string;
    author: string;
    desc: string;
  };
}

const Card: React.FC<CardProps> = ({ data }) => {

  const router = useRouter()

  return (
    <div onClick={() => router.push("/single/" + data.id)} className="bg-white p-4 rounded-md shadow-md cursor-pointer border hover:translate-y-[-10px] transition-all hover:border-blue-500" >
      <Image alt={data.title} src={data.image} width={400} height={300} className="w-full h-[400px] rounded-md object-cover" />
      <h2 className="text-xl font-bold mt-2">{data.title}</h2>
      <div className="flex items-center gap-2 text-blue-500 text-[14px] my-2">
        <FaUser />
        <p>Autheur: {data.author}</p>
      </div>
      <p className="text-gray-700">{data.desc}</p>
    </div>
  );
};
export default Card;
