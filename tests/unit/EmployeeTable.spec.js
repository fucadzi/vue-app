import { shallowMount } from '@vue/test-utils'
import EmployeeTable from '@/components/EmployeeTable.vue'

describe('EmployeeTable.vue', () => {
    describe('Displaying employee list', () => {
        it('Employee info is displayed in table', () => {
            const employees = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'jon@example.com'
                }
            ];
            const wrapper = shallowMount(EmployeeTable, {
                propsData: {
                    employees
                }
            });
            const name = wrapper.find('.name');
            const email = wrapper.find('.email');

            expect(name.text()).toMatch('John Doe');
            expect(email.text()).toMatch('jon@example.com');
        });

        it('Displaying edit mode with inputs and employee info', () => {
            const employees = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'jon@example.com'
                }
            ];
            const wrapper = shallowMount(EmployeeTable, {
                propsData: {
                    employees
                }
            });
            wrapper.find('button.edit').trigger('click');

            expect(wrapper.find('input.name').element.value).toContain('John Doe');
            expect(wrapper.find('input.email').element.value).toContain('jon@example.com');
            expect(wrapper.contains('button.save')).toBe(true);
            expect(wrapper.contains('button.cancel')).toBe(true);
        })

        it('If employee array is empty, display message', () => {
            const employees = [];
            const wrapper = shallowMount(EmployeeTable, {
                propsData: {
                    employees
                }
            });
            const p = wrapper.find('p');

            expect(p.classes()[0]).toBe('empty-table');
            expect(p.text()).toMatch('No employees');
        });
    });

    describe('Action buttons', () => {
        it('Edit button sets edit mode for clicked employee', () => {
            const employees = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'jon@example.com'
                }
            ];
            const wrapper = shallowMount(EmployeeTable, {
                propsData: {
                    employees
                }
            });
            wrapper.find('button.edit').trigger('click');

            expect(wrapper.vm.editing).toBe('1');
        })

        it('Delete button should emit delete event with person\'s id', () => {
            const employees = [
                {
                    id: '2',
                    name: 'John Doe',
                    email: 'jon@example.com'
                }
            ];
            const wrapper = shallowMount(EmployeeTable, {
                propsData: {
                    employees
                }
            });
            wrapper.find('button.delete').trigger('click');

            expect(wrapper.emitted('delete:employee')).toBeTruthy();
            expect(wrapper.emitted('delete:employee')[0]).toEqual(['2']);
        });
    });

    describe('Editing employee', () => {
        it('Employee info is edited and saved', () => {
            const employees = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'jon@example.com'
                }
            ];
            const wrapper = shallowMount(EmployeeTable, {
                propsData: {
                    employees
                }
            });
            wrapper.find('button.edit').trigger('click');

            let name = wrapper.find('input.name');
            let email = wrapper.find('input.email');
            name.element.value = 'Jane Doe'
            email.element.value = 'jane@example.com';
            name.trigger('input');
            email.trigger('input');

            wrapper.find('button.save').trigger('click');

            expect(wrapper.find('.name').text()).toMatch('Jane Doe');
            expect(wrapper.find('.email').text()).toMatch('jane@example.com');
        });

        it('When editing is canceled, employee info doesn\'t change', () => {
            const employees = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'jon@example.com'
                }
            ];
            const wrapper = shallowMount(EmployeeTable, {
                propsData: {
                    employees
                }
            });
            wrapper.find('button.edit').trigger('click');

            let name = wrapper.find('input.name');
            name.element.value = 'Jane Doe'
            name.trigger('input');

            wrapper.find('button.cancel').trigger('click');

            expect(wrapper.find('.name').text()).toMatch('John Doe');
        })
    })

});