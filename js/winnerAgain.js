const changeTooltipWinner = () => {
    const on = document.getElementById('tooltip-winner-on')
    const off = document.getElementById('tooltip-winner-off')
    if (document.getElementById('winner-again').checked) {
        on.className = on.className.replace('tooltip-on-unable', '')
        off.className = `${off.className} tooltip-off-unable`
    } else {
        off.className = off.className.replace('tooltip-off-unable', '')
        on.className = `${on.className} tooltip-on-unable`
    }
}

const changeWinnerAgain = () => {
    localStorage.setItem(
        storageWinnerAgain, 
        document.getElementById('winner-again').checked
    )

    changeTooltipWinner()
}

const changeWinnerInLabel = () => {
    document.getElementById('winner-again').checked = !document.getElementById('winner-again').checked
    changeWinnerAgain()
}

document.getElementById('winner-again')
    .addEventListener('click', changeWinnerAgain)