import CategoryListData from "@/components/CategoryListData.js";
import CreateButtonAction from "@/components/CreateButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getCategoryData = async ({ filter }) => {
  try {
    // Get User Cookies first: 30mins
    // const cookie = await cookies();
    //const user_token = cookie?.get("quich_login_token");

    //   if (!user_token) {
    //   redirect("/");
    // }

    //Filter
    const filterstring = Object.entries(filter)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category?${filterstring}`,
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

export default async function CategoryPage({ searchParams }) {
  const filter = await searchParams;
  const category = await getCategoryData({ filter });

  return (
    <main className="w-full bg-primary700 rounded-xl p-6 space-y-6 py-4 mx-auto min-h-screen">
      <div className="flex justify-between px-4">
        <div>
          <h2 className="text-2xl font-medium">Category</h2>
          <p className="text-muted text-2">
            Group products into different category
          </p>
        </div>

        <CreateButtonAction to="/admin/category/new">
          <span className="">Create Category</span>
          <FontAwesomeIcon
            className="text-primary hover:text-text"
            icon={faPlus}
          />
        </CreateButtonAction>
      </div>

      <CategoryListData {...category} />
    </main>
  );
}
