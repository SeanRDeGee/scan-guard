<script lang="ts" setup>
    const requestsStore = useRequestsStore()

    await requestsStore.makeIsNmapInstalledRequest()
</script>

<template>
    <div class="nmap-status-widget">
        <div><h2>Nmap Service Status</h2></div>
        <div
            :class="[
                'nmap-status-widget__indicator',
                { 'nmap-status-widget__indicator--online': requestsStore.isNmapInstalled },
                { 'nmap-status-widget__indicator--offline': !requestsStore.isNmapInstalled },
            ]"
        >
            <span>{{ requestsStore.isNmapInstalled ? 'Online' : 'Offline' }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .nmap-status-widget {
        padding: 0.8rem 1.25rem;

        align-items: center;
        display: grid;
        grid-template-columns: 1fr auto;

        background-color: var(--clr-background-secondary);
        border-radius: 0.5rem;
        color: var(--clr-text-secondary);

        &__indicator {
            padding: 0.5rem 1rem;

            border-radius: 0.25rem;

            transition: background-color 0.25s ease, border-color 0.25s ease;

            &--online {
                background-color: var(--clr-status-green-background-00);
                color: var(--clr-status-green-type-00);
            }

            &--offline {
                background-color: var(--clr-status-red-background-00);
                color: var(--clr-status-red-type-00);
            }
        }
    }
</style>
