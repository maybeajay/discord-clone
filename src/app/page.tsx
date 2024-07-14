import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const state = true;
export default function Home() {
  return (
   <div className="bg-red-500 w-full min-h-screen flex flex-col gap-5 items-center justify-center">
    <h1 className="text-white text-bold font-medium  text-3xl">Ajay</h1>
    <Button variant={"outline"} size={'lg'}
    >Hello</Button>
   </div>
  );
}
