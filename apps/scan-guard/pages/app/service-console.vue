<template>
    <div class="service-console">
        <header class="service-console__header">
            <h1 class="service-console__header__title">Service Console</h1>
        </header>
        <NmapStatusWidget />
    </div>
</template>

<style lang="scss" scoped>
    .service-console {
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
