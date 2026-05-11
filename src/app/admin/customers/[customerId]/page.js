//Single Customer Page!
import Card from "@/components/card";
import SingleCustomerInfo from "@/components/SingleCustomerInfo";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cacheTag } from "next/cache";
import { cookies } from "next/headers";

const getSingleCustomer = async (id) => {
  "use cache";
  cacheTag("single_customer");

  try {
    // Get User Cookies first: 30mins
    const cookie = await cookies();
    const user_token = cookie?.get("quichshop_access_token");

    //if (!user_token) {
    // redirect("auth.localhost.3000/login");
    //}

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/customers/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
      },
    );

    const data = await res.json();

    if (!data?.status) {
      return {
        error: {
          code: data?.code,
          message: data?.message,
        },
      };
    }

    return data?.customer;
  } catch (e) {
    return { error: { message: e?.message, code: 500 } };
  }
};

export async function generateMetadata({ params }) {
  "use cache";
  const { customerId } = await params;
  const customer = await getSingleCustomer(customerId);

  if (customer?.error) {
    return {
      title: "Customer not Found!",
    };
  }

  return {
    title: `Customer | ${customer?.name}`,
    openGraph: {
      title: `Customer | ${customer?.name}`,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function CustomerDetailPage({ params }) {
  const { customerId } = await params;
  const customer = await getSingleCustomer(customerId);

  if (customer?.error) {
    return (
      <main className="mx-auto  w-full max-w-xl space-y-4">
        <Card className="space-y-5">
          <div>
            <h2 className="text-xl font-medium">
              <FontAwesomeIcon icon={faCircleInfo} />
              <span>Error</span>
            </h2>
            <p className="text-base text-muted">{customer?.error?.message}</p>
          </div>
          <button className="bg-primary rounded">Retry</button>
        </Card>
      </main>
    );
  }

  return <SingleCustomerInfo customer={customer} />;
}
