import Canvas from "@/components/canvas";
import Toolbar from "@/components/toolbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-900">
      <h3>Hello world</h3>
      <div className="w-full h-full fixed">
        <Toolbar />
        <Canvas />
      </div>
    </main>
  );
}
