export default async function StoreProfile(params) {
  const store = params.store;

  //const { data, isLoading, isFetching, isError } = useGetMerchantQuery(link, {
  //  fixedCacheKey: "store-merchant",
  //});
  // console.log(store);

  return (
    <>
      {/*!isLoading && !isFetching && !isError && (*/}
      <div className="h-fit md:w-[30%] my-10 rounded-2xl mx-4 space-y-5  border-3 border-2 shadow border-solid px-5 py-4">
        {/*data?.logo && (
            <div>
              <Image
                src={data?.logo}
                width={100}
                height={100}
                className="rounded-full"
                alt="product"
              />
            </div>
          )*/}
        <h3 className="font-sans_serif lg:text-5xl md:text-4xl text-3xl text-teal-800">
          My Business name
        </h3>
        <div className="text-slate-400 space-y-2 my-4">
          <article className="flex gap-5 ">
            <p className="">Shopping & Retails</p>
          </article>
          <article className=" my-4">Buy stuff with no regret!</article>
        </div>
        <article className=" my-4">active</article>
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
