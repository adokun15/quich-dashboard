import ErrorComponent from "@/components/ErrorComponent";
import SingleCategory from "@/components/SingleCategory";
import { cacheTag } from "next/cache";

//Fetch category data

//Prefetch category data
const category = async (id) => {
  "use cache";
  cacheTag("single_category");

  try {
    // Get User Cookies first: 30mins
    // const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //   if (!user_token) {
    //   redirect("/");
    // }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer some-token-ok`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: { message: data?.message, code: data?.code } };
    }

    return data?.data;
  } catch (e) {
    return { error: { message: e?.message } };
  }
};

/*
const getProducts = async ({ filter }) => {
  try {
    // Get User Cookies first: 30mins
    //const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //if (!user_token) {
    // redirect("/");
    // }
    //Fetch data if token exist;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products?OrderBy=p.updated_at&direction=ASC&limit=5${filter?.search ? `&search=${filter?.search}` : ""}`,
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
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: { message: data?.message, code: data?.code } };
    }

    return data?.data?.products;
  } catch (e) {
    return { error: { message: e?.message } };
  }
};
*/

export async function generateMetadata({ params }) {
  "use cache";
  const { category_id } = await params;
  const c = await category(category_id);
  if (c?.error) {
    return {
      title: "Category not Found",
    };
  }

  return {
    title: `Category - ${c?.name}`,
    openGraph: {
      title: `Category - ${c?.name}`,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function SingleCategoryPage({ params, searchParams }) {
  const { category_id } = await params;
  // const product_search_filters = await searchParams;
  // const products = await getProducts({ filter: product_search_filters });
  const data = await category(category_id);

  const retry = `/admin/category/${data?.id}`;

  if (data?.error) {
    return <ErrorComponent error={data?.error} retry={retry} />;
  }

  return <SingleCategory category={data} />;
}
