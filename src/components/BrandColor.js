import Card from "@/components/card";

export default function BrandColor(){
    return <Card className="">
            <p className="font-medium text-4 my-4">Brand Color</p>
            <div className="flex gap-4 flex-wrap">
              <article>
                <p className="block w-6.5 h-2 bg-black"></p>
              </article>
              <article>
                <p className="block w-6.5 h-2 bg-red-700"></p>
              </article>
              <article>
                <p className="block w-6.5 h-2 bg-amber-400"></p>
              </article>
              <article>
                <p className="block w-6.5 h-2 bg-green-600"></p>
              </article>
              <article>
                <p className="block w-6.5 h-2 bg-cyan-600"></p>
              </article>
              <article>
                <p className="block w-6.5 h-2 bg-blue-600"></p>
              </article>
              <article>
                <p className="block w-6.5 h-2 bg-purple-800"></p>
              </article>
            </div>
          </Card>

}