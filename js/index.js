const cleanAll = () => {
  localStorage.setItem(storageParticipants, JSON.stringify([]))
  localStorage.setItem(storageWinners, JSON.stringify([]))
  localStorage.setItem(storageNotWinner, JSON.stringify([]))
  localStorage.setItem(storageSort, JSON.stringify([]))
  localStorage.setItem(storageWinnerAgain, false)
  
  document.getElementById('subs-badge').innerHTML = ''
  document.getElementById('subs-winners').innerHTML = ''
  document.getElementById('subs-csv').value = ''
}

document.getElementById('clean-winners')
  .addEventListener('click', () => {
    cleanAll()
  })

function renderSubs() {
  const data = JSON.parse(localStorage.getItem('cht-subs-csv'))
  const sort = JSON.parse(localStorage.getItem('cht-subs-sort'))

  document.getElementById('num-subs').innerHTML = `(${sort.length})`

  sort.forEach((row, rowIndex) => {
    const username = data[row].name
    const dataSub = data[row].date

    const divSubBadge = document.createElement('div')
    divSubBadge.className = 'sub-badge'

    const div = document.createElement('div')

    const divSubUsername = document.createElement('div')
    divSubUsername.className = 'sub-username'
    divSubUsername.innerHTML = username

    const divSubDate = document.createElement('div')
    divSubDate.className = 'sub-date'
    divSubDate.innerHTML = new Date(dataSub).toLocaleString()

    div.appendChild(divSubUsername)
    div.appendChild(divSubDate)

    const imageTrash = document.createElement('div')
    imageTrash.className = 'sub-badge-close'
    imageTrash.id = `sub-remove-btn-${rowIndex}`
    imageTrash.addEventListener('click', () => removeSub(rowIndex))

    divSubBadge.appendChild(div)
    divSubBadge.appendChild(imageTrash)

    document.getElementById('subs-badge').appendChild(divSubBadge)
  })
}

function removeSub(index) {
  const subs = JSON.parse(localStorage.getItem('cht-subs-sort')).filter((i, idx) => idx !== index)
  localStorage.setItem('cht-subs-sort', JSON.stringify(subs))
  document.getElementById('subs-badge').innerHTML = ''
  renderSubs()
}

document.getElementById('btn-help')
  .addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'block'
  })

document.getElementById('close-btn-modal')
  .addEventListener('click', () => {
    document.getElementById('myModal').style.display = 'none'
  })

document.getElementById('btn-shuffle')
  .addEventListener('click', () => {
    const sort = JSON.parse(localStorage.getItem('cht-subs-sort'))
    let shuffle = [...sort]
    sort.forEach((i, indx) => {
      const j = Math.floor(Math.random() * (indx + 1))
      [shuffle[indx], shuffle[j]] = [shuffle[j], shuffle[indx]]
    })

    localStorage.setItem('cht-subs-sort', JSON.stringify(shuffle))
    document.getElementById('subs-badge').innerHTML = ''
    renderSubs()
  })
