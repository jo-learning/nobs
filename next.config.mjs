/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ti'],  // Define your supported languages (English and Tigrigna)
    defaultLocale: 'en',    // Set your default language
    localeDetection: false, // Disable automatic locale detection (optional)
  },
};

export default nextConfig;
