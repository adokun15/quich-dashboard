export function Select({ className, items }) {
  return (
    <form class="">
      <select
        className={`${className} block min-w-full has-open:bg-red-600  py-2.5 bg-input 
        border border-border 
  `}
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
