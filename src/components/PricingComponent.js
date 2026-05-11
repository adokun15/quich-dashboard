import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./card";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function PricingPlan() {
  return (
    <main className="max-w-5xl space-y-6 py-1 mx-auto min-h-screen">
      <div className="space-y-4 flex flex-wrap *:md:w-[45%] h-fit gap-x-5">
        <Card className="justify-between grow flex-wrap">
          <h1 className="text-xl font-medium">Basic plan </h1>
          <p className="text-muted ">NGN1000/Month (First Month)</p>
          <p className="text-muted ">NGN1900/Month (After First Month)</p>

          <article className="my-5 ">
            <p className="font-medium">Package</p>
            <ul className="list-none text-muted pl-1">
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Unlimited direct orders</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Add your Community link</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>30 products upload</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Custom web store</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Community & Email Support</span>
              </li>
            </ul>
          </article>
          <button className="filled_button">Try it Now</button>
        </Card>

        <Card className=" justify-between grow  flex-wrap">
          <h1 className="text-xl"> Growth Plan</h1>
          <p>NGN4500 / Month</p>
          <article className="my-5 ">
            <p className="font-medium">Package</p>
            <ul className="list-none text-muted pl-1">
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Unlimited direct orders</span>
              </li>

              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>300 credit messaging tokens</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Add your Community link</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>100 products upload</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Custom web store</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Community & Email Support</span>
              </li>
            </ul>
          </article>
          <button className="filled_button">Subscribe</button>
        </Card>

        <Card className="min-w-full justify-between flex-wrap">
          <h1 className="text-xl">Business Plan</h1>
          <p>NGN10000 / Month</p>
          <article className="my-5 ">
            <p className="font-medium">Package</p>
            <ul className="list-none text-muted pl-1">
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Unlimited direct orders</span>
              </li>

              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>10000 credit messaging tokens</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Add your Community link</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>300 products upload</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Custom web store</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Community & Email Support, Direct Dm</span>
              </li>
              <li className="space-x-2 ">
                <FontAwesomeIcon className="text-primary" icon={faCheck} />
                <span>Promo Video Ad</span>
              </li>
            </ul>
          </article>
          <button className="filled_button">Subcribe</button>
        </Card>
      </div>
    </main>
  );
}
