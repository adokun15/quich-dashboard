"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ProductImageUpload from "./ProductImageUpload";
import { useState } from "react";

export default function SingleProductForm() {
  const [url, setUrl] = useState(null);

  const onUpload = (filepath) => {
    setUrl(`${filepath}`);
    //Edit Product Image to
    console.log(filepath);
  };
  return (
    <main className="w-full max-w-xl mx-auto space-y-4">
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">Edit Product</h2>
        </article>

        <article className="flex items-center gap-3">
          <button className="text-danger">
            Share <FontAwesomeIcon icon={faChevronDown} />
          </button>

          {/* Edit, View , Delete */}
          <button className="text-danger">...</button>
        </article>
      </section>

      <ProductImageUpload
        store_id="test_store"
        onUpload={onUpload}
        size={250}
        url={url}
        product_id={"product_1"}
      />

      <form className=" space-y-4">
        <Card>
          <div>
            <p>Name</p>
            <input />
          </div>

          <div>
            <p>Type</p>
            {/* Selector */}
            <input />
          </div>

          <div>
            <p>Price</p>
            <input />
          </div>
        </Card>

        <Card>
          <p>Description</p>
          <textarea></textarea>
        </Card>

        <Card>
          <p>Add Images</p>
          <input />
        </Card>

        <Card>
          <p>Category</p>
          <button>Select Category</button>
        </Card>

        <Card>
          <p>Inventory</p>
        </Card>
        <button>Save</button>
      </form>
    </main>
  );
}
