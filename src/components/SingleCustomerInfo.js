"use client";
import Link from "next/link";
import Card from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ToasterModalToggle } from "@/utils/state/modal/modalSlice";
import { DeleteCustomerDetail } from "@/server/customer/DeleteCustomerDetaills";
import { useState } from "react";
import { useFormStateData } from "@/utils/state/FormState";
import { UpdateCustomerDetail } from "@/server/customer/UpdateCustomerDetails";

export default function SingleCustomerInfo({ customer }) {
  //States
  const [openEditInput, setEditInputToOpen] = useState(false);
  const { handleInputChanges, isDirty, updatedField } = useFormStateData({
    oldStateData: customer,
  });
  const [state, setState] = useState({
    pending: false,
    error: null,
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const getLastOrderDate = customer?.orders
    ?.sort((a, b) => a.created_at - b.created_at)
    .map((o) => o.created_at)[0];

  //Edit
  const EditCustomerInfo = async () => {
    //vALIDATE STRING
    if (
      updatedField?.name &&
      (updatedField?.name === "" || !isNaN(updatedField?.name))
    ) {
      setState((p) => ({ ...p, error: "Invalid name" }));
      return;
    }

    try {
      setState((p) => ({ ...p, pending: true }));

      //Check if the updated Value has an Empty String
      const res = await UpdateCustomerDetail({
        updates: updatedField,
        customer_id: customer?.customer_id,
      });

      if (res.error) {
        //Toast message
        dispatch(
          ToasterModalToggle({
            type: "fail",
            title: "An error occurred",
            message: res?.error?.message,
          }),
        );
        return;
      }

      //Toast message
      dispatch(
        ToasterModalToggle({
          type: "success",
          title: "Changes saved",
          message: "",
        }),
      );

      //Close inputs
      setEditInputToOpen(false);
    } finally {
      //Set loading false
      setState((p) => ({ error: "", pending: false }));
    }
  };

  //Delete
  const DeleteCustomerInfo = async () => {
    if (!window.confirm("Are you sure you want to remove this customer?"))
      return;

    try {
      setState((p) => ({ ...p, pending: true }));
      const res = await DeleteCustomerDetail({
        customer_id: customer?.customer_id,
      });

      if (res.error) {
        //Toast message
        dispatch(
          ToasterModalToggle({
            type: "fail",
            title: "An error occurred",
            message: res?.error?.message,
          }),
        );
        return;
      }
      //Send Toast message
      dispatch(
        ToasterModalToggle({
          type: "success",
          title: "Customer Deleted Successfully!",
          message: "",
        }),
      );

      //Redirect to /customers
      router.push("/admin/customers");
    } finally {
      setState((p) => ({ ...p, pending: false }));
    }
  };

  return (
    <main className="mx-auto w-full max-w-xl space-y-4">
      {/* Navigate Customer */}
      <section className="flex justify-between">
        <article>
          <h2 className="text-xl font-semibold">{customer?.name}</h2>
          <p className="text-desc text-muted">
            Last Order on{" "}
            {`${new Date(getLastOrderDate).toLocaleDateString()} ${new Date(getLastOrderDate).toLocaleTimeString()}`}
          </p>
        </article>

        <article>
          <button
            onClick={DeleteCustomerInfo}
            className="text-danger border-danger border px-2 space-x-2 cursor-pointer rounded"
          >
            {state?.pending ? (
              <FontAwesomeIcon icon={faSpinner} />
            ) : (
              <>
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete</span>
              </>
            )}
          </button>
        </article>
      </section>

      <section className="space-y-4">
        <Card className="flex justify-between">
          <div>
            <p className="text-base">Orders Made</p>
            <p className="text-base font-semibold">{customer?.total_orders}</p>
          </div>
          <div>
            <p className="text-base">Total Spent</p>
            <p className="text-base font-semibold">
              NGN{customer.total_orders_amount}
            </p>
          </div>
        </Card>

        <Card className="p-0 space-y-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <div>
            {customer?.orders.length === 0 && <p>This space is empty {`:(`}</p>}
            {customer?.orders.length > 0 &&
              customer?.orders?.map((order) => (
                <article
                  key={order?.id}
                  className="flex justify-between items-center px-2"
                >
                  <div className="space-y-1">
                    <p className="text-base flex gap-1">
                      <span className="font-semibold">
                        <Link
                          className="hover:underline transition hover:text-primary"
                          href={`/admin/orders/${order?.id}`}
                        >
                          #${order?.id}
                        </Link>
                      </span>{" "}
                      <span className=" text-muted text-tiny px-2 pb-1  border rounded-full ">
                        {order?.status}
                      </span>
                    </p>
                    <p className="text-muted text-tiny">
                      {`${new Date(order?.created_at).toLocaleDateString()} ${new Date(order?.created_at).toLocaleTimeString()}`}
                    </p>
                  </div>
                  <p className="text-based font-semibold">
                    NGN{order?.total_amount}
                  </p>
                </article>
              ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Customer Info</h2>
            {!openEditInput && (
              <button
                className="text-primary py-1 
                px-2 space-x-2
               cursor-pointer rounded"
                onClick={() => setEditInputToOpen(true)}
              >
                <FontAwesomeIcon icon={faPen} />
                <span>Make changes</span>
              </button>
            )}

            {openEditInput && (
              <div className="flex gap-3">
                <button
                  className="text-primary py-1 
              border-primary border px-4 space-x-2
              cursor-pointer rounded-[10px]"
                  onClick={() => setEditInputToOpen(false)}
                >
                  <span>close</span>
                </button>
                <button
                  type="button"
                  className="filled_button disabled:opacity-60 
                  disabled:text-gray-700"
                  disabled={!isDirty}
                  onClick={EditCustomerInfo}
                >
                  {state?.pending ? (
                    <FontAwesomeIcon icon={faSpinner} />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            )}
          </div>

          {state?.error && <p className="text-danger">{state?.error}</p>}

          <div className="flex justify-between">
            <article>
              <p className="text-based font-semibold">Name</p>

              {!openEditInput && (
                <p className="text-desc text-muted capitalize">
                  {customer?.name}
                </p>
              )}
              {openEditInput && (
                <input
                  className="bg-white border"
                  placeholder="Enter customer name"
                  maxLength={30}
                  onChange={handleInputChanges}
                  data-field_name="name"
                  defaultValue={customer?.name}
                />
              )}
            </article>
          </div>

          <div className="flex justify-between">
            {!openEditInput && (
              <article>
                <p className="text-based font-semibold">Phone</p>
                <p className="text-desc text-muted">0{customer?.phone}</p>
              </article>
            )}
          </div>
          <div className="flex justify-between">
            <article>
              <p className="text-based font-semibold">Tag</p>
              {!openEditInput && (
                <p className="text-desc text-muted">
                  {customer?.tag ?? "No tag"}
                </p>
              )}

              {openEditInput && (
                <>
                  <input
                    className="bg-white border"
                    placeholder="Group customer by tag"
                    maxLength={30}
                    onChange={handleInputChanges}
                    data-field_name="tag"
                    defaultValue={customer?.tag || ""}
                  />

                  <p className="text-tiny text-muted">
                    Big ballers, Top buyers, bodycare buyers
                  </p>
                </>
              )}
            </article>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-xl font-semibold">Quick action</h2>

          {/*<article className="flex justify-between ">
            <div>
              <p className="text-based font-semibold">Request a Testimonial</p>
              <p className="text-desc">Collect reviews from this customer</p>
            </div>
            <button className="underline">Go</button>
          </article>
          */}

          <article className="flex justify-between ">
            <div>
              <p className="text-based font-semibold">Send a message</p>
              <p className="text-desc">Contact user directly on whatsapp</p>
            </div>
            <button className="underline">Go</button>
          </article>
        </Card>
      </section>
    </main>
  );
}
