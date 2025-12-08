import { getUser } from "@/server/user/GetUser";
import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
export default async function Home() {
  const user = await getUser();

  return (
    <>
      <NavigateDashborad />
      <div className="max-w-3xl space-y-6 py-1 mx-auto min-h-screen dark:bg-black">
        <Card className="">
          <p className="text-4 font-medium">Total Products</p>

          <h1 className="text-6">0</h1>

          <div className="flex mt-4 gap-4">
            <button>View Store</button>
            <button>Add Product</button>
          </div>
        </Card>

        <Card className=" ">
          <p className="font-medium text-4 my-4">Store</p>

          <div className="flex w-full gap-4 ">
            <div>
              <div className="bg-teal-300 h-[100px] flex w-[100px] justify-center items-center  rounded-full ">
                <p className="text-[48px] ">D</p>
              </div>
            </div>

            <div className="w-full space-y-4">
              <label>Store Name</label>
              <input
                className="border-2 ring-1 
                ring-offset-1 hover:shadow-teal-100 focus:outline-none 
                focus:ring-offset-2 transition duration-200 ring-teal-800 
                border-teal-600 px-3 py-1 rounded w-full "
                placeholder="The store name"
                defaultValue={"The store name"}
              />

              <label>Description</label>
              <textarea
                className="border-2 ring-1 min-h-32
                ring-offset-1 hover:shadow-teal-100 focus:outline-none 
                focus:ring-offset-2 transition duration-200 ring-teal-800 
                border-teal-600 p-1 rounded w-full "
                placeholder="Store Description: Talk about your business, where you are located or maybe where you deliver"
                defaultValue={"The store name"}
              />
            </div>
          </div>
        </Card>

        <Card className="">
          <div>
            <p className="font-medium text-4 my-4">Opening & closing hours</p>
          </div>

          <div>
            <article>
              <p>Monday</p>
              <div className="flex gap-3">
                <input type="time" />
                -
                <input type="time" />
              </div>
            </article>
            <article>
              <p>Tuesday</p>
              <div className="flex gap-3">
                <input type="time" />
                -
                <input type="time" />
              </div>
            </article>
            <article>
              <p>Wednesday</p>
              <div className="flex gap-3">
                <input type="time" />
                -
                <input type="time" />
              </div>
            </article>
            <article>
              <p>Thursday</p>
              <div className="flex gap-3">
                <input type="time" />
                -
                <input type="time" />
              </div>
            </article>
            <article>
              <p>Friday</p>
              <div className="flex gap-3">
                <input type="time" />
                -
                <input type="time" />
              </div>
            </article>
            <article>
              <p>Saturday</p>
              <div className="flex gap-3">
                <input type="time" />
                -
                <input type="time" />
              </div>
            </article>
            <article>
              <p>Sunday</p>
              <div className="flex gap-3">
                <input type="time" />
                -
                <input type="time" />
              </div>
            </article>
          </div>
        </Card>

        <Card className="">
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

        <Card className="">
          <p className="font-medium text-4 my-4">
            Video header <span className="">Growth plan</span>
          </p>
          <p>
            Include a short 90seconds video to your store profile, showcase how
            your product works to your customer
          </p>

          <input type="file" />
          <button>Save Upload</button>
        </Card>

        <Card className="">
          <p className="font-medium text-4 my-4">Whatsapp Community</p>
          <p>Add community link to interact with your customers</p>
          <input type="text" />
          <button>Save</button>
        </Card>
      </div>
    </>
  );
}
