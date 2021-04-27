function refreshWinners() {
  document.getElementById('subs-winners').innerHTML = '';

  const data = JSON.parse(localStorage.getItem('cht-subs-csv'));
  const winners = JSON.parse(localStorage.getItem('cht-subs-winners'));

  winners.forEach((winner, idx) => {
    const divWinner = document.createElement('div');
    divWinner.className = 'sub-badge sub-winner';

    const divSubUsername = document.createElement('div');
    divSubUsername.className = 'sub-username';
    divSubUsername.innerHTML = `${idx + 1} - ${data[winner].name}`;
    divWinner.appendChild(divSubUsername);

    document.getElementById('subs-winners')
      .appendChild(divWinner);
  });
}

document.getElementById('pick-button')
  .addEventListener('click', () => {
    const subs = JSON.parse(localStorage.getItem('cht-subs-sort') || '[]');
    const winners = JSON.parse(localStorage.getItem('cht-subs-winners') || '[]');

    if (subs.length === winners.length) {
      alert('Todos os inscritos foram sorteados');
      return;
    }

    let picked = Math.floor(Math.random() * (subs.length));
    let valid = false;
    let winner = -1;

    do {
      picked = Math.floor(Math.random() * (subs.length));
      winner = subs[picked];
      valid = winners.find(i => i === winner) === undefined;
      if (valid) {
        winners.push(winner);
      }
    } while (!valid);

    document.getElementById('num-winners').innerHTML = `(${winners.length})`;
    localStorage.setItem('cht-subs-not', JSON.stringify(
      subs.filter((item, idx) => idx !== picked)
    ));

    localStorage.setItem('cht-subs-winners', JSON.stringify(winners));
    refreshWinners();
  });
