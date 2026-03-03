/*import { useRef, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Loader } from "@/helper/Loading.jsx";
import { useUpdateSingleProductMutation } from "@/state/endpoints/products.js";
import Input from "@/components/Input.jsx";
import InputPrice from "@/helper/InputPrice.jsx";
import { useVerifyUserQuery } from "@/state/endpoints/user.js";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.jsx";

export function EditInventory({
  prevData,
  link,
  bank,
  phone,
  modal,
  controlModal,
}) {
  const token = localStorage.getItem("token");
  const { role } = useVerifyUserQuery(
    { token },
    {
      skip: !token,
      selectFromResult: ({ data, isLoading, isFetching }) => ({
        loading: isFetching || isLoading,
        role: data?.customClaims?.role || null,
      }),
    }
  );

  //Inputs
  const newProductName = useRef();
  const newProductQty = useRef();
  const [newProductPrice, setPrice] = useState("");
  const newProductDesc = useRef();

  //Add Product to Firebase
  const [editProduct, { isLoading }] = useUpdateSingleProductMutation({
    fixedCacheKey: "edit-inventory-data",
  });

  const [errorMes, setErrorMes] = useState("");

  //DetectPrice
  const priceChange = (e) => {
    const price = +e.target.value;
    if (typeof price !== "number" || isNaN(price)) return;
    setPrice(price);
  };

  //Add product to Db
  const triggerEditProduct = async () => {
    let updateItem = {};

    if (newProductName.current.value !== "") {
      updateItem.productName = newProductName.current.value;
    }

    if (newProductDesc.current.value !== "") {
      updateItem.description = newProductDesc.current.value;
    }

    if (newProductPrice !== "" && toString(newProductPrice).length >= 3) {
      //updateItem.actualProfitAmount =
      //  newProductPrice - newProductPrice * (charge && charge / 100);
      updateItem.price = newProductPrice;
    }

    if (newProductQty.current.value !== "") {
      updateItem.productQty = +newProductQty.current.value;
    }

    if (
      //  !updateItem?.actualProfitAmount &&
      !updateItem?.price &&
      !updateItem?.description &&
      !updateItem?.productName &&
      !updateItem?.productQty
    ) {
      setErrorMes("Empty spaces. Update fail!");
      return;
    }

    if (!link) {
      setErrorMes("Session Expired. Login!");
      return;
    }

    if (updateItem?.productName && updateItem.productName?.length < 3) {
      setErrorMes("Product Name is too short!");
      return;
    }

    if (updateItem?.productQty && updateItem.productQty > 500) {
      setErrorMes("Unit is too high. must be lower than 500");
      return;
    }

    if (updateItem?.price && updateItem?.price < 150) {
      setErrorMes("Invalid price Range! Must be greater than NGN150");
      return;
    }

    //Check Bank!

    if (!bank) {
      setErrorMes("Please add your Bank Detail to proceed!");
      return;
    }

    //Check Phone!
    if (!phone) {
      setErrorMes(
        "Please verify and add your WhatsApp phone number to receive notifications!"
      );
      return;
    }
    setErrorMes("");

    const info = {
      productId: prevData?.productId,
      link,
      data: { ...updateItem, role },
    };

    await editProduct(info)
      .unwrap()
      .then(controlModal)
      .catch((e) => setErrorMes(e?.message));
  };

  return (
    <Dialog open={modal} onOpenChange={controlModal}>
      <DialogContent classNmae="max-h-[80vh] overflow-auto">
        <DialogTitle className="font-sans_serif text-center text-3xl">
          Edit Product to your store
        </DialogTitle>

        <p className="text-xs my-4">
          Leave out space that does not need an update{" "}
        </p>

        {errorMes && (
          <p className="text-red-700 font-oswald text-start text-[16px] px-4 py-[1px] my-3 ">
            {errorMes}
          </p>
        )}

        <form className="w-full px-2 py-2 space-y-6">
          <label className="space-y-2 block">
            <span>Product Name</span>
            <Input
              required
              clx="w-full font-roboto text-xl"
              placeholder={prevData?.productName}
              ref={newProductName}
            />
          </label>
          <label className="space-y-2 block">
            <span>Product Price</span>
            <InputPrice
              required
              className="w-full font-roboto text-xl"
              placeholder={prevData?.price}
              onChange={priceChange}
              value={newProductPrice}
            />
          </label>
          <label className="space-y-2 block">
            <span>Product Unit</span>
            <Input
              required
              clx="w-full font-roboto text-xl"
              type="number"
              placeholder={prevData?.productQty}
              ref={newProductQty}
            />
          </label>
          <label className="space-y-2 block">
            <span className="block">Description (optional)</span>
            <textarea
              className=" border-2 w-full px-3 py-2 block resize-none min-h-[10rem] outline-none rounded focus:shadow"
              placeholder={prevData?.productDesc || "Write about your product"}
              ref={newProductDesc}
            ></textarea>
          </label>

          <div className="my-4 flex gap-4 flex-wrap">
            <Button
              onClick={controlModal}
              type="button"
              className="bg-slate-300 text-teal-700"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={triggerEditProduct}
              className="bg-teal-800 text-white"
            >
              {isLoading ? <Loader /> : "Edit Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
*/
