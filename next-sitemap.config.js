/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://nativecn-ui.vercel.app',
    generateRobotsTxt: true,
    exclude: ['/studio', '/studio/builder', '/analytics'], // Exclude interactive tools/dashboards from SEO
}
