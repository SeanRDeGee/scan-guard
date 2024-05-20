<script lang="ts" setup></script>

<template>
    <nav class="app-navigation">
        <svg-scanguard-logo-full class="app-navigation__logo" />
        <ul class="app-navigation__menu-items">
            <li class="app-navigation__menu-item">
                <NuxtLink
                    to="/app"
                    :class="[
                        'app-navigation__menu-item__link',
                        { 'app-navigation__menu-item__link--selected': $route.path === '/app' },
                    ]"
                >
                    <svg-house />
                    <span>Home</span>
                </NuxtLink>
            </li>
            <li class="app-navigation__menu-item">
                <NuxtLink
                    to="/app/service-console"
                    :class="[
                        'app-navigation__menu-item__link',
                        { 'app-navigation__menu-item__link--selected': $route.path === '/app/service-console' },
                    ]"
                >
                    <svg-gear-code />
                    <span>Service Console</span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
    .app-navigation {
        padding: 1.5rem;

        display: grid;
        grid-template-rows: auto 1fr;
        row-gap: 1.5rem;

        background-color: var(--clr-background-01);
        border-right: 1px solid var(--clr-border-00);

        &__logo {
            height: auto;
            width: 10rem;
        }

        &__menu-items {
            align-content: start;
            display: grid;
            row-gap: 0.5rem;
        }

        &__menu-item {
            &__link {
                padding: 0.5rem 1rem;

                align-items: center;
                column-gap: 0.5rem;
                display: grid;
                grid-template-columns: auto 1fr;

                border-radius: 0.25rem;
                color: var(--clr-text-00);

                transition: background-color 0.2s;

                &:hover {
                    background-color: var(--clr-menu-item-background);
                }

                &--selected {
                    background-color: var(--clr-menu-item-background);
                    color: var(--clr-text-01);
                }
            }
        }
    }
</style>
