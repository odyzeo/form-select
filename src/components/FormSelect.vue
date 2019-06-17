<template>
    <div
        :class="{
            'form-select--filled': true,
            'form-select--error': isErrorClass,
            'form-select--no-label': true,
            'form-select--required': true,
            'form-select--readonly': true,
        }"
        class="form-select"
    >
        <label class="form-select__label">
            <select
                :value="localValue"
                :name="input.name"
                :disabled="input.disabled"
                class="form-select__input"
                @input="onInput($event)"
                @focus="focus"
                @blur="blur"
            >
                <option value="">
                    {{ input.label }}
                </option>
                <!-- eslint-disable-next-line vue/require-v-for-key -->
                <option
                    v-for="(option, key) in input.options"
                    :key="key"
                    :value="option.id"
                >
                    {{ option.name }}
                </option>
            </select>

            <span class="form-select__icon icon-arrow"></span>
        </label>
        <!-- eslint-disable vue/no-v-html -->
        <template v-if="showFormErrors">
            <div
                v-for="(error, key) in formErrors"
                :key="`error_${key}`"
                class="form-select__error"
                data-test="error-be"
                v-html="error"
            ></div>
        </template>
        <div v-else>
            <div
                v-for="(error, key) in errors"
                :key="`fe_error_${key}`"
                class="form-select__error"
                data-test="error-fe"
                v-html="error"
            ></div>
        </div>
        <!-- eslint-enable vue/no-v-html -->
    </div>
</template>

<script>
export default {
    props: {
        groupName: {
            type: String,
            default: '',
        },
        input: {
            type: Object,
            required: true,
        },
        formErrors: {
            type: [Array, Object],
            default: () => ([]),
        },
        value: {
            type: [String, Number],
            default: null,
        },
    },
    data() {
        return {
            localValue: this.value || '',
            errors: [],
            showFormErrors: (this.formErrors.length > 0),
            isCleared: false,
        };
    },
    computed: {
        isErrorClass() {
            return this.errors.length || (this.formErrors.length && this.showFormErrors);
        },
        validatorEvent() {
            return this.input.validatorEvent || 'none';
        },
        requiredMessage() {
            return (this.input.requiredMessage || 'This field is required');
        },
    },
    watch: {
        value(n) {
            this.localValue = (typeof n === 'undefined' || n === '') ? '' : n;
            /**
             * When value change hide errors.
             * @type {boolean}
             */
            this.showFormErrors = false;
            if (this.errors.length > 0) {
                this.validate();
            }
        },
        formErrors() {
            this.showFormErrors = true;
        },
    },
    created() {
        if (this.$formSelect) {
            this.$formSelect.event.$emit('subscribe', this);
        }
    },
    beforeDestroy() {
        if (this.$formSelect) {
            this.$formSelect.event.$emit('unsubscribe', this);
        }
    },
    methods: {
        focus() {
            this.$emit('focus');
        },
        blur(ev) {
            ev.target.value = this.localValue;
            this.setValidationType(ev);
            this.$emit('blur');
        },
        validate(scroll = false) {
            this.errors = [];
            if (this.isCleared) {
                this.isCleared = false;
                return;
            }

            if (
                this.input.required
                && (this.localValue === null || this.localValue === '')
            ) {
                this.errors.push(this.requiredMessage);
            }

            if (scroll && this.errors.length) {
                this.$el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        },
        clear() {
            this.isCleared = true;
            this.localValue = null;
        },
        setValidationType(ev) {
            if (
                (this.validatorEvent === 'onBlur' || this.validatorEvent === 'onBlurThenOnChange')
                && ev.type === 'blur'
            ) {
                this.validate();
            }

            if (
                (this.validatorEvent === 'onChange'
                || this.validatorEvent === 'onBlurThenOnChange')
                && ev.type === 'input'
            ) {
                this.validate();
            }
        },
        onInput(ev) {
            const { value } = ev.target;
            this.$emit('input', value);
            this.$nextTick(() => {
                this.setValidationType(ev);
            });
        },
    },
};
</script>

<style lang="less">
    @import '../less/form-select.less';
</style>
