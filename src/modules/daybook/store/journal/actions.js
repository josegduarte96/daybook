// export const myAction = async ({ commit }) => {

// }
import journalApi from '@/api/journalApi'


export const loadEntries = async ({commit}, username) => {
    const {data} = await journalApi.get('/entries.json')
    if(!data){
       return commit('setEntries', [])
    } 
    
    const entries = []
    for(let id of Object.keys(data)){
        if (data[id].username === username){
            entries.push({
                id,
                ...data[id]
            })
        }
    }

   
    commit('setEntries', entries)
}

export const updateEntry = async ({commit}, entry) => {
    const {data} = await journalApi.put('entries/' + entry.id + '.json', entry)
    commit('updateEntries', data)
}

export const createEntries = async ({ commit }, entry) => {
    const newEntry = entry
    console.log(entry)
    const {data} = await journalApi.post('entries.json', entry)
    newEntry.id = data.name
    commit('addEntry', newEntry)
    return data.name
}

export const deleteEntries = async ({commit}, id) => {
    await journalApi.delete('/entries/' + id + '.json')
    commit('deleteEntry', id)
}