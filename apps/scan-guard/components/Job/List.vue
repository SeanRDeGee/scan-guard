<script lang="ts" setup>
    const jobStore = useJobStore()

    await jobStore.fetchJobs()
</script>

<template>
    <div class="job-list">
        <header class="job-list__header">
            <h1 class="job-list__title">
                <svg-rocket />
                <span>Jobs</span>
            </h1>
        </header>
        <ul class="job-list__list">
            <li v-for="job in jobStore.jobs" :key="job.id" class="job-list__item">
                <JobListItem :job="job" />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    .job-list {
        display: grid;
        row-gap: 1rem;

        &__header {
            padding-bottom: 1rem;

            border-bottom: 1px solid var(--clr-border-00);
        }

        &__title {
            align-items: center;
            column-gap: 0.5rem;
            display: grid;
            grid-template-columns: auto 1fr;

            color: var(--clr-text-00);

            font-size: 1.25rem;
        }

        &__list {
            display: grid;
            row-gap: 1rem;
        }
    }
</style>
