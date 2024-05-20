<script lang="ts" setup>
    import type { ResponseNmapVersion } from '@scan-guard/api/interfaces'
    const scanGuardAPI = useScanGuardAPI()

    const nmapVersion = ref<string | null>(null)
    const nmapInstalled = computed(() => nmapVersion.value !== null)

    try {
        const response = await scanGuardAPI.get<ResponseNmapVersion>('nmap/version')

        if (response.data.status === 200 && response.data.data) {
            nmapVersion.value = response.data.data
        }
    } catch (error) {}
</script>

<template>
    <div class="nmap-status-widget">
        <div class="nmap-status-widget__label">
            <svg-eye />
            <h2>Nmap Service Status</h2>
        </div>
        <div
            :class="[
                'nmap-status-widget__indicator',
                { 'nmap-status-widget__indicator--online': nmapInstalled },
                { 'nmap-status-widget__indicator--offline': !nmapInstalled },
            ]"
        >
            <span>{{ nmapInstalled ? 'Online' : 'Offline' }}</span>
        </div>
        <div v-if="nmapVersion" class="nmap-status-widget__version">
            <span>{{ nmapVersion }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .nmap-status-widget {
        padding: 0.8rem 1.25rem;

        align-items: center;
        column-gap: 1rem;
        display: grid;
        grid-template-columns: 1fr auto auto;

        background-color: var(--clr-background-01);
        border-radius: 0.5rem;
        color: var(--clr-text-00);

        .nmap-status-widget__label {
            align-items: center;
            column-gap: 0.5rem;
            display: grid;
            grid-template-columns: auto 1fr;
        }

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

        &__version {
            padding: 0.5rem 1rem;

            background-color: var(--clr-background-02);
            border-radius: 0.25rem;
        }
    }
</style>
