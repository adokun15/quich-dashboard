"use client";

/*
BUG ALERT!!

When the page initially loads with it data(Cached).
the order status does not change even after invalidating it
the error seem to be a cache component issue,
now their is no way to update the data again after invalidating
till user manually refreshes the browser.

i intentionally abandon this bug to resolve it later in the future 
as it take almost 2 hours to resolve which is not convient at all

14:01pm - 09/05/2026

*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faListDots,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { SelectActionButton, SelectForm } from "./select";
import Link from "next/link";
import { useState } from "react";
import { useFormStateData } from "@/utils/state/FormState";
import { UpdateOrderDetail } from "@/server/order/UpdateOrder";
import { useDispatch } from "react-redux";
import { ToasterModalToggle } from "@/utils/state/modal/modalSlice";
import Image from "next/image";
import ErrorText from "./errorText";
import { DeleteOrderDetail } from "@/server/order/DeleteOrder";

export default function SingleOrderInfo({ order }) {
  const [state, setState] = useState({
    loading: null,
    error: null,
  });

  const dispatch = useDispatch();

  const { handleSelectChanges, isDirty, newData, updatedField } =
    useFormStateData({
      oldStateData: order,
    });

  const updateOrderAction = async () => {
    if (!isDirty) return;

    setState((p) => ({ ...p, loading: "update" }));

    //Check if the updated Value has an Empty String
    const { error } = await UpdateOrderDetail({
      updates: updatedField,
      order_id: order?.id,
      customer_id: order?.customer_id,
    });

    if (error) {
      setState((p) => ({ loading: null, error: error?.message }));
      return;
    }

    dispatch(
      ToasterModalToggle({
        type: "success",
        title: "Order updated!",
      }),
    );

    setState((p) => ({ loading: null, error: "" }));
  };

  const deleteOrderAction = async () => {
    if (!window.confirm("Are you sure you want to remove this order?")) return;

    setState((p) => ({ ...p, loading: "delete" }));

    //Check if the updated Value has an Empty String
    const { error } = await DeleteOrderDetail({
      order_id: order?.id,
      customer_id: order?.customer_id,
    });

    if (error) {
      setState((p) => ({ loading: null, error: error?.message }));
      return;
    }

    dispatch(
      ToasterModalToggle({
        type: "success",
        title: "Order updated!",
      }),
    );

    setState((p) => ({ loading: null, error: "" }));
  };

  const ShareOption = () => {};

  const GotoPublicPage = () => {};

  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">#{order?.id}</h2>
          <p className="text-desc text-muted">
            {`${new Date(order?.created_at).toLocaleDateString()} ${new Date(order?.created_at).toLocaleTimeString()}`}
          </p>
        </article>

        <article className="flex items-center gap-3">
          <SelectActionButton
            tag="order_action_list"
            title={"more"}
            className="flex text-xl items-center space-x-2 h-fit bg-gray-300 cursor-pointer rounded-2xl outline-none"
          >
            <button>View Public</button>
            <button>Share</button>
          </SelectActionButton>
          <button
            onClick={deleteOrderAction}
            disabled={state?.loading === "delete"}
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
        </article>
      </section>

      <section className="space-y-4">
        <Card className="p-0 space-y-4">
          <ErrorText>{state?.error}</ErrorText>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Order Status</h2>
            <SelectForm
              onChangeValue={handleSelectChanges}
              field="status"
              title={order?.status?.toUpperCase()}
              className="w-fit"
              items={[
                { name: "Pending", id: "pending" },
                { name: "Processing", id: "processing" },
                { name: "Cancelled", id: "cancelled" },
                { name: "On delivery", id: "on delivery" },
                { name: "Completed", id: "completed" },
              ]}
            />
          </div>

          {/* Item List */}
          <div className="border-b-border py-4 border-b">
            <ul className="space-y-4">
              {order?.cart_items?.map((item) => (
                <li
                  key={item.product_id}
                  className="flex items-center justify-between"
                >
                  <article>
                    <div className="">
                      {item?.images && (
                        <Image
                          className="w-auto h-auto"
                          src={item?.images[0]}
                          height={20}
                          width={40}
                          alt={item.name}
                        />
                      )}
                      <h3 className="text-base font-semibold">{item?.name}</h3>
                    </div>
                  </article>
                  <div>
                    <p className="font-semibold">NGN{item?.total}</p>
                    <p className="text-desc text-muted">
                      <span>NGN{item?.price}</span> x <span>{item?.qty}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Item List Total */}
          <div className="flex justify-between">
            <p>Total</p>
            <p className="font-semibold">NGN{order?.total_amount}</p>
          </div>

          {/* Save changes */}
          <div>
            <button
              onClick={updateOrderAction}
              disabled={newData?.status === order?.status}
              className={`bg-primary disabled:opacity-50`}
            >
              {state.loading === "update" ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Customer</h2>
            <button className="bg-input px-4 py-1 text-white rounded">
              <Link href={`/admin/customers/${order?.customer_id}`}>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </button>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Name</p>
            <p className="text-desc text-muted">{order?.customer_name}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Phone</p>
            <p className="text-desc text-muted">0{order?.customer_phone}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-based font-semibold">Member since</p>
            <p className="text-desc text-muted">
              {`${new Date(order?.member_since).toLocaleDateString()}`}
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}
