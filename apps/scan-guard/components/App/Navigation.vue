<template>
    <nav class="app-navigation">
        <svg-scanguard-logo-full class="app-navigation__logo" />
    </nav>
</template>

<style lang="scss" scoped>
    .app-navigation {
        padding: 1.5rem;

        display: grid;

        background-color: var(--background-secondary);
        border-right: 1px solid var(--border-primary);

        .app-navigation__logo {
            height: auto;
            width: 10rem;
        }
    }
</style>
