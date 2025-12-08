//Collect User Information Here; [Generate Store link]
export default function Onboard() {
  return (
    <main>
      <div>
        <h1>Create your store</h1>
      </div>

      <div>
        <p>Store Name</p>
        <input placeholder="Enter your Store Name" />
      </div>

      <div>
        <p>Business Category</p>
        <select>
          <option> Food / Resaurant</option>
          <option> Home service (cleaning etc)</option>
          <option> Health and Beauty</option>
          <option> Retails and Shopping </option>
          <option> Grocery / SupperMarket </option>
          <option> Gift & Craft</option>
          <option> Profession Service (Barbing, Nail Tech etc)</option>
          <option> Other</option>
        </select>
        <input placeholder="Enter your Store Name" />
      </div>

      <div>
        <p className=""> Phone Number </p>
        <article>
          <input value={"+234"} readOnly />
          <input />
        </article>
        <button>verify</button>
      </div>

      <div>
        <p className=""> Store Link </p>
        <article className="flex">
          <input value={"quich.shop/"} readOnly />
          <input />
        </article>
      </div>

      <button>Create</button>
      {/* <p>Referral Code (optional)</p> */}

      <div>{/* Undraw Illustration: medium screen */}</div>
    </main>
  );
}
