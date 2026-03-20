import CategoryListData from "@/components/CategoryListData.js";

export default function CategoryPage() {
  return (
    <main>
      <header>
        <article>
          <h3>Category</h3>
          <p>Group products into different category</p>
        </article>
        <article>
          <button>Share</button>
          <button>Create</button>
        </article>
      </header>

      <CategoryListData />
    </main>
  );
}
