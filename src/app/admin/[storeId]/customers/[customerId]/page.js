//Single Customer Page!
import Card from "@/components/card";
import SingleCustomerInfo from "@/components/SingleCustomerInfo";
import { faCircleInfo, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cacheTag } from "next/cache";
import { cookies } from "next/headers";

const getSingleCustomer = async (id) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("quich_token")?.value;

    if (!token) {
      return redirect("/login");
    }

    //Fetch data if token exist;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUICH_BACKEND_API}/customers/${id}`,
      {
        method: "GET",
        headers: {
          Cookie: `quich_token=${token}`,
        },
        cache: "no-store",
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
  // Get User Cookies first: 30mins
  const cookie = await cookies();
  const user_token = cookie?.get("quichshop_access_token");

  const { customerId } = await params;
  const customer = await getSingleCustomer(customerId, user_token);

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
