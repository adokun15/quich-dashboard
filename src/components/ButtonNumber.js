import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ButtonNumber({
  max,
  type,
  value,
  decrement,
  increment,
}) {
  const d = value === 1 && type !== "cart";
  return (
    <div className="flex gap-5 my-3">
      <button
        disabled={d}
        className="bg-gray-200 p-1 px-3 rounded-full text-yellow-400 disabled:opacity-20"
        onClick={decrement}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <p>{value}</p>

      <button
        className="bg-gray-200 p-1 px-3 rounded-full text-yellow-400 disabled:opacity-20"
        onClick={increment}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
}
