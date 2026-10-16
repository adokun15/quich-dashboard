"use client";
import Card from "@/components/card";
import { CreateProductAction } from "@/server/product/CreateProduct";
import { useActionState } from "react";

export default function NewProductPage() {
  const [state, action, pending] = useActionState(CreateProductAction, false);

  const { error } = state;

  //convert array to object

  return (
    <main className="md:max-w-3xl m-auto">
      <h2 className="text-xl font-medium">Create Product</h2>

      <form action={action} className=" space-y-4">
        <Card className="space-y-4">
          {}
          <div>
            <p>Name</p>
            <input
              placeholder="Enter your product name"
              maxLength={30}
              name="name"
            />
          </div>

          <div>
            <p>Price</p>
            <input placeholder="Enter your Price" maxLength={7} name="price" />
          </div>
        </Card>

        <Card>
          <p>Description (optional)</p>
          <textarea
            placeholder="What does your product do?"
            maxLength={500}
            name="desc"
          ></textarea>
        </Card>

        <Card>
          <div>
            <p>Quantity (optional)</p>
            <input
              placeholder="Enter the amount of stock left"
              maxLength={1000}
              type="number"
              name="quantity"
            />
          </div>
        </Card>

        <button
          type="submit"
          disabled={pending}
          className="filled_button disabled:opacity-60 disabled:text-gray-700"
        >
          {pending ? "Creating..." : "Create"}
        </button>
      </form>
    </main>
  );
}
