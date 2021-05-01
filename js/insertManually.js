const insertManually = () => {
    if (document.getElementById('input-one-sub').value.replace(/\s/g, '').length === 0) {
        return
    }

    const input = document.getElementById('input-one-sub').value.split(',')
    const subs = JSON.parse(localStorage.getItem(storageParticipants))
    const data = [
        ...subs, 
        ...input.map(i => ({ name: i, date: new Date() }))
    ]

    localStorage.setItem(
        storageParticipants, 
        JSON.stringify(data)
    )

    localStorage.setItem(
        storageSort, 
        JSON.stringify(data.map((i, d) => d))
    )

    renderSubs(data)
    
    document.getElementById('input-one-sub').value = ''
}