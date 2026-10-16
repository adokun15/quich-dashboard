import Card from "@/components/card";

export default function LoadingSingleProduct() {
  return (
    <main className="md:max-w-3xl m-auto space-y-4">
      <div className="flex justify-between items-center px-4">
        <h2 className="px-4 py-4 bg-gray-300 animate-pulse"></h2>

        <div className="flex gap-x-4">
          <div className=" py-4 px-4 bg-gray-300 rounded-[10px]"></div>
          <div className=" py-4 px-4 bg-gray-300 rounded-[10px]"></div>
        </div>
      </div>

      {/* Form */}
      <form className=" space-y-4">
        <Card className="space-y-4">
          <div>
            {/*hasEmptyError?.field === "name" && (
              <p>Name of product cannot be empty!</p>
            )*/}

            <input />
          </div>

          <div>
            <input />
          </div>
        </Card>

        <Card>
          <textarea></textarea>
        </Card>

        {/*Image Skeleton */}

        <Card className="">
          <div className="flex justify-between items-center"></div>

          <div className=" "></div>
        </Card>

        <Card className="space-y-3">
          <div className={`flex justify-between items-center`}>
            <article></article>
          </div>

          <div className="flex justify-between items-center"></div>
        </Card>
        <button type="button"></button>
      </form>
    </main>
  );
}
