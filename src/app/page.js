import { getUser } from "@/server/user/GetUser";
import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import Sidebar from "@/components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { TextAreaInput, TextInput, TimeInput } from "@/components/input";
import { Avatar, EditableAvatar } from "@/components/Avatar";
import { Select } from "@/components/select";
export default async function Home() {
  const user = await getUser();

  return (
    <>
      <NavigateDashborad />

      <main className="bg-green-50 px-6 py-2 rounded flex max-w-7xl gap-x-16 mx-auto ">
        <Sidebar />
        <div className=" space-y-6 py-1 min-h-screen dark:bg-black">
          <Card className="">
            <p className="text-4 font-medium">Total Products</p>

            <h1 className="text-6">0</h1>

            <div className="flex mt-4 gap-4">
              <button className="">
                <FontAwesomeIcon className="" icon={faArrowAltCircleUp} />
                View Store
              </button>
              <button>
                <FontAwesomeIcon className="" icon={faCirclePlus} />
                Add Product
              </button>
            </div>
          </Card>

          <Card className="space-y-6">
            <p className="font-medium text-4 my-4">Store</p>

            <div className="flex w-full gap-4 ">
              <EditableAvatar />

              <div className="w-full space-y-4">
                <label>Store Name</label>
                <TextInput
                  placeholder="The store name"
                  defaultValue={"The store name"}
                />

                <label>Business Type</label>
                <Select />

                <label>Description</label>
                <TextAreaInput placeholder="Store Description: Talk about your business, where you are located or maybe where you deliver" />
              </div>
            </div>

            <button className="px-6 mx-auto block">Save</button>
          </Card>

          <Card className="space-y-6">
            <div className="my-4">
              <p className="font-medium text-4 ">Opening & closing hours</p>
              <Select />
            </div>

            <div className="flex flex-wrap gap-4">
              <article>
                <p>Monday</p>
                <TimeInput />
              </article>

              <article>
                <p>Tuesday</p>
                <TimeInput />
              </article>
              <article>
                <p>Wednesday</p>
                <TimeInput />
              </article>
              <article>
                <p>Thursday</p>
                <TimeInput />
              </article>
              <article>
                <p>Friday</p>
                <TimeInput />
              </article>
              <article>
                <p>Saturday</p>
                <TimeInput />
              </article>
              <article>
                <p>Sunday</p>
                <TimeInput />
              </article>
            </div>
            <button>Save</button>
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
              Include a short 90seconds video to your store profile, showcase
              how your product works to your customer
            </p>

            <input type="file" />
            <button>Save Upload</button>
          </Card>

          <Card className="">
            <p className="font-medium text-4 my-4">Whatsapp Community</p>
            <p>Add community link to interact with your customers</p>
            <TextInput />
            <button>Save</button>
          </Card>
        </div>
      </main>
    </>
  );
}
