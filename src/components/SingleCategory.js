"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useFormStateData } from "@/utils/state/FormState";
import { ToggleButton } from "./ToggleButton";
import { useState } from "react";

export default function SingleCategory({ category, products }) {
  //Manage field

  const [search, setSearch] = useState("");

  const [selectedProducts, setSelectedProducts] = useState(
    category?.productlist || [],
  );

  const [addedProducts, setAddedProducts] = useState([]);
  const [removedProducts, setRemovedProducts] = useState([]);
  const {
    handleInputChanges,
    handleSelectChanges,
    handleBooleanChanges,
    isDirty,
    updatedField,
    newData,
  } = useFormStateData({ oldStateData: category });

  const toggleProduct = (product) => {
    const exists = selectedProducts.find((p) => p.id === product.id);

    if (exists) {
      // remove
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));

      // track removal (only if originally existed)
      if (category?.productlist.find((p) => p.id === product.id)) {
        setRemovedProducts((prev) => [...prev, product.id]);
      }

      // remove from added if user reverts
      setAddedProducts((prev) => prev.filter((id) => id !== product.id));
    } else {
      // add
      setSelectedProducts((prev) => [...prev, product]);

      // track addition (only if not originally in category)
      if (!category?.productlist?.find((p) => p.id === product.id)) {
        setAddedProducts((prev) => [...prev, product.id]);
      }

      // remove from removed if user reverts
      setRemovedProducts((prev) => prev.filter((id) => id !== product.id));
    }
  };

  const filteredProducts = products?.filter((p) =>
    p?.name.toLowerCase().includes(search.toLowerCase()),
  );

  const hasProductChanges =
    addedProducts.length > 0 || removedProducts.length > 0;

  const isFormDirty = isDirty || hasProductChanges;

  //Action
  const EditCategory = async () => {
    const payload = {
      ...newData, // name, visibility etc
      addedProducts,
      removedProducts,
    };

    console.log(payload);

    // send to API
  };
  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">Category</h2>
        </article>

        <article className="flex items-center gap-3">
          {/* Edit, View Order, Delete */}
          <button className="text-danger">View</button>
          <button className="text-danger">Share</button>
        </article>
      </section>

      <form className=" space-y-4">
        <Card className="space-y-6">
          <div>
            <p>Name</p>
            <input
              placeholder="Enter category name"
              maxLength={20}
              onChange={handleInputChanges}
              className="min-w-full"
              data-field_name="name"
              defaultValue={category?.name}
            />
          </div>

          <div className="flex justify-between items-center">
            <p>Visibility</p>
            <ToggleButton
              field_name={"invisible"}
              cn={handleBooleanChanges}
              defaultState={category?.invisible}
            />
          </div>
        </Card>

        <Card className="space-y-3">
          <article className="flex justify-between ">
            <div>
              <h3 className="font-semibold">Products</h3>
              <p className="text-desc text-muted">
                Add product to this category
              </p>
            </div>
            <button className="underline">
              Total {selectedProducts.length}
            </button>{" "}
          </article>

          {/* search */}
          <div>
            <input
              placeholder="Find product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>

          {/* product list */}
          <div>
            <ul className="space-y-2">
              {filteredProducts?.map((p) => {
                const isSelected = selectedProducts?.find(
                  (sp) => sp.id === p.id,
                );

                return (
                  <li
                    key={p.id}
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleProduct(p)}
                  >
                    <span>{p.name}</span>

                    {isSelected ? (
                      <FontAwesomeIcon icon={faChevronDown} />
                    ) : (
                      <FontAwesomeIcon icon={faChevronRight} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Card>
      </form>
      <article className="flex justify-between">
        <button
          type="button"
          className="filled_button disabled:opacity-60 disabled:text-gray-700"
          disabled={!isFormDirty}
          onClick={EditCategory}
        >
          Save
        </button>
        <button>Delete</button>
      </article>
    </main>
  );
}
