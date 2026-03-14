import StorePageComponent from "@/components/StorePage";
import StoreProductsList from "@/components/StoreProductsList";
import StoreProfile from "@/components/StoreProfile";

const getStoreInfo = async () => {
  return {
    store_id: "",
    store_profile: "",
    store_bio: "",
    store_slug: "",
    store_name: "",
    merchant: {
      merchant_id: "",
      phone: "",
      profile: "",
      name: "",
    },
  };
};

const getStoreProduct = async () => {
  return { products: [] };
};

export const metadata = {
  title: "The Store",
};

//This Default page is the user store
export default async function MerchantStoreHome(params) {
  const { store_slug } = await params?.params;
  const store = await getStoreInfo(store_slug);
  const product = await getStoreProduct(store_slug);

  //function;

  return (
    <StorePageComponent>
      <StoreProfile store={store} />
      <StoreProductsList products={product} />
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
