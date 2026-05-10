"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faChevronRight,
  faExternalLink,
  faPlus,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useFormStateData } from "@/utils/state/FormState";
import { ToggleButton } from "./ToggleButton";
import { useState } from "react";
import SearchInput from "./SearchInput";
import { UpdateCategoryDetail } from "@/server/Category/updateCategory";
import { DeleteSingleCategory } from "@/server/Category/DeleteCategory";
import { useDispatch } from "react-redux";
import { ToasterModalToggle } from "@/utils/state/modal/modalSlice";
import ErrorText from "./errorText";

export default function SingleCategory({ category }) {
  //Manage field
  //  const [search, setSearch] = useState("");
  const { handleInputChanges, handleBooleanChanges, updatedField, isDirty } =
    useFormStateData({ oldStateData: category });

  const [state, setState] = useState({
    loading: null,
    error: null,
  });

  const dispatch = useDispatch();

  const isFormDirty = isDirty;

  /*
  //Product
  const [selectedProducts, setSelectedProducts] = useState(
    category?.productlist || [],
  );


  const [newProductset, setNewProductSet] = useState([]);

  //New Set of product
  const toggleProduct = (newproduct) => {
    setNewProductSet((p) => {
      return [...p, newproduct];
    });
  };


  const SaveProductCategory = async () => {
    //Remove to that exist before and save new ones
    let newproduct = [];

    console.log(newProductset);
  };
*/

  //Action
  const EditCategory = async () => {
    if (!isDirty || !updatedField) return;

    setState((p) => ({ ...p, loading: "edit" }));
    //console.log("reached");

    try {
      //Check if the updated Value has an Empty String
      const { error, id } = await UpdateCategoryDetail({
        updates: updatedField,
        category_id: category?.id,
      });

      if (error) {
        setState((p) => ({ loading: null, error: error?.message }));
        return;
      }

      dispatch(
        ToasterModalToggle({
          type: "success",
          title: "Category updated",
        }),
      );

      setState((p) => ({ loading: null, error: "" }));
    } catch (e) {
      console.log(e);
    }
  };

  const DeleteCategory = async () => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setState((p) => ({ ...p, loading: "delete" }));

    const { error } = await DeleteSingleCategory({
      category_id: category?.id,
    });

    if (error) {
      setState((p) => ({ loading: null, error: error?.message }));
      return;
    }

    //tOAST
    dispatch(
      ToasterModalToggle({
        type: "success",
        title: `Category deleted!`,
      }),
    );

    setState((p) => ({ loading: null, error: "" }));
  };

  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">Category</h2>
        </article>

        <article className="flex items-center gap-3">
          <button
            className="text-primary py-1 
                        px-4 space-x-2
                       cursor-pointer rounded-[10px]"
            onClick={() => setEditInputToOpen(false)}
          >
            <FontAwesomeIcon icon={faExternalLink} />
            <span>View</span>
          </button>
          <button
            disabled={state?.loading === "delete"}
            onClick={DeleteCategory}
            className="text-danger  px-2 space-x-2 cursor-pointer rounded"
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
        </article>
      </section>

      <form className=" space-y-4">
        <Card className="space-y-6">
          <ErrorText>{state?.error}</ErrorText>
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
              field_name={"isvisible"}
              cn={handleBooleanChanges}
              defaultState={category?.isvisible}
            />
          </div>
          <article className="flex justify-between">
            <button
              type="button"
              className={`filled_button ${!state?.loading && "opacity-100"} disabled:opacity-60 disabled:text-gray-700`}
              disabled={!isFormDirty || state?.loading === "edit"}
              onClick={EditCategory}
            >
              {state?.loading === "edit" ? (
                <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
              ) : (
                <>
                  <span>Save</span>
                </>
              )}
            </button>
          </article>
        </Card>

        {/*
        <Card className="space-y-4">
          <article className="flex justify-between ">
            <div>
              <h3 className="font-semibold">Products</h3>
              <p className="text-desc text-muted">
                Add product to this category
              </p>
            </div>
            <button className="underline">
              {selectedProducts?.length > 0 &&
                `add ${selectedProducts.length} product(s)`}
            </button>{" "}
          </article>

          <div>
            <SearchInput placeholder="Find product" className="w-full" />
          </div>

          <div>
            <p className="text-muted">Suggested list</p>
            <ul className="space-y-2">
              {products?.map((p) => {
                const isSelected = selectedProducts?.find(
                  (sp) => sp.id === p.id,
                );

                return (
                  <li
                    key={p.id}
                    className="flex gap-x-4 items-center cursor-pointer"
                    onClick={() => toggleProduct(p)}
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="block"
                        checked={isSelected}
                      />
                    </div>
                    <span>{p.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            type="button"
            onClick={SaveProductCategory}
            disabled={selectedProducts?.length === 0}
            className="flex gap-x-3 disabled:opacity-50 items-center border-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span className="font-medium">Add products</span>
          </button>
        </Card>
            */}
      </form>
    </main>
  );
}
