import { mount } from '@vue/test-utils';
import EmployeeForm from '@/components/EmployeeForm.vue';

describe('EmployeeForm.vue', () => {
    it('Employee add event emitted after form submit and form is cleared', () => {        
        const wrapper = mount(EmployeeForm, {});

        let name = wrapper.find('input.form-name');
        let email = wrapper.find('input.form-email');
        name.element.value = 'John Doe'
        email.element.value = 'john@example.com';
        name.trigger('input');
        email.trigger('input');

        wrapper.find('button.form-submit').trigger('click');

        expect(wrapper.emitted('add:employee'));
        expect(name.element.value).toMatch('');
        expect(email.element.value).toMatch('');
    });

    it('Submitting empty form fails and displays error message', () => {        
        const wrapper = mount(EmployeeForm, {});

        wrapper.find('form').trigger('submit');

        expect(wrapper.emitted('add:employee')).not.toBe(true);
        expect(wrapper.find('.error-message').text()).toMatch('Please fill out all required fields');
    });
});