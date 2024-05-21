<script lang="ts" setup>
    import { DateTime } from 'luxon'
    import type { UnknownJob } from '@scan-guard/api/interfaces'

    const props = defineProps({
        job: {
            type: Object as PropType<UnknownJob>,
            required: true,
        },
    })

    const jobType = computed(() => {
        switch (props.job.type) {
            case 'single-host':
                return 'Single Host Scan'
            default:
                return 'Unknown'
        }
    })

    const relativeCreatedAt = computed(() => {
        return DateTime.fromMillis(props.job.createdAt).toRelative()
    })
</script>

<template>
    <div class="job-list-item">
        <div class="job-list-item__created">
            <span>{{ relativeCreatedAt }}</span>
        </div>
        <div class="job-list-item__type">
            <span>{{ jobType }}</span>
        </div>
        <div class="job-list-item__status">
            <div v-if="job.status === 'pending'" class="job-list-item__status__pending">
                <Spinner />
            </div>
            <div v-if="job.status === 'completed'" class="job-list-item__status__completed">
                <span>Completed</span>
            </div>
            <div v-if="job.status === 'failed'" class="job-list-item__status__failed">
                <span>Failed</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .job-list-item {
        padding: 0.75rem 1rem;

        align-items: center;
        column-gap: 1rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        justify-items: start;

        background-color: var(--clr-background-01);
        border-radius: 0.5rem;
        cursor: pointer;

        &__created {
            color: var(--clr-text-03);

            font-size: 0.85rem;
        }

        &__type {
            padding: 0.5rem 0.75rem;

            background-color: var(--clr-background-02);
            border-radius: 0.25rem;
            color: var(--clr-text-00);
        }

        &__status {
            display: grid;
            place-items: center;

            &__completed,
            &__failed {
                padding: 0.5rem 0.75rem;

                border-radius: 0.25rem;
            }

            &__completed {
                background-color: var(--clr-status-green-background-00);
                color: var(--clr-status-green-type-00);
            }

            &__failed {
                background-color: var(--clr-status-red-background-00);
                color: var(--clr-status-red-type-00);
            }
        }
    }
</style>
