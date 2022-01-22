
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']


const getDayMonthYear = (stringDate) => {

    const date = new Date(stringDate)
    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        year: `${date.getFullYear()}, ${days[date.getDay()]}`
    }

}

export default getDayMonthYear