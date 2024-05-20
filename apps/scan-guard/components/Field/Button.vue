<script lang="ts" setup>
    defineProps({
        to: {
            type: String as PropType<string>,
            required: false,
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: false,
        },
        type: {
            type: String as PropType<'solid' | 'outline' | 'mono' | 'negative' | 'positive'>,
            required: false,
            default: 'solid',
        },
        size: {
            type: String as PropType<'small' | 'normal' | 'large'>,
            required: false,
            default: 'normal',
        },
    })
</script>

<template>
    <template v-if="to">
        <NuxtLink
            :to="disabled ? '' : to"
            class="field-button"
            :class="[disabled ? 'field-button--disabled' : `field-button--${type}`, `field-button--${size}`]"
            tabindex="0"
        >
            <slot></slot>
        </NuxtLink>
    </template>
    <template v-else>
        <button
            class="field-button"
            :class="[disabled ? 'field-button--disabled' : `field-button--${type}`, `field-button--${size}`]"
            :disabled="disabled"
            @click.prevent
            tabindex="0"
        >
            <slot></slot>
        </button>
    </template>
</template>

<style lang="scss" scoped>
    .field-button {
        all: unset;

        display: inline-grid;

        border-radius: 0.25rem;
        cursor: pointer;

        transition: background-color 0.2s, color 0.2s;

        &.field-button--small {
            padding: 0.5rem;
        }

        &.field-button--normal {
            padding: 0.5rem 1rem;
        }

        &.field-button--large {
            padding: 0.75rem 1.5rem;
        }

        &.field-button--solid {
            background-color: var(--clr-button-normal-background-00);
            border: 1px solid var(--clr-button-normal-border-00);
            color: var(--clr-text-02);

            :deep(p),
            :deep(span) {
                color: var(--clr-text-01);
            }

            &:hover {
                background-color: var(--clr-button-normal-background-01);
                border: 1px solid var(--clr-button-normal-border-01);
            }
        }

        &.field-button--outline {
            background-color: var(--clr-button-outline-background-00);
            border: 1px solid var(--clr-button-outline-border-00);

            &:hover {
                background-color: var(--clr-button-outline-background-01);
            }
        }

        &.field-button--mono {
            background-color: var(--clr-button-mono-background-00);
            border: 1px solid var(--clr-button-mono-border-00);

            &:hover {
                background-color: var(--clr-button-mono-background-01);
            }
        }

        &.field-button--negative {
            background-color: var(--clr-status-red-background-00);
            border: 1px solid var(--clr-status-red-border-00);
            color: var(--clr-status-red-type-00);

            :deep(p),
            :deep(span) {
                color: var(--clr-status-red-type-00);
            }

            &:hover {
                background-color: var(--clr-status-red-background-01);
            }
        }

        &.field-button--positive {
            background-color: var(--clr-status-green-background-00);
            border: 1px solid var(--clr-status-green-border-00);
            color: var(--clr-status-green-type-00);

            :deep(p),
            :deep(span) {
                color: var(--clr-status-green-type-00);
            }

            &:hover {
                background-color: var(--clr-status-green-background-01);
            }
        }

        &.field-button--disabled {
            color: var(--clr-type-01);
            background-color: var(--clr-button-disabled-background-00);
            border: 1px solid var(--clr-button-disabled-border-00);
            cursor: not-allowed;
        }
    }
</style>
