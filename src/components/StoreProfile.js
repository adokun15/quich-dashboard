import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default async function StoreProfile(params) {
  const store = params.store;

  //const { data, isLoading, isFetching, isError } = useGetMerchantQuery(link, {
  //  fixedCacheKey: "store-merchant",
  //});
  // console.log(store);

  return (
    <>
      {/*!isLoading && !isFetching && !isError && (*/}
      <div
        className="h-fit bg-primary90 mx-4  
       border-3 shadow border-solid px-5 py-4"
      >
        <div className="flex">
          <Image
            src="/favicon.ico"
            width={100}
            height={100}
            className="min-w-fit rounded-full"
            alt="product"
          />
          <div className="grow">
            <h3 className="font-sans_serif md:text-4xl text-3xl text-primary">
              {store?.store_name}
            </h3>
            <p className="text-desc text-muted">{store?.store_category}</p>
          </div>
        </div>

        <article className="text-muted font-medium text-based ">
          {store?.store_bio}
        </article>

        <article className=" flex text-desc items-center gap-4 my-4">
          <p className="grow text-muted font-medium">
            <span className="text-primary">
              <FontAwesomeIcon icon={faDoorOpen} />
            </span>
            <span>Opened</span>
          </p>

          <button className="bg-primary70 py-2 px-6 rounded-full  text-foreground">
            Connect on WhatsApp
          </button>
          <button className="bg-primary py-2 px-6 rounded-full border-border border-2 text-white">
            Join Bland Community
          </button>
        </article>
        {/*<button
          onClick={() => {
            //window.location.href = chatCustomer(data?.phone);
          }}
          className="underline block capitalize"
        >
          
          Can`t find what you are looking for. Contact Seller.
        </button>
          */}
      </div>
    </>
  );
}
