<script lang="ts" setup>
    const requestsStore = useRequestsStore()

    const ip = ref<string>('')

    const formatTimestamp = (timestamp: number) => {
        return new Date(timestamp).toLocaleString()
    }

    await requestsStore.getRequests()
</script>

<template>
    <div class="single-ip-requests-widget">
        <header class="single-ip-requests-widget__header">
            <h2>Single IP Scan</h2>
        </header>
        <form class="single-ip-requests-widget__form">
            <FieldText v-model="ip" :autofocus="true" />
            <FieldButton @click.prevent="requestsStore.createSingleIPRequest(ip)">Scan</FieldButton>
        </form>
        <div class="single-ip-requests-widget__requests" v-if="requestsStore.singleIPRequests.length > 0">
            <header class="single-ip-requests-widget__requests__header">
                <h2>Requests</h2>
            </header>
            <ul class="single-ip-requests-widget__requests__list">
                <li v-for="request in requestsStore.singleIPRequests" class="single-ip-requests-widget__request">
                    <div class="single-ip-requests-widget__request__meta">
                        <div class="single-ip-requests-widget__request__timestamp">
                            {{ formatTimestamp(request.createdAt) }}
                        </div>
                        <div class="single-ip-requests-widget__request__ip">
                            {{ request.requestPayload.ip }}
                        </div>
                        <div
                            :class="[
                                'single-ip-requests-widget__request__status',
                                {
                                    'single-ip-requests-widget__request__status--complete':
                                        request.status === 'completed',
                                    'single-ip-requests-widget__request__status--failed': request.status === 'failed',
                                },
                            ]"
                        >
                            {{ request.status }}
                        </div>
                    </div>
                    <div v-if="request.status === 'completed'" class="single-ip-requests-widget__result-complete">
                        <div class="single-ip-requests-widget__host-status">
                            <p class="single-ip-requests-widget__host-status__label">Host Status</p>
                            <p
                                :class="[
                                    'single-ip-requests-widget__host-status__value',
                                    {
                                        'single-ip-requests-widget__host-status__value--reachable': request.data?.up,
                                        'single-ip-requests-widget__host-status__value--unreachable': !request.data?.up,
                                    },
                                ]"
                            >
                                {{ request.data?.up ? 'Reachable' : 'Unreachable' }}
                            </p>
                        </div>
                        <div v-if="request.data?.result?.ports" class="single-ip-requests-widget__ports">
                            <header class="single-ip-requests-widget__ports__header">
                                <div>Port</div>
                                <div>State</div>
                                <div>Service</div>
                            </header>

                            <div
                                v-for="port in request.data.result.ports"
                                :key="port.port"
                                class="single-ip-requests-widget__ports__value"
                            >
                                <div>{{ port.port }}</div>
                                <div>{{ port.state }}</div>
                                <div>{{ port.service }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-if="request.status === 'failed'" class="single-ip-requests-widget__result-failed"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .single-ip-requests-widget {
        max-height: 40rem;
        padding: 1rem 1.5rem;

        display: grid;
        grid-template-rows: auto auto 1fr;
        row-gap: 1rem;

        background-color: var(--clr-background-secondary);
        border-radius: 0.5rem;

        &__header {
            padding-bottom: 0.75rem;

            border-bottom: 1px solid var(--clr-border-primary);
            color: var(--clr-text-primary);

            font-size: 1.25rem;
        }

        &__form {
            display: grid;
            grid-template-columns: 1fr auto;
            column-gap: 0.5rem;

            input {
                padding: 0.5rem;
                border: 1px solid var(--clr-border-primary);
                border-radius: 0.25rem;
            }
        }

        &__requests {
            display: grid;
            overflow: hidden;
            row-gap: 1rem;

            animation: var(--anim-drop-appear);

            &__header {
                color: var(--clr-text-secondary);
                font-size: 1.25rem;
            }

            &__list {
                display: grid;
                row-gap: 1rem;
                overflow-y: auto;
            }
        }

        &__request {
            display: grid;
            row-gap: 1rem;

            animation: var(--anim-drop-appear);

            &__meta {
                align-items: center;
                column-gap: 1rem;
                display: grid;
                grid-template-columns: auto 1fr auto;
                justify-items: start;
            }

            &__timestamp {
                color: var(--clr-text-tertiary);

                font-size: 0.8rem;
            }

            &__ip {
                padding: 0.25rem 0.5rem;

                background-color: var(--clr-background-tertiary);
                border-radius: 0.25rem;
                color: var(--clr-text-secondary);
            }

            &__status {
                padding: 0.5rem;

                background-color: var(--clr-background-tertiary);
                border-radius: 0.25rem;
                color: var(--clr-text-secondary);

                &--complete {
                    background-color: var(--clr-status-green-background-00);
                    color: var(--clr-status-green-type-00);
                }
            }
        }

        &__result-complete {
            padding: 1rem;

            display: grid;
            row-gap: 1rem;

            background-color: var(--clr-background-primary);
            border-radius: 0.25rem;

            animation: var(--anim-drop-appear);
        }

        &__host-status {
            display: grid;
            grid-auto-flow: column;
            justify-content: start;

            font-size: 0.8rem;
            color: var(--clr-text-secondary);

            &__label,
            &__value {
                padding: 0.5rem;

                background-color: var(--clr-background-tertiary);
            }

            &__label {
                padding-left: 0.75rem;

                border-top-left-radius: 1rem;
                border-bottom-left-radius: 1rem;
            }

            &__value {
                padding-right: 0.75rem;

                border-top-right-radius: 1rem;
                border-bottom-right-radius: 1rem;

                &--reachable {
                    background-color: var(--clr-status-green-background-00);
                    color: var(--clr-status-green-type-00);
                }

                &--unreachable {
                    background-color: var(--clr-status-red-background-00);
                    color: var(--clr-status-red-type-00);
                }
            }
        }

        &__ports {
            display: grid;
            grid-template-columns: auto auto auto;
            justify-content: start;
            row-gap: 1rem;
            column-gap: 2rem;

            &__header {
                display: grid;
                grid-column: 1 / -1;
                grid-template-columns: subgrid;
                justify-content: start;

                background-color: var(--clr-background-tertiary);
                color: var(--clr-text-secondary);

                font-size: 0.8rem;

                div {
                    padding: 0.5rem 1rem;
                }
            }

            &__value {
                grid-column: 1 / -1;
                display: grid;
                grid-template-columns: subgrid;

                font-size: 0.8rem;
                color: var(--clr-text-secondary);

                div {
                    padding: 0.5rem 1rem;
                }
            }
        }
    }
</style>
