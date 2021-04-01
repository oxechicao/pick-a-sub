document.getElementById('subs-csv')
  .addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('Arquivo não selecionado');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result;
      const data = result.split('\n').map(i => i.split(','));
      const dataLength = data.length;
      document.getElementById('num-subs').innerHTML = `(${dataLength})`;

      const jsonData = JSON.stringify(
        data.reduce((acc, curr, idx) => {
          if (idx === 0 || idx >= (dataLength - 2)) return acc;
          if (idx === 1) acc = [];
          if (!acc.find(i => i[0] && i[0] === curr[0])) acc.push([curr[0], curr[1]]);
          return acc;
        }, [])
      );

      localStorage.setItem('cht-subs-csv', jsonData);
      localStorage.setItem('cht-subs-not', jsonData);

      data.forEach((row, rowIndex) => {
        if (rowIndex === 0 || rowIndex >= (dataLength - 2)) return;

        const username = row[0];
        const dataSub = row[1];

        const divSubBadge = document.createElement('div');
        divSubBadge.className = 'sub-badge';

        const divSubUsername = document.createElement('div');
        divSubUsername.className = 'sub-username';
        divSubUsername.innerHTML = username;

        const divSubDate = document.createElement('div');
        divSubDate.className = 'sub-date';
        divSubDate.innerHTML = new Date(dataSub).toLocaleString();

        divSubBadge.appendChild(divSubUsername);
        divSubBadge.appendChild(divSubDate);

        document.getElementById('subs-badge').appendChild(divSubBadge);
      });
    };

    fileReader.readAsBinaryString(e.target.files[0]);
  });
