import CategoryListData from "@/components/CategoryListData.js";

const getCategoryData = async () => {
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
      return { error: data?.message, status_code: data?.status_code };
    }

    return data.data;
  } catch (e) {
    return { error: e?.message };
  }
};

export default async function CategoryPage() {
  const category = await getCategoryData();

  return (
    <main>
      <CategoryListData {...category} />
    </main>
  );
}
