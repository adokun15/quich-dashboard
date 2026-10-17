import ErrorComponent from "@/components/ErrorComponent";
import ManageStore from "@/components/ManageStore";
import { cookies } from "next/headers";
/*
What i notice while editing?
- max stock by a single user;
- conditions: Cart must be more than 5k ?
*/

//Get Single Product Item;
const getStore = async () => {
  //  "use cache";
  //cacheTag("store");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("quich_token")?.value;

    if (!token) {
      return redirect("/login");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/store`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `quich_token=${token}`,
        },
        cache: "no-store",
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
