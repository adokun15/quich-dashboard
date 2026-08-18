//Using ZOD;
export async function CreateOrder({ cart, store_id, customer }) {
  //FIELD TO AVOID

  //Proceed to Backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        store_id,
        cart,
        customer,
      }),
    },
  );

  const order = await res.json();

  console.log(order);
  //Return Error if available
  if (order?.error) {
    return {
      error: {
        message: order?.error?.message,
        status: order?.error?.status,
      },
    };
  }

  //rETURN data
  return order;
}
