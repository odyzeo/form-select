import { shallowMount } from '@vue/test-utils';
import FormSelect from '@/components/FormSelect.vue';

const input = {
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
};

describe('FormSelect.vue', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(FormSelect, {
            propsData: { input },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should render all options properly', () => {
        expect(wrapper.findAll('option').length).toEqual(3);
    });

    it('should render first option with label from props', () => {
        const firstOption = wrapper.find('option');
        expect(firstOption.text()).toMatch(input.label);
    });

    it('should push error on validation', () => {
        wrapper.vm.validate();
        expect(wrapper.vm.errors.length).toBe(1);
    });

    it('should display validation error', () => {
        wrapper.vm.validate();
        expect(wrapper.find('[data-test=error-fe]').exists()).toBe(true);
    });
});

describe('FormSelect.vue with backend errors', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(FormSelect, {
            propsData: {
                input,
                formErrors: ['Please choose one'],
            },
        });
    });

    afterEach(() => {
        wrapper.destroy();
    });

    it('should have showFormErrors value true', () => {
        expect(wrapper.vm.showFormErrors).toBe(true);
    });

    it('should render errors', () => {
        expect(wrapper.contains('[data-test=error-be]')).toBe(true);
    });
});
