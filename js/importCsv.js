const importCsv = (e) => {
  const file = e.target.files[0]
  if (!file) {
    alert('Arquivo não selecionado')
    return
  }

  const fileReader = new FileReader()
  fileReader.onload = () => {
    const result = fileReader.result
    const dataSplit = result.split('\n')
      .map(i => i.split(','))

    const data = dataSplit.reduce((acc, curr, idx) => {
      if (idx === 0 || idx >= (dataSplit.length - 2)) return acc
      if (idx === 1) acc = []
      if (!acc.find(i => i[0] && i[0] === curr[0])) acc.push({ name: curr[0], date: curr[1] })
      return acc
    }, [])


    const jsonData = JSON.stringify(data)
    localStorage.setItem(storageParticipants, jsonData)

    const jsonSort = data.map((item, index) => index)
    localStorage.setItem(storageSort, JSON.stringify(jsonSort))

    renderSubs(data)
  }

  fileReader.readAsBinaryString(e.target.files[0])
}

document.getElementById('subs-csv')
  .addEventListener('change', importCsv)
