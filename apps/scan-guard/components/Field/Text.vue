<script lang="ts" setup>
    defineProps({
        label: {
            type: String as PropType<string>,
            required: false,
        },
        required: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: true,
        },
        autofocus: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: false,
        },
    })

    const value = defineModel('value', { type: String as PropType<string>, required: false })
</script>

<template>
    <div class="field-text">
        <label v-if="label" class="field-text__label"
            >{{ label }}<span v-if="required" class="field-text__asterisk">*</span></label
        >
        <div class="field-text__input-wrapper">
            <input type="text" class="field-text__input" v-model="value" :autofocus="autofocus" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .field-text {
        display: grid;
        gap: 0.75rem;

        &__label {
            color: var(--clr-text-00);

            font-size: 1rem;
        }

        &__asterisk {
            margin-left: 0.25rem;

            color: var(--clr-asterisk-00);
        }

        &__input-wrapper {
            background-color: var(--clr-input-background-00);
            border-radius: 0.25rem;
            border: 1px solid var(--clr-input-border-00);

            transition: border-color 0.2s ease-in-out;

            &:focus-within {
                border-color: var(--clr-input-border-01);
            }
        }

        &__input {
            height: 100%;
            padding: 0.25rem 0.75rem;
            width: 100%;

            background: none;
            border: none;
            color: var(--clr-text-01);

            font-family: 'Teachers';
            font-size: 1rem;
        }
    }
</style>
