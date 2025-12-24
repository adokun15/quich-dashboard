//Create Products;

import React, { useRef, useState } from "react";
//import Input from "../../components/Input";
//import { Button } from "../../components/ui/button";
//import { useAddSingleProductMutation } from "../../state/endpoints/products.js";
//import { Loader } from "../../helper/Loading.js";
//import InputPrice from "../../helper/InputPrice.js";
//import { useVerifyUserQuery } from "../../state/endpoints/user.js";
//import { Dialog, DialogContent, DialogTitle } from "src/components/ui/dialog";
//import { toast } from "sonner";

const AddProduct = ({ uid, link, bank, phone, modal, controlModal }) => {
 
    const token = localStorage.getItem("token");

    /*
    const { role } = useVerifyUserQuery(
        { token },
        {
            skip: !token,
            selectFromResult: ({ data, isLoading, isFetching }) => ({
        role: data?.role || null,
    }),
}
);
*/

  //Inputs
  const productName = useRef();
  const [productPrice, setPrice] = useState();
  const productDesc = useRef();
  const productQty = useRef();

  const [error, setInputError] = useState("");
  // const [charge, setCharge] = useState(0);

  //Add Product to Firebase
  const [addProduct, { isLoading }] = useAddSingleProductMutation();

  //Detect Price
  const priceChange = (e) => {
    const price = +e.target.value;
    if (typeof price !== "number" || isNaN(price)) return;
    setPrice(price);
  };

  //Add product to Db
  const triggerAddProduct = async () => {
    if (
      !productPrice ||
      productName.current.value === "" ||
      !productQty.current.value
    ) {
      setInputError("Invalid Input");
      return;
    }

    if (productName.current.value?.length < 3) {
      setInputError("Product Name is too short!");
      return;
    }

    if (productPrice < 150) {
      setInputError("Price too low. must be greater than 150");
      return;
    }

    if (+productQty.current.value > 500) {
      setInputError("Unit is too high. must be lower than 500");
      return;
    }

    if (!uid || !link || !role) {
      setInputError("Something went wrong. You seems to be logged out!");
      return;
    }

    if (!bank) {
      setInputError("Please add your bank detail to proceed!");
      return;
    }

    if (!phone) {
      setInputError(
        "Please verify and add your WhatsApp phone number to receive notifications!"
      );
      return;
    }

    setInputError("");

    await addProduct({
      // charge,
      uid,
      role,
      data: {
        link,
        name: productName.current.value,
        qty: +productQty.current.value,
        price: productPrice,
        description: productDesc?.current?.value,
      },
    })
      .then(({ data }) => {
        //Close Modal
        controlModal();

        //Alert User
        toast.success(data);
      })
      .catch((e) => {
        if (e?.message === "invalid-argument") {
          setInputError("You have entered a wrong value!");
          return;
        }
        if (e?.message === "permission-denied") {
          setInputError("Access denied. Cannot add another product!");
          return;
        }
        setInputError(e?.message);
      });
  };

  return (
    <Dialog open={modal} onOpenChange={controlModal}>
      <DialogContent>
        <DialogTitle className="font-sans_serif text-center text-3xl">
          Add Product to your store
        </DialogTitle>
        {error && (
          <p className="text-red-700 font-oswald text-start text-[16px] px-4 py-[1px] my-3 ">
            {error}
          </p>
        )}

        <form className="w-full px-2 py-2 space-y-6">
          <label className="space-y-2 block">
            <span>Product Name</span>
            <Input
              required
              clx="w-full font-roboto text-xl"
              placeholder="My product Name"
              ref={productName}
            />
          </label>

          <label className="space-y-1 block">
            <span>Product Price </span>
            <InputPrice
              required
              className="w-full font-roboto text-xl"
              onChange={priceChange}
              value={productPrice}
              placeholder="Min.Amt (NGN 150)"
            />
          </label>

          {/*typeof productPrice === "number" &&
            productPrice >= 150 &&
            !loading && (
              <p className="text-xs my-4">
                You will receive NGN
                {(
                  productPrice -
                  productPrice * (charge && charge / 100)
                ).toFixed(2)}
              </p>
            )*/}

          <label className="space-y-2 block">
            <span>Product Unit</span>
            <Input
              required
              clx="w-full font-roboto text-xl"
              type="number"
              placeholder="Enter quantity of your product"
              ref={productQty}
            />
          </label>
          <label className="space-y-2 block">
            <span className="block">Description (optional)</span>
            <textarea
              className=" border-2 w-full px-3 text-[20px] py-2 block resize-none min-h-[10rem] outline-none rounded focus:shadow"
              ref={productDesc}
              placeholder=" Infowhat your product is"
            ></textarea>
          </label>
          <div className="my-4 flex gap-4 flex-wrap">
            <Button
              variant="ghost"
              onClick={controlModal}
              type="button"
              className="bg-slate-300 text-teal-700"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={triggerAddProduct}
              className="bg-teal-800 text-white"
            >
              {isLoading ? <Loader /> : "Add Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;

