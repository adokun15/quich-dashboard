import CategoryListData from "@/components/CategoryListData.js";
import CreateButtonAction from "@/components/CreateButton";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getCategoryData = async ({ filter }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("quich_token")?.value;

  if (!token) {
    return redirect("/login");
  }

  try {
    const filterstring = new URLSearchParams(
      Object.entries(filter).reduce((params, [key, value]) => {
        if (value !== undefined && value !== null) {
          params[key] = String(value);
        }
        return params;
      }, {}),
    ).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/category?${filterstring}`,
      {
        method: "GET",
        headers: {
          Cookie: `quich_token=${token}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok || !data?.status) {
      return {
        error: data?.message || "Failed to fetch categories",
      };
    }

    return data.data;
  } catch (error) {
    // Don't swallow Next.js redirect errors.
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: error?.message || "Something went wrong" };
  }
};

export const metadata = {
  title: "All available category",
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
          <span>Create Category</span>
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
