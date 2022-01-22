import {shallowMount} from '@vue/test-utils'
import Home from '@/views/Home'


describe('Pruebas en Home view', () => {

    test('El componente debe renderizar correctamente', () => {
        const wrapper = shallowMount( Home )
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Hacer click en un boton debe redireccionar a una ruta no-entry ', () => {
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(Home, {
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()
    })
    
})