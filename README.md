# @odyzeo/form-select

## Getting started
### Install
```sh
npm install @odyzeo/form-select
```

```sh
yarn add @odyzeo/form-select
```

### Import
```js
import Vue from 'vue';
import FormSelect from '@odyzeo/form-select';
Vue.use(FormSelect);
```

### Use it
```html
<template>
    <form
        ref="form"
        novalidate
        @submit.prevent="submit"
    >
        <form-select
            :ref="invoice_country_id.name"
            v-model="country"
            :input="input"
            :form-errors="errors"
        >
        </form-select>
    </form>
</template>

<script>
export default {
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
                validatorEvent: 'onBlurThenOnChange',
                validators: [
                    {
                        validator: 'required',
                        message: 'Please choose one',
                    },
                ],
            },
            errors: [],
        };
    },
    methods: {
        submit() {
            this.$formSelect.validate();
        },
    },
}
</script>
```

Check the detailed docs for more information and options.

## Changelog
Detailed changes for each release are documented in [CHANGELOG.md](https://github.com/odyzeo/form-select/blob/master/CHANGELOG.md)

## Issues

## TODO