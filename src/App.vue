<template>
    <div
        id="app"
        class="app"
    >
        <div class="container">
            <h1>Form select</h1>
            <form
                ref="form"
                novalidate
                @submit.prevent="submit"
            >
                <form-select
                    :ref="invoice_country_id.name"
                    v-model="invoice_country_id.value"
                    :input="invoice_country_id"
                    :form-errors="errors"
                    :data-test="`form-select-${invoice_country_id.name}`"
                    group-name="form-select-1"
                    tab-index="1"
                ></form-select>
                <form-select
                    :ref="user_country_id.name"
                    v-model="user_country_id.value"
                    :input="user_country_id"
                    :form-errors="errors"
                    :data-test="`form-select-${user_country_id.name}`"
                    group-name="form-select-2"
                    tab-index="2"
                ></form-select>
                <button
                    class="btn-validate"
                    tab-index="3"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            invoice_country_id: {
                name: 'invoice_country_id',
                options: [
                    {
                        id: 1,
                        name: 'Slovakia',
                    },
                    {
                        id: 2,
                        name: 'Czechia',
                    },
                ],
                label: 'Select country',
                value: null,
                required: true,
                validatorEvent: 'onBlur',
            },
            user_country_id: {
                name: 'user_country_id',
                options: [
                    {
                        id: 1,
                        name: 'Slovakia',
                    },
                    {
                        id: 2,
                        name: 'Czechia',
                    },
                ],
                label: 'Select country',
                value: null,
                required: true,
                validatorEvent: 'onBlurThenOnChange',
            },
            errors: [],
        };
    },
    methods: {
        submit() {
            this.$formSelect.validate();
        },
    },
};
</script>


<style lang="less">
@import '../src/less/app.less';
</style>
