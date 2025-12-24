export function Select({ children, items }) {
  return (
    <form class="">
      <select
        class="block w-full px-3 py-2.5 bg-primary700 border border-primary900 text-sm rounded-base
         focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
      >
        {/* <option selected>Choose a country</option>*/}
        {items?.map((item) => (
          <option key={item?.value} value={item?.value}>
            {item?.name}
          </option>
        ))}
      </select>
    </form>
  );
}
