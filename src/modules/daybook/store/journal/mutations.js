// export const myMutations = (state) => {
    //  
    // }

export const setEntries = (state, entrie) => {
    state.entries = [...state.entries, ...entrie]
    state.isLoading = false
}

export const updateEntries = (state, entrie) => {

   const idx = state.entries.map(e => e.id).indexOf(entrie.id)
   state.entries[idx] = entrie

}

export const addEntry = (state, entry) => {
    state.entries = [entry, ...state.entries]    
}

export const deleteEntry = (state, idEntry) => {
    state.entries = state.entries.filter(entry => entry.id !== idEntry)
}

export const clearEntries = (state) => {
    state.entries = []
}