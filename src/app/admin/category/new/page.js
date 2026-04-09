"use client";

import Card from "@/components/card";
import { AddNewCategory } from "@/server/Category/createCategory";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function CreateCategory() {
  const nameRef = useRef();

  const router = useRouter();

  const [state, setState] = useState({
    loading: "",
    error: "",
  });

  //Create Category
  const createCategory = async () => {
    const category = await AddNewCategory({ name: nameRef.current.value });
    if (category.error) {
      //Do Error Check here!
    }
    //Success Alert

    router.push(`/admin/category/${category}`);
  };

  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      <article>
        <h2 className="text-xl font-semibold">Category</h2>
      </article>

      <form className=" space-y-4">
        <Card>
          <div>
            <p>Name</p>
            <input ref={nameRef} placeholder="Enter Category Name" />
          </div>
          <button type="button" onClick={createCategory}>
            Create Category
          </button>
        </Card>

        {/*
        <Card className="space-y-3">
              <article>
                <h3 className="font-semibold">Products</h3>
                <p className="text-desc text-muted">Add product to this category</p>
              </article>
              <div>
                <ul className="list-disc text-based">
                  <li className="">
                    <p>Milk</p>
                  </li>
                  <li>
                    <p>Cowbell</p>
                  </li>
                </ul>
              </div>
              <button className="underline">Add Product</button>
            </Card>
        */}
      </form>
    </main>
  );
}
