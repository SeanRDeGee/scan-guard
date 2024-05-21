<script lang="ts" setup>
    const scanGuardAPI = useScanGuardAPI()
    const jobStore = useJobStore()

    const ip = ref<string>('')
    const formError = ref<string>('')
    const isExecuting = ref<boolean>(false)

    const executeJob = async () => {
        const isFormValid = validateForm()

        if (!isFormValid) return

        try {
            isExecuting.value = true
            await scanGuardAPI.post('/jobs', { type: 'single-host', payload: { ip: ip.value } })
            await jobStore.fetchJobs()
        } catch (error) {
            formError.value = 'Failed to execute job'
        }

        isExecuting.value = false
    }

    const validateForm = () => {
        if (!ip.value) {
            formError.value = '⚠️ IP is required'
            return false
        }

        // validate that the ip is a valid ip address
        const ipRegex = new RegExp(
            '^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
                '([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
                '([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.' +
                '([01]?\\d\\d?|2[0-4]\\d|25[0-5])$'
        )

        if (!ipRegex.test(ip.value)) {
            formError.value = '⚠️ Invalid IP address'
            return false
        }

        formError.value = ''
        return true
    }
</script>

<template>
    <form on-submit.prevent class="job-single-host-scan">
        <header class="job-single-host-scan__header">
            <h1 class="job-single-host-scan__title">Single Host Scan</h1>
            <FieldButton @click="executeJob" :disabled="isExecuting"><span>Execute</span></FieldButton>
        </header>
        <div v-if="formError" class="job-single-host-scan__error">
            <p>{{ formError }}</p>
        </div>
        <FieldText v-model:value="ip" label="Host IP" />
    </form>
</template>

<style lang="scss" scoped>
    .job-single-host-scan {
        padding: 1rem;

        display: grid;
        row-gap: 1rem;

        background-color: var(--clr-background-01);
        border-radius: 0.5rem;

        &__header {
            padding-bottom: 1rem;

            align-items: center;
            column-gap: 0.5rem;
            display: grid;
            grid-template-columns: 1fr auto;

            border-bottom: 1px solid var(--clr-border-00);
        }

        &__title {
            color: var(--clr-text-00);
            font-size: 1.25rem;
        }

        &__error {
            padding: 0.75rem 1rem;

            background-color: var(--clr-status-red-background-00);

            border-radius: 0.25rem;
            color: var(--clr-status-red-type-00);

            font-size: 0.875rem;
        }
    }
</style>
