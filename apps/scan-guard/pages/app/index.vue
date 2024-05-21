<script lang="ts" setup>
    const jobStore = useJobStore()
</script>

<template>
    <div class="app-home">
        <header class="app-home__header">
            <h1 class="app-home__header__title">ScanGuard Tools</h1>
        </header>
        <div class="app-home__content">
            <JobSingleHostScan />
            <JobList />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .app-home {
        padding: 1.5rem;

        align-content: start;
        display: grid;

        animation: var(--anim-drop-appear);

        &__header {
            &__title {
                padding-bottom: 1rem;

                border-bottom: 1px solid var(--clr-border-00);
                color: var(--clr-text-00);

                font-size: 1.5rem;
            }
        }

        &__content {
            padding: 2rem 0;

            display: grid;
            row-gap: 2rem;
        }
    }
</style>
