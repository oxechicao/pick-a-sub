function cleanAll() {
  localStorage.setItem('cht-subs-not', JSON.stringify([]));
  localStorage.setItem('cht-subs-winners', JSON.stringify([]));
  localStorage.setItem('cht-subs-csv', JSON.stringify([]));
  document.getElementById('subs-badge').innerHTML = '';
  document.getElementById('subs-winners').innerHTML = '';
  document.getElementById('subs-csv').value = '';
}

document.getElementById('clean-winners')
  .addEventListener('click', () => {
    cleanAll();
  });

function removeSub(index) {
  const subs = JSON.parse(localStorage.getItem('cht-subs-csv')).filter((i, idx) => idx !== index);
  localStorage.setItem('cht-subs-csv', JSON.stringify(subs));
  document.getElementById('subs-badge').innerHTML = '';
  renderSubs(subs);
}

function renderSubs(subs) {
  const data = subs || JSON.parse(localStorage.getItem('cht-subs-csv'));
  document.getElementById('num-subs').innerHTML = `(${data.length})`;

  data.forEach((row, rowIndex) => {
    const username = row[0];
    const dataSub = row[1];

    const divSubBadge = document.createElement('div');
    divSubBadge.className = 'sub-badge';

    const div = document.createElement('div');

    const divSubUsername = document.createElement('div');
    divSubUsername.className = 'sub-username';
    divSubUsername.innerHTML = username;

    const divSubDate = document.createElement('div');
    divSubDate.className = 'sub-date';
    divSubDate.innerHTML = new Date(dataSub).toLocaleString();

    div.appendChild(divSubUsername);
    div.appendChild(divSubDate);

    const imageTrash = document.createElement('div');
    imageTrash.className = 'sub-badge-close';
    imageTrash.id = `sub-remove-btn-${rowIndex}`;
    imageTrash.addEventListener('click', () => removeSub(rowIndex));

    divSubBadge.appendChild(div);
    divSubBadge.appendChild(imageTrash);

    document.getElementById('subs-badge').appendChild(divSubBadge);
  });

  const winners = JSON.parse(localStorage.getItem('cht-subs-winners')) || [];
  localStorage.setItem(
    'cht-subs-not',
    JSON.stringify(
      subs.filter(i => i[0] && !winners.find(w => w[0] && w[0] === i[0])))
  );
}
