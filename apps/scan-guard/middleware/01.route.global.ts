export default defineNuxtRouteMiddleware(async (to, _from) => {
    // Redirect to /app if the user navigates to /
    if (to.path === '/') return navigateTo('/app')
})
