/*import { useState } from "react";
import Button from "@/components/Button.jsx";
import Card from "@/components/Card.jsx";
import { FreeTrial } from "@/components/FreeTrial.jsx";
import { Loader } from "@/helper/Loading.jsx";
import { useGetMerchantQuery } from "@/state/endpoints/store.js";
import {
  useGetUserQuery,
  usePaymentPlanMutation,
  useVerifyUserQuery,
} from "@/state/endpoints/user.js";
import { ErrorMessage } from "@/helper/ErrorMessage.jsx";
const BasicPlan = ({ email, phone, username }) => {
  const [tohigherPlan, { isLoading }] = usePaymentPlanMutation();

  const handlePlan = async (type) => {
    if (!email || !phone) return;
    const personal_info = {
      email,
      phone,
      username,
    };
    await tohigherPlan({ type, personal_info })
      .unwrap()
      .then((data) => (window.location.href = data?.url));
  };

  return (
    <>
      <Card>
        <article className="flex items-center py-4 justify-between">
          <div>
            <p>Current Plan: Basic Plan</p>
          </div>
        </article>
      </Card>

      {isLoading && <Loader />}
      <Card>
        <h3 className="text-xl font-roboto">
          You want MORE? Feel free to Upgrade
        </h3>
        <div className="divide-y-2 ">
          <article className="flex items-center py-4 justify-between">
            <div>
              <p>Standard Plan</p>
              <p className="line-through">NGN 5800</p>
              <p className="font-bold">NGN 5500</p>
            </div>
            <Button
              onClick={() => handlePlan("basic_standard")}
              clxName="bg-yellow-300 text-blue-950"
            >
              Get now
            </Button>
          </article>
          <article className="flex items-center py-4 justify-between">
            <div>
              <p>Premium Plan</p>
              <p className="line-through">NGN 14400</p>
              <p className="font-bold">NGN 14000</p>
            </div>
            <Button
              clxName="bg-yellow-300 text-blue-950"
              onClick={() => handlePlan("basic_premium")}
            >
              Get now
            </Button>
          </article>
        </div>
      </Card>
    </>
  );
};

const StandardPlan = ({ email, phone, username }) => {
  const [toPremium, { isLoading }] = usePaymentPlanMutation();

  const [error, setError] = useState();
  const handlePlan = async (type) => {
    if (!email || !phone) return;
    const personal_info = {
      email,
      phone,
      username,
    };
    await toPremium({ type, personal_info })
      .unwrap()
      .then((data) => (window.location.href = data?.url))
      .catch((err) => setError(err?.data?.message));
  };

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Card className="my-6">
        <article className="flex items-center py-4 justify-between">
          <div className="text-2xl font-serif tracking-wider ">
            <p>
              <span className="border-b-2 mx-4 border-b-yellow-400">
                Current Plan:
              </span>
              Standard Plan
            </p>
          </div>
        </article>
      </Card>

      <Card>
        <h3 className="text-xl font-roboto">
          You want MORE ? Feel free to Upgrade to our Premium Plan
        </h3>
        <div className="">
          <article className="flex items-center py-4 justify-between">
            <div>
              <p>Premium Plan</p>
              <p className="line-through opacity-85">NGN 8,600</p>
              <p className="font-bold">NGN 8,000</p>
            </div>
            <Button
              clxName="bg-yellow-300 text-blue-950 hover:bg-yellow-500 transition-colors duration-500"
              onClick={() => handlePlan("standard_premium")}
            >
              {isLoading ? <Loader /> : " Get now"}
            </Button>
          </article>
        </div>
      </Card>
    </>
  );
};

const PremiumPlan = () => {
  return (
    <>
      <Card>
        <article className="flex items-center py-4 justify-between">
          <div>
            <p>Current Plan: Premium Plan</p>
          </div>
        </article>
      </Card>
    </>
  );
};

export default function MembershipComponent() {
  const token = localStorage.getItem("token");
  const { email, role, username } = useVerifyUserQuery(
    { token },
    {
      skip: !token,
      selectFromResult: (res) => ({
        role: res?.data?.customClaims?.role,
        username: res?.data?.displayName,
        email: res?.data?.email,
      }),
    }
  );

  const { data: user } = useGetUserQuery();
  const {
    data: merchant,
    isLoading,
    isError,
  } = useGetMerchantQuery(user?.link, {
    skip: !user?.link,
  });

  return (
    <>
      {!isError && isLoading && <Loader />}

      {isError && !isLoading && <div>An Error Occured!</div>}

      {!isError && !isLoading && (
        <div>
          <h1 className="text-2xl font-sans_serif">MemberShip </h1>
          {role === "free-trial" && (
            <FreeTrial
              email={email}
              username={username}
              phone={merchant?.phone}
            />
          )}
          {role === "basic" && (
            <BasicPlan
              email={email}
              username={username}
              phone={merchant?.phone}
            />
          )}
          {role === "standard" && (
            <StandardPlan
              email={email}
              username={username}
              phone={merchant?.phone}
            />
          )}
          {role === "premium" && <PremiumPlan />}
        </div>
      )}
    </>
  );
}
 */