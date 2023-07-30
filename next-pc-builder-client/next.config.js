/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com", "example.com"]
  }
};

module.exports = nextConfig;



// const nextConfig = {
//   target: "server",
//   reactStrictMode: true,
//   images: {
//     domains: ["m.media-amazon.com", "example.com"]
//   },
//   async rewrites() {
//     return [
//       // Rewrite the callback URL for NextAuth.js only
//       {
//         source: "/api/auth/:path*",
//         destination: "https://next-pc-builder-client.vercel.app/api/auth/:path*",
//       },
//     ];
//   },
// };

// module.exports = nextConfig;

