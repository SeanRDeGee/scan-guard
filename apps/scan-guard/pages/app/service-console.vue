<script lang="ts" setup>
    const requestsStore = useRequestsStore()

    await requestsStore.makeIsNmapInstalledRequest()
</script>

<template>
    <div class="service-console">
        <header class="service-console__header">
            <h1 class="service-console__header__title">Service Console</h1>
        </header>
        <div v-if="requestsStore.isNmapInstalled">
            <p>Nmap is installed</p>
        </div>
        <div v-else>
            <p>Nmap is not installed</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .service-console {
        padding: 1.5rem;

        align-content: start;
        display: grid;
        row-gap: 1.5rem;

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
