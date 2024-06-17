"use client"
import useFirebaseData from "../hooks/useFirebaseData";
import Card from "./Card";

export default function Galerie() {
  const data = useFirebaseData();

  console.log(data);
  

  return (
    <div id="Content" className="max-w-[1200px] m-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item, index) => (
        <Card key={index} data={item} />
      ))}
    </div>
  );
}
