/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
};

const withTM = require("next-transpile-modules")([
    "@fullcalendar/common",
    "@fullcalendar/daygrid",
    "@fullcalendar/interaction",
    "@fullcalendar/react"
]);

module.exports = withTM(nextConfig);
