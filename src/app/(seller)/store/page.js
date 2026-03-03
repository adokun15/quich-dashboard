import { getUser } from "@/server/user/GetUser";
import NavigateDashborad from "@/components/NavigateDashboard";
import Sidebar from "@/components/Sidebar";
import WhatsappCommunity from "@/components/WhatsappCommunity";
import ManageStore from "@/components/ManageStore";
import ControlHours from "@/components/ControlHours";
import AboutVideo from "@/components/AboutVideo";

export default async function Home() {
  const user = await getUser();

  return (
    <>
      <div className="flex flex-wrap gap-y-4 gap-x-6 py-1 min-h-screen dark:bg-black">
        <ManageStore />
        <WhatsappCommunity />
        <ControlHours />
        {/*<AboutVideo />*/}
      </div>
    </>
  );
}
/*
import { Info } from "lucide-react";
import DashboardAnalytics from "@/components/Analytics.jsx";
//import Button from "@/components/Button";
import { useGetUserQuery } from "@/state/endpoints/user.js";
import { useGetAllOrdersQuery } from "@/state/endpoints/orders.js";
import { Naira } from "@/helper/Naira.jsx";
import { useState } from "react";
import { DashboardSalesSkeleton } from "@/helper/Skeletons.jsx";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inviteToStore } from "@/helper/WhatappsRedirects.js";

export default function SellerHome() {
  const { data: user, isLoading: userLoading } = useGetUserQuery();

  console.log("USER DATA DASHBOARD HOME", user);
  const [saledate, setSalesDate] = useState("");
  // const [saleAmount, setSalesAmount] = useState(0);

  const onChangeSaleDate = (e) => {
    setSalesDate(e?.target?.value);
  };

  const {
    sales,
    saleToday,
    saleTodayActualProfit,
    salesActualProfit,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllOrdersQuery(null, {
    skip: !user?.link,
    selectFromResult: (res) => {
      return {
        ...res,
        saleToday: res?.data?.orders
          ?.filter((ord) => ord.status === "success")
          .map((order) => {
            const SalesDate = new Date(order?.paidAt);
            const TodayDate = new Date();
            return SalesDate.getDate() === TodayDate.getDate()
              ? order
              : { amount: 0 };
          })
          .reduce((acc, ord) => ord?.amount + acc, 0)
          .toLocaleString(),

        saleTodayActualProfit: res?.data?.orders
          ?.filter((ord) => ord.status === "success")
          .map((order) => {
            const SalesDate = new Date(order?.paidAt);
            const TodayDate = new Date();
            return SalesDate.getDate() === TodayDate.getDate()
              ? order
              : { actualProfitAmount: 0 };
          })
          .reduce((acc, ord) => ord?.actualProfitAmount + acc, 0)
          .toLocaleString(),

        salesActualProfit: res?.data?.orders
          ?.filter((ord) => ord.status === "success")
          .map((order) => {
            //Order --> {totalAmoun}
            let saleInfo = {};

            let currentDate = new Date();

            //Sale: (default -- alltime)
            saleInfo.profitAmount = order;

            if (saledate === "3-days") {
              const salesDate = new Date(order?.paidAt); //24
              currentDate.setDate(currentDate.getDate() - 3);
              saleInfo.profitAmount =
                currentDate.getTime() <= salesDate.getTime()
                  ? order
                  : { actualProfitAmount: 0 };
            }

            if (saledate === "7-days") {
              const salesDate = new Date(order?.paidAt); //24
              currentDate.setDate(currentDate.getDate() - 7);
              saleInfo.profitAmount =
                currentDate.getTime() <= salesDate.getTime()
                  ? order
                  : { actualProfitAmount: 0 };
            }

            if (saledate === "a-month") {
              const salesDate = new Date(order?.paidAt);
              currentDate.setDate(currentDate.getDate() - 30);
              saleInfo.profitAmount =
                currentDate.getTime() <= salesDate.getTime()
                  ? order
                  : { actualProfitAmount: 0 };
            }
            if (saledate === "a-year") {
              const saleDate = new Date(order?.paidAt);
              currentDate.setFullYear(currentDate.getFullYear() - 1);

              const milliSecondForSaleDate = saleDate.getTime();
              const milliSecondForYearAgo = currentDate.getTime();

              saleInfo.profitAmount =
                saleDate.getFullYear() - 1 === currentDate.getFullYear() &&
                milliSecondForYearAgo <= milliSecondForSaleDate
                  ? order
                  : { actualProfitAmount: 0 };
            }

            return saleInfo;
          })
          .reduce((acc, ord) => ord?.profitAmount?.actualProfitAmount + acc, 0)
          .toLocaleString(),

        sales: res?.data?.orders
          ?.filter((ord) => ord.status === "success")
          .map((order) => {
            let saleInfo = {};

            let currentDate = new Date();

            //Sale: (default -- alltime)
            saleInfo.totalAmount = order;

            if (saledate === "3-days") {
              const salesDate = new Date(order?.paidAt); //24
              currentDate.setDate(currentDate.getDate() - 3);
              saleInfo.totalAmount =
                currentDate.getTime() <= salesDate.getTime()
                  ? order
                  : { amount: 0 };
            }

            if (saledate === "7-days") {
              const salesDate = new Date(order?.paidAt); //24
              currentDate.setDate(currentDate.getDate() - 7);
              saleInfo.totalAmount =
                currentDate.getTime() <= salesDate.getTime()
                  ? order
                  : { amount: 0 };
            }

            if (saledate === "a-month") {
              const salesDate = new Date(order?.paidAt);
              currentDate.setDate(currentDate.getDate() - 30);
              saleInfo.totalAmount =
                currentDate.getTime() <= salesDate.getTime()
                  ? order
                  : { amount: 0 };
            }
            if (saledate === "a-year") {
              const saleDate = new Date(order?.paidAt);
              currentDate.setFullYear(currentDate.getFullYear() - 1);

              const milliSecondForSaleDate = saleDate.getTime();
              const milliSecondForYearAgo = currentDate.getTime();

              saleInfo.totalAmount =
                saleDate.getFullYear() - 1 === currentDate.getFullYear() &&
                milliSecondForYearAgo <= milliSecondForSaleDate
                  ? order
                  : { amount: 0 };
            }

            return saleInfo;
          })
          .reduce((acc, ord) => ord?.totalAmount?.amount + acc, 0)
          .toLocaleString(),
      };
    },
  });

  console.log(sales);
  return (
    <main>
      <h3 className="text-2xl my-3  px-2 py-1 rounded w-fit">Dashboard</h3>
      {(userLoading || isFetching || isLoading) && <DashboardSalesSkeleton />}

      {isError && <p className="text-center text-2xl">{error?.message}</p>}

      {!sales && error?.message.includes("Orders") && !isLoading && (
        <div className="space-y-3">
          <p className="mt-4">
            No Insight yet. Invite customers via WhatsApp to your store
          </p>
          <p
            onClick={() => inviteToStore(user?.link)}
            className="text-xl md:text-start text-center border space-x-2 w-fit bg-yellow-300 p-3 rounded"
          >
            <span>Invite Customers</span>

            <FontAwesomeIcon icon={faPeopleGroup} />
          </p>
        </div>
      )}

      {!isError && !userLoading && !isFetching && !isLoading && sales && (
        <div className="shadow p-4  space-y-3  rounded divide-y-2">
          <div className="md:text-2xl  text-xl">
            <article className="font-serif mb-4 flex flex-wrap md:space-y-0 space-y-4  justify-between items-center">
              <span className="text-3xl border-b-yellow-400 p-1 border-b-2 ">
                Total Sales Amount
              </span>
              <select
                onChange={onChangeSaleDate}
                className="border block mx-1 border-none outline-none shadow shadow-gray-400  px-2 p-1 rounded"
              >
                <option value="all-time">All time</option>
                <option value="3-days">Last three days</option>
                <option value="7-days">Last Seven days</option>
                <option value="a-month">Less than a Month</option>
                <option value="a-year">Less than a Year</option>
              </select>
            </article>
            <span className="block text-5xl font-oswald">
              <Naira size={50}>{sales || 0}</Naira>
            </span>
            <span>Net Earnings: {10200}</span>
            {" , "}
            <span>Total fee: {344}</span>
          </div>
          <p className="md:text-2xl space-y-2 text-xl pt-4">
            <span className="text-3xl  p-1  ">Today Sales</span>
            <span className="block text-5xl font-oswald">
              <Naira size={50}>{saleToday || 0}</Naira>
            </span>
            <span>Net Earning: {saleTodayActualProfit}</span>
          </p>
        </div>
      )}

      {/*<h3 className="text-2xl my-3  px-2 py-1 rounded w-fit">Store </h3>

      <DashboardAnalytics />
}

      {/*For delvery &&<h3 className="text-2xl my-3  px-2 py-1 rounded w-fit">Pending Order</h3>
      <div>
        You Have 12 Pending Orders.
        <Button clxName="bg-teal-800 text-white">Attend to this Orders</Button>
      </div>
      </main>
    );
  }
  */
