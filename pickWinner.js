function refreshWinners() {
  document.getElementById('subs-winners').innerHTML = '';
  const winners = JSON.parse(localStorage.getItem('cht-subs-winners'));
  winners.forEach((winner, idx) => {
    const divWinner = document.createElement('div');
    divWinner.className = 'sub-badge sub-winner';

    const divSubUsername = document.createElement('div');
    divSubUsername.className = 'sub-username';
    divSubUsername.innerHTML = `${idx + 1} - ${winner[0]}`;
    divWinner.appendChild(divSubUsername);

    document.getElementById('subs-winners')
      .appendChild(divWinner);
  });
}

document.getElementById('pick-button')
  .addEventListener('click', () => {
    const subs = JSON.parse(localStorage.getItem('cht-subs-not'));

    const subsLength = subs.length;
    if (subsLength === 0) {
      alert('Todos os inscritos foram sorteados');
      return;
    }

    const picked = Math.floor(Math.random() * (subsLength));
    const winner = subs[picked];

    let subsPicked = localStorage.getItem('cht-subs-winners');
    if (subsPicked) {
      subsPicked = subsPicked = JSON.parse(subsPicked);
    } else {
      subsPicked = [];
    }

    if (!subsPicked.find(i => i[0] && i[0] === winner[0])) {
      subsPicked.push(winner);
    }

    document.getElementById('num-winners').innerHTML = `(${subsPicked.length})`;
    localStorage.setItem('cht-subs-not', JSON.stringify(
      subs.filter((item, idx) => idx !== picked)
    ));
    localStorage.setItem('cht-subs-winners', JSON.stringify(subsPicked));
    refreshWinners();
  });
