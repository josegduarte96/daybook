// export const myGetters = (state) => {
//     return state.algo....
// }

export const getEntriesByTerm = (state) => (term = '') => {
    
    if(term.length === 0) return state.entries

    return state.entries.filter(entrie => entrie.text.toLowerCase().includes(term.toLowerCase()))
}

export const getEntryById = (state) => id => {
    const entry = state.entries.find(entrie => entrie.id === id)
    if(entry == null) return 
    
    return {
        ...entry
    }

}