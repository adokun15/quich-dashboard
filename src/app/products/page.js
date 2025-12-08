import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import { getProducts } from "@/server/product/GetProducts";

//Product list Page:
export default async function ProductsPage() {
  const products = await getProducts("store_id");

  //Cu
  if (products?.statusCode === 500) {
    return (
      <main>
        <NavigateDashborad />
        <p>{products?.message}</p>
      </main>
    );
  }

  return (
    <>
      <NavigateDashborad />
      <main className="max-w-3xl space-y-6 py-1 mx-auto min-h-screen">
        <div className="flex gap-2">
          <input className="" placeholder="Search product by name" />
          <button className="text-nowrap">+ Add</button>
        </div>
        <Card className="ring-highlight ring-2 ring-offset-1 py-1 rounded-full px-0">
          <div className="px-4  py-2 flex items-center justify-between">
            <div>
              <p className="text-4 font-semibold">ITEMS</p>
            </div>

            <div className="flex gap-3">
              <p>Soldout?</p>
              <p>Action</p>
            </div>
          </div>
        </Card>

        <Card className="px-0">
          <div className="divide-y-2">
            {products &&
              products?.map((product) => (
                <div
                  className="px-4  py-2 flex items-center justify-between"
                  key={product?.productId}
                >
                  <div>
                    <p className="text-4 font-medium">{product?.name}</p>
                    <p className="text-2">NGN400</p>
                  </div>

                  <div className="flex gap-3">
                    <p>Yes</p>
                    <p>Edit</p>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <p>
            Total product: <span className="text-xl font-semibold">3 / 30</span>
          </p>

          <div className="flex gap-x-4">
            <button>prev</button>
            <button>next</button>
          </div>
        </div>
      </main>
    </>
  );
}
