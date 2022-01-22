import {shallowMount} from '@vue/test-utils'
import About from '@/views/About'


describe('Pruebas en About view', () => {

    test('El componente debe renderizar correctamente', () => {
        const wrapper = shallowMount( About )
        expect(wrapper.html()).toMatchSnapshot()
    })


})