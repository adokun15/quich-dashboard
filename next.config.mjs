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
};

export default nextConfig;
