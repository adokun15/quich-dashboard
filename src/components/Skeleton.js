const Skeleton = ({ clx }) => {
  return (
    <div className={`${clx} w-[4rem] rounded-md bg-gray-300 py-2 px-5`}></div>
  );
};

export function TableSkeleton({ cols }) {
  return (
    <div className="overflow-hidden rounded-xl ">
      <table className="w-full  text-sm text-left rounded-xl bg-white">
        <thead className="bg-gray-100 border-b rounded text-gray-500 uppercase text-xs">
          <tr className="">
            <th scope="col" className="p-6 ">
              <Skeleton />
            </th>
            <th colSpan="3" scope="col" className="px-6 py-3">
              <Skeleton />
            </th>
            <th className="px-6 py-3 text-nowrap">
              <Skeleton />
            </th>
            <th className="px-6 py-3 text-nowrap">
              <Skeleton />
            </th>
            <th className="px-6 py-3 text-nowrap">
              <Skeleton />
            </th>
          </tr>
        </thead>
        <tbody className="space-y-10">
          <tr className="py-6">
            <td colSpan="1" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td colSpan="3" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td colSpan="1" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td colSpan="3" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td colSpan="1" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td colSpan="3" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td colSpan="1" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td colSpan="3" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td colSpan="1" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td colSpan="3" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td colSpan="1" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td colSpan="3" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
          </tr>
          <tr>
            <td colSpan="1" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td colSpan="3" className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
            <td className="px-6 capitalize py-8 text-gray-700">
              <Skeleton />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
