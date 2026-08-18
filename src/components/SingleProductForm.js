"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faPen,
  faShare,
  faSpinner,
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
import { useDispatch } from "react-redux";
import { ToasterModalToggle } from "@/utils/state/modal/modalSlice";

export default function SingleProductForm({ product, getCategoryItem }) {
  //Manage field
  const {
    handleInputChanges,
    handleSelectChanges,
    handleBooleanChanges,
    isDirty,
    //hasEmptyError,
    //hasUpdatedField,
    updatedField,
    newData,
  } = useFormStateData({ oldStateData: product });

  const [state, setState] = useState({
    loading: null,
    error: null,
  });

  const dispatch = useDispatch();

  //Update Product Detail;
  const EditProduct = async () => {
    if (!isDirty) return;

    setState((p) => ({ ...p, loading: "edit" }));

    //Check if the updated Value has an Empty String
    const { error } = await UpdateProductDetail({
      updates: updatedField,
      product_id: product?.id,
    });

    if (error) {
      setState((p) => ({ loading: null, error: error?.message }));
      return;
    }

    dispatch(
      ToasterModalToggle({
        type: "success",
        title: "Product updated",
      }),
    );

    setState((p) => ({ loading: null, error: "" }));
  };
  //Delete Product DETAIL;
  const DeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to remove this product?"))
      return;

    setState((p) => ({ ...p, loading: "delete" }));

    const { error } = await DeleteProductAction({
      product_id: product?.id,
      hasFile: product?.images,
    });

    if (error) {
      setState((p) => ({ loading: null, error: error?.message }));
      return;
    }

    //tOAST
    dispatch(
      ToasterModalToggle({
        type: "success",
        title: "Product deleted successfully",
      }),
    );

    setState((p) => ({ loading: null, error: "" }));
  };

  const ShareOption = () => {};
  return (
    <main className="md:max-w-3xl m-auto space-y-4">
      {/* Other Action */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-medium">Edit Product</h2>

        <div className="flex gap-x-4">
          <button
            onClick={ShareOption}
            className=" py-1 px-4 space-x-2
                                bg-gray-300 
                               cursor-pointer rounded-[10px]"
            //       onClick={() => setEditInputToOpen(false)}
          >
            <FontAwesomeIcon icon={faShare} />
            <span>Share</span>
          </button>
          <button
            onClick={DeleteProduct}
            className="text-danger 
             px-2 space-x-2 bg-danger/40 cursor-pointer rounded"
          >
            {state?.loading === "delete" ? (
              <FontAwesomeIcon icon={faSpinner} />
            ) : (
              <>
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete</span>
              </>
            )}
          </button>{" "}
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
              field="category_id"
              items={getCategoryItem}
              onChangeValue={handleSelectChanges}
              title={
                product?.category_id
                  ? product?.category_info?.name
                  : "Add to a Category"
              }
            />
          </div>
        </Card>

        <Card className="space-y-3">
          <div
            className={`${!newData?.mark_soldout && "border-b"} flex justify-between items-center`}
          >
            <article>
              <p className="text-muted font-medium">Sold Out</p>
              <p className="text-tiny text-muted">Control the quantity left</p>
            </article>

            <ToggleButton
              field_name={"mark_soldout"}
              cn={handleBooleanChanges}
              defaultState={product?.mark_soldout}
            />
          </div>

          {!newData?.mark_soldout && (
            <div className="flex justify-between items-center">
              <p>Inventory </p>
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
          disabled={!isDirty || state?.loading === "edit"}
          onClick={EditProduct}
        >
          {state?.loading === "edit" ? (
            <FontAwesomeIcon icon={faSpinner} />
          ) : (
            <>
              <span>Save</span>
            </>
          )}
        </button>
      </form>
    </main>
  );
}
