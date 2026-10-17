import Card from "@/components/card";
import SingleProductForm from "@/components/SingleProductForm";
import { cacheTag } from "next/cache";
import ErrorComponent from "@/components/ErrorComponent";
import { cookies } from "next/headers";

//Get Single Product Item;
const getSingleProduct = async (id) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("quich_token")?.value;

    if (!token) {
      return redirect("/login");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/products/${id}`,
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

    return data.data.product;
  } catch (e) {
    return { error: e?.message };
  }
};

//Prefetch category data
const category = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("quich_token")?.value;

    if (!token) {
      return redirect("/login");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category`,
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
      // Prompt modal if cookie has expired

      //Show modal if store name don't match!
      return { error: { message: data?.message, code: data?.code } };
    }

    const d = data?.data?.category?.map((c) => ({
      slug: c?.slug,
      id: c?.id,
      name: c?.name,
    }));
    return d;
  } catch (e) {
    return { error: e?.message };
  }
};

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const product = await getSingleProduct(productId);
  if (product?.error) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product?.name,
    openGraph: {
      title: product?.name,
      description: product?.description,
      images: [
        {
          url: product?.images && product?.images[0], // Must be an absolute URL
          width: 500,
          height: 500,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function SingleProductPage({ params }) {
  const { productId } = await params;
  const product = await getSingleProduct(productId);

  const data = await category();

  const retry = `/admin/products/${data?.id}`;

  if (product?.error) {
    return <ErrorComponent error={product?.error} retry={retry} />;
  }

  return <SingleProductForm product={product} getCategoryItem={data} />;
}
