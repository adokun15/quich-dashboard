//ADD NEW PRODUCTS

import Card from "@/components/card";
import NavigateDashborad from "@/components/NavigateDashboard";
import Link from "next/link";

export default function CreateProductPage() {
  return (
    <>
      <NavigateDashborad />
      <main className="max-w-3xl space-y-6 py-1 mx-auto min-h-screen">
        <Link href="/products">Back</Link>
        <h2>Create new Product</h2>

        <form>
          <Card className=" px-0">
            <label>Product Name</label>
            <input />

            <label>Product Description</label>
            <input />

            <label>Price</label>
            <input />

            <label>Availability</label>
            <input />

            <label>Product Image</label>
            <input />
          </Card>
          <button>Create</button>
        </form>
      </main>
    </>
  );
}
