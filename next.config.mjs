/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fcjjonixemxsnkqirwsj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/quich/**",
      },
    ],
  },
  logging: {
    browserToterminal: true,
  },
  cacheComponents: true,
  cacheLife: {
    single_product: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    products: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    single_category: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    category: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    orders: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    single_order: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    customers: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    single_customer: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    store: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    merchant: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
    billing: {
      stale: 3600, // 1 hour
      revalidate: 900, // 15 minutes
      expire: 86400, // 1 day
    },
  },
};

export default nextConfig;
