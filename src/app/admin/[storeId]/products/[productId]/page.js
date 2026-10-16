import Card from "@/components/card";
import SingleProductForm from "@/components/SingleProductForm";
import { cacheTag } from "next/cache";
import ErrorComponent from "@/components/ErrorComponent";

//Get Single Product Item;
const getSingleProduct = async (id) => {
  "use cache";
  cacheTag("single_product");

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
      return { error: { message: data?.message, code: data?.code } };
    }

    return data.data.product;
  } catch (e) {
    return { error: e?.message };
  }
};

//Prefetch category data
const category = async () => {
  "use cache";
  cacheTag("category");
  try {
    // Get User Cookies first: 30mins
    // const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //   if (!user_token) {
    //   redirect("/");
    // }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category`,
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
  "use cache";
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
      //url: 'https://${}.org',
      images: [
        {
          url: product?.images && product?.images[0], // Must be an absolute URL
          width: 500,
          height: 500,
        },
        //   {
        //   url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        //    width: 1800,
        //    height: 1600,
        //    alt: 'My custom alt',
        // },
      ],
      videos: [
        //   {
        //   url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
        //    width: 800,
        //    height: 600,
        // },
      ],
      audio: [
        {
          //    url: 'https://nextjs.org/audio.mp3', // Must be an absolute URL
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
