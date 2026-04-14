"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ProductImageUpload from "./ProductImageUpload";
import { useEffect, useState } from "react";
import { UpdateProductDetail } from "@/server/product/UpdateProduct";
import { refresh } from "next/cache";
import { DeleteProductAction } from "@/server/product/DeleteProduct";
import Image from "next/image";
import { useFormStateData } from "@/utils/state/FormState";
import { useRouter } from "next/navigation";

export default function SingleProductForm({ product }) {
  const router = useRouter();

  //Manage field
  const {
    handleInputChanges,
    hasEmptyError,
    isDirty,
    hasUpdatedField,
    updatedField,
  } = useFormStateData({ oldStateData: product });

  const [url, setUrl] = useState(null);

  //Upload Image to Supabase
  const onUpload = async (filepath) => {
    setUrl(`${filepath}`);
    //Edit Product Image to
    console.log(filepath);
  };

  //Remove/Change Image on Supabase
  const onExistingUpload = async (filepath) => {
    setUrl(`${filepath}`);
    //Edit Product Image to
    console.log(filepath);
  };

  //Update Product Detail
  const EditProduct = async () => {
    // if (!isDirty && hasEmptyError) return;

    //Check if the updated Value has an Empty String

    const res = await UpdateProductDetail({
      updates: updatedField,
      product_id: product?.id,
    });

    if (!res.is_success) {
      //Toast message
      console.log("from form", res);
    }

    //Toast message

    //Refresh Product PAGE;
    // router.refresh();
  };

  //Delete Product DETAIL;
  const DeleteProduct = async (id, store_id) => {
    const product = await DeleteProductAction({
      store_id: product?.store_id,
      product_id: product?.id,
    });

    if (product) {
      // Redirect to Products
    }
  };

  return (
    <main>
      {/* Form */}
      <form className=" space-y-4">
        <Card>
          <div>
            {/*hasEmptyError?.field === "name" && (
              <p>Name of product cannot be empty!</p>
            )*/}
            <p>Name</p>
            <input
              onChange={handleInputChanges}
              data-field_name="name"
              defaultValue={product?.name}
            />
          </div>

          <div>
            <p>Price</p>
            <input
              onChange={handleInputChanges}
              data-field_name="price"
              defaultValue={product?.price}
            />
          </div>
        </Card>

        <Card>
          <p>Description</p>
          <textarea
            onChange={handleInputChanges}
            data-field_name="description"
            defaultValue={product?.description}
          ></textarea>
        </Card>

        {product?.category_id && (
          <Card>
            <p>Category: {product?.category_info?.name}</p>
            <button>Change Category</button>
            <button>Remove Category</button>
          </Card>
        )}
        {!product?.category_id && (
          <Card>
            <p>Category: Not In any Category</p>
            <button>Add Category</button>
          </Card>
        )}

        <Card>
          <p>Inventory: {product?.quantity}</p>
          <p>Sold Out: {product?.mark_soldout ? "Yes" : "No"}</p>
        </Card>
        <button
          type="button"
          className="px-4 py-2 rounded disabled:text-muted font-bold  text-white disabled:bg-primary/50 bg-primary transition-colors"
          disabled={!isDirty}
          onClick={EditProduct}
        >
          Save
        </button>
      </form>
    </main>
  );
}
{
  /*

      </div>

      <div
        className={`${
          product?.images && "rounded-full overflow-hidden"
        } w-36 my-4 h-36 `}
      >
        <Image
          height={200}
          width={200}
          src={product?.images ? product?.images[0] : null}
          alt={product?.name}
          className={product?.images && "aspect-square bg-cover"}
        />
      </div>

      <button
        //  onClick={toggleImageUploadModal}
        className="shadow shadow-gray-400 bg-white 
              my-4 text-teal-800 tracking-wider font-bold transition-colors font-oswald duration-500 hover:bg-teal-700 hover:text-white"
      >
        {product?.images ? "Edit Image" : "Add Image"}
      </button>




<div className="md:grid block md:space-y-0 my-6 space-y-4 grid-cols-3 gap-5">
        <article>
          <p className="text-2xl text-teal-700 fira-sans-medium">
            Product Name
          </p>
          <p className="fire-sans-bold tracking-wider text-xl">
            {product?.name}
          </p>
        </article>
        <article>
          <p className="text-2xl text-teal-700 fira-sans-medium">
            Product Price
          </p>
          <p className="font-bold tracking-wider text-xl">
            NGN{product?.price}
          </p>
        </article>
        <article>
          <p className="text-2xl text-teal-700 fira-sans-medium">Unit Left</p>
          <p className="fire-sans-bold tracking-wider text-xl">
            {product?.quantity || "Not available"}
          </p>
        </article>
      </div>


<main className="w-full max-w-xl mx-auto space-y-4">
<section className="flex justify-between">
      <article>
        <h2 className="text-xl font-semibold">Edit Product</h2>
      </article>

      <article className="flex items-center gap-3">
        <button className="text-danger">
          Share <FontAwesomeIcon icon={faChevronDown} />
        </button>

        <button className="bg-danger" onClick={DeleteProduct}>
          Delete
        </button>
      </article>
    </section>

    <ProductImageUpload
      store_id="test_store"
      onUpload={onUpload}
      size={250}
      url={url}
      product_id={product?.id}
    />

    </main>
  */
}
