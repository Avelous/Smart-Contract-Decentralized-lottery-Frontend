/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            "/": { page: "/" },
        }
    },
}

module.exports = {

  images: {
    loader: 'imgix',
    path: '/',
  },
}
