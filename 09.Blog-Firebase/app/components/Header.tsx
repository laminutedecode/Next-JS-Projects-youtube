

export default function Header() {
  return (
    <header className="h-[70vh] bg-cover bg-center" style={{backgroundImage: "url('/home.jpg')"}}>
      <div className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center flex-col">
        <h2 className="text-6xl md:text-8xl font-bold text-white">Blog</h2>
        <div className="bg-white my-2 w-[2px] h-[100px]"></div>
        <a href="#content" className="bg-blue-500 hover:bg-blue-700 p-2 rounded-md text-white font-bold">Voir les articles</a>
      </div>

    </header>
  )
}
