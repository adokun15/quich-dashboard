"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ProductImageUpload from "./ProductImageUpload";
import { useEffect, useState } from "react";
import { UpdateProductDetail } from "@/server/product/UpdateProduct";
import { refresh } from "next/cache";
import { DeleteProductAction } from "@/server/product/DeleteProduct";
import Image from "next/image";
import { useFormStateData } from "@/utils/state/FormState";
import { useRouter } from "next/navigation";
import { ToggleButton } from "./ToggleButton";
import { SelectActionButton, SelectForm } from "./select";

export default function SingleProductForm({ product, getCategoryItem }) {
  const router = useRouter();

  //Manage field
  const {
    handleInputChanges,
    handleSelectChanges,
    hasEmptyError,
    handleBooleanChanges,
    isDirty,
    hasUpdatedField,
    updatedField,
    newData,
  } = useFormStateData({ oldStateData: product });

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
  const DeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to remove this product?"))
      return;

    const res = await DeleteProductAction({
      product_id: product?.id,
      hasFile: product?.images,
    });

    //rEdirect to /products
    console.log(res);

    //aLERT TO USER
    router.push("/admin/products");
  };

  const closeModal = () => {};
  return (
    <main className="md:max-w-3xl m-auto">
      {/* Other Action */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Edit Product</h2>

        <div className="flex gap-x-4">
          <SelectActionButton title="Action" action_display={closeModal}>
            <button id="share_button">Share Product</button>
          </SelectActionButton>

          <button onClick={DeleteProduct}>Delete</button>
        </div>
      </div>

      {/* Form */}
      <form className=" space-y-4">
        <Card className="space-y-4">
          <div>
            {/*hasEmptyError?.field === "name" && (
              <p>Name of product cannot be empty!</p>
            )*/}
            <p>Name</p>
            <input
              placeholder="Enter your product name"
              maxLength={30}
              onChange={handleInputChanges}
              data-field_name="name"
              defaultValue={product?.name}
            />
          </div>

          <div>
            <p>Price</p>
            <input
              placeholder="Enter your Price"
              maxLength={7}
              onChange={handleInputChanges}
              data-field_name="price"
              defaultValue={product?.price}
            />
          </div>
        </Card>

        <Card>
          <p>Description</p>
          <textarea
            placeholder="What does your product do?"
            maxLength={500}
            onChange={handleInputChanges}
            data-field_name="description"
            defaultValue={product?.description}
          ></textarea>
        </Card>

        <ProductImageUpload
          store_id={product?.store_id}
          product_id={product?.id}
          imgUrl={product?.images}
        />

        <Card className="">
          <div className="flex justify-between items-center">
            <p>Category</p>
          </div>

          <div className=" ">
            {/* <input
                disabled={true}
                className="disabled:cursor-not-allowed"
                value={product?.category_info?.name}
              /> */}
            <SelectForm
              items={getCategoryItem}
              onChangeValue={handleSelectChanges}
              title={
                product?.category_id
                  ? product?.category_info?.name
                  : "Add to a Category"
              }
              // items={["Category 1", "Category 2", "Category 3"]}
              // hasSearch="Enter category name"
            />
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center">
            <p>Sold Out</p>
            <ToggleButton
              field_name={"mark_soldout"}
              cn={handleBooleanChanges}
              defaultState={product?.mark_soldout}
            />
          </div>

          {!newData?.mark_soldout && (
            <div>
              <p>Inventory: </p>
              <input
                placeholder="Enter the amount of stock left"
                maxLength={1000}
                onChange={handleInputChanges}
                data-field_name="quantity"
                defaultValue={product?.quantity}
              />
            </div>
          )}
        </Card>
        <button
          type="button"
          className="filled_button disabled:opacity-60 disabled:text-gray-700"
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
