"use client"

import Form from "../components/Form";


export default function createPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
        <div className="p-6 mt-8 lg:w-[35%] md:w-[50%]">
          <h2 className="text-[30px] text-blue-500 font-black">Ajouter un post</h2>
          <Form />
        </div>
    </div>
  );
}
