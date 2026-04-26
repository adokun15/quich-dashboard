"use client";

import Card from "@/components/card";
import { AddNewCategory } from "@/server/Category/createCategory";
import { useActionState } from "react";

export default function CreateCategory() {
  const [state, action, pending] = useActionState(AddNewCategory, false);

  const { error } = state;
  //convert array to object

  console.log(error);
  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      <article>
        <h2 className="text-xl font-medium">Category</h2>
      </article>

      <form action={action} className="space-y-4">
        <Card className="space-y-4">
          <div className="">
            <p className="text-muted font-medium">Name</p>
            <input
              name="category"
              className="w-full"
              placeholder="Enter Category Name"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="disabled:opacity-50  bg-primary px-6 py-2 rounded-xl"
          >
            {pending ? "Creating..." : "Create Category"}
          </button>
        </Card>
      </form>
    </main>
  );
}
