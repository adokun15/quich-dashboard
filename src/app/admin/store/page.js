import ErrorComponent from "@/components/ErrorComponent";
import ManageStore from "@/components/ManageStore";
import { cacheTag } from "next/cache";
/*
What i notice while editing?
- max stock by a single user;
- conditions: Cart must be more than 5k ?
*/

//Get Single Product Item;
const getStore = async () => {
  "use cache";
  cacheTag("store");

  try {
    // Get User Cookies first: 30mins
    //const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //if (!user_token) {
    // redirect("/");
    // }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/store`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token-value`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return { error: { message: data?.message, code: data?.code } };
    }

    return data.data?.store;
  } catch (e) {
    return { error: { message: e?.message, code: e?.code } };
  }
};

export async function generateMetadata() {
  "use cache";
  const store = await getStore();
  if (store?.error) {
    return {
      title: "Store Not Found",
    };
  }

  return {
    title: `Store | ${store?.name}`,
  };
}

export default async function Store() {
  const store = await getStore();

  const retry = ``;

  if (store?.error) {
    return <ErrorComponent error={store?.error} />;
  }

  return (
    <main className="relative max-w-4xl mx-auto space-y-3">
      <ManageStore store={store} />
    </main>
  );
}
