const refreshWinners = () => {
  document.getElementById('subs-winners').innerHTML = ''

  const data = JSON.parse(localStorage.getItem(storageParticipants))
  const winners = JSON.parse(localStorage.getItem(storageWinners))

  winners.forEach((winner, idx) => {
    const divWinner = document.createElement('div')
    divWinner.className = 'sub-badge sub-winner'

    const divSubUsername = document.createElement('div')
    divSubUsername.className = 'sub-username'
    divSubUsername.innerHTML = `${idx + 1} - ${data[winner].name}`
    divWinner.appendChild(divSubUsername)

    document.getElementById('subs-winners')
      .appendChild(divWinner)
  })
}

document.getElementById('pick-button')
  .addEventListener('click', () => {
    const subs = JSON.parse(localStorage.getItem('cht-subs-sort') || '[]')
    const winners = JSON.parse(localStorage.getItem('cht-subs-winners') || '[]')
    const winnerAgain = localStorage.getItem(storageWinnerAgain) === "true"
    if (subs.length === 0) {
      alert('Não há participantes')
      return
    }
    
    if (subs.length <= winners.length && !winnerAgain) {
      alert('Todos os inscritos foram sorteados')

      return
    }

    let picked = Math.floor(Math.random() * (subs.length))
    let valid = false
    let winner = -1
    do {
      picked = Math.floor(Math.random() * (subs.length))
      winner = subs[picked]
      valid = winners.find(i => i === winner) === undefined || winnerAgain
      if (valid) {
        winners.push(winner)
      }
    } while (!valid)

    document.getElementById('num-winners').innerHTML = `(${winners.length})`
    localStorage.setItem(storageNotWinner, JSON.stringify(
      subs.filter((item, idx) => idx !== picked)
    ))

    localStorage.setItem(storageWinners, JSON.stringify(winners))
    refreshWinners()
  })
