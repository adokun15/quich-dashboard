import SingleProductForm from "@/components/SingleProductForm";

//Get Single Product Item;
const getSingleProduct = async (id) => {
  try {
    // Get User Cookies first: 30mins
    //const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //if (!user_token) {
    // redirect("/");
    // }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token-value`,
        },
      },
    );

    const data = await res.json();
    console.log(data);
    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: data?.message, status_code: data?.status_code };
    }

    return data.data.product;
  } catch (e) {
    return { error: e?.message };
  }
};

export default async function SingleProductPage({ params }) {
  const { productId } = await params;
  const product = await getSingleProduct(productId);
  return <SingleProductForm product={product} />;
}
