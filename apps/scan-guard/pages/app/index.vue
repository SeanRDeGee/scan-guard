<template>
    <div class="app-home">
        <header class="app-home__header">
            <h1 class="app-home__header__title">ScanGuard Tools</h1>
        </header>
    </div>
</template>

<style lang="scss" scoped>
    .app-home {
        padding: 1.5rem;

        align-content: start;
        display: grid;
        row-gap: 1.5rem;

        animation: var(--anim-drop-appear);

        &__header {
            &__title {
                padding-bottom: 1rem;

                border-bottom: 1px solid var(--clr-border-primary);
                color: var(--clr-text-secondary);

                font-size: 1.5rem;
            }
        }
    }
</style>
