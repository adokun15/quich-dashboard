import StorePageComponent from "@/components/StorePage";
import StoreProductsList from "@/components/StoreProductsList";
import StoreProfile from "@/components/StoreProfile";

const getStoreInfo = async (slug_id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/store/${slug_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return { error: data?.message, status_code: data?.status_code };
    }

    return data;
  } catch (e) {
    return { error: e?.message };
  }
};

const getStoreProduct = async (slug_id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/store/${slug_id}/products?limit=20&category=all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return { error: data?.message, status_code: data?.status_code };
    }

    return data;
  } catch (e) {
    return { error: e?.message };
  }
};

export const metadata = {
  title: "The Store",
};

//This Default page is the user store
export default async function MerchantStoreHome(params) {
  const { store_slug } = await params?.params;
  const store = await getStoreInfo(store_slug);
  const product = await getStoreProduct(store_slug);

  return (
    <StorePageComponent>
      <StoreProfile store={store?.data} />
      <StoreProductsList products={product?.data?.products} />
    </StorePageComponent>
  );
}

/* Just import fake data: 
-cart.js -- (state cart)
-singleitemdisplay.js (--product view--)
-storeprofile.js --- merchant
-Storepage.js(initially)
-Storeproductlist.js --- products

*/
