import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <main className="h-full w-full flex justify-center items-center ">
        <VideoPlayer />
      </main>
    </div>
  )
}
