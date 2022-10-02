let tugas = []
const myChache = 'todolist'


// storage
if (localStorage.getItem(myChache) == null) {
    localStorage.setItem(myChache, '')
}
function simpanProggress() {
    let simpanJSON = JSON.stringify(tugas)
    localStorage.setItem(myChache, simpanJSON)
}
function ambilProggress() {
    let ambilJSON = JSON.parse(localStorage.getItem(myChache))
    tugas = ambilJSON
}

document.addEventListener('renderTugas', () => {
    document.getElementById('belum').innerHTML = ''
    document.getElementById('sudah').innerHTML = ''
    // dijadiin variable aja biar agak gampang di liat
    let tugasSelesai = tugas.filter(x => x.selesai == true).map(x => buatElement(x.id, x.tugas, x.mulai, x.tanggal, x.selesai))
    let tugasBelum = tugas.filter(x => x.selesai == false).map(x => buatElement(x.id, x.tugas, x.mulai, x.tanggal, x.selesai))
    simpanProggress()
    console.log(JSON.parse(localStorage.getItem(myChache)))
})

window.addEventListener('load', () => {
    ambilProggress()
    document.dispatchEvent(new Event('renderTugas'))
})


const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    tugas.push({
        id: +new Date(),
        tugas: document.getElementById('tugas').value,
        mulai: document.getElementById('mulai').value,
        tanggal: document.getElementById('tanggal').value,
        selesai: false
    })

    document.dispatchEvent(new Event('renderTugas'))
})

function buatElement(id, tugas, mulai, tanggal, selesai) {
    // card
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('id', id)

    // text card
    const cardText = document.createElement('div')
    cardText.classList.add('card-text')

    const textTitle = document.createElement('p')
    textTitle.innerText = tugas

    const textTime = document.createElement('p')
    textTime.classList.add('text-time')
    textTime.innerText = `${mulai} >> ${tanggal}`

    // btn card
    const cardBtn = document.createElement('div')
    cardBtn.classList.add('card-btn')

    const centang = document.createElement('span')
    centang.classList.add('centang')
    centang.innerText = 'centang'
    centang.addEventListener('click', (e) => {
        pindahKeSudahSelesai(e.target.parentElement.parentElement.id)
    })

    const ulangi = document.createElement('span')
    ulangi.classList.add('ulangi')
    ulangi.innerText = 'ulangi'
    ulangi.addEventListener('click', (e) => {
        pindahKeBelumSelesai(e.target.parentElement.parentElement.id)
    })

    const buang = document.createElement('span')
    buang.classList.add('buang')
    buang.innerText = 'buang'
    buang.addEventListener('click', (e) => {
        buangDariSudahSelesai(e.target.parentElement.parentElement.id)
    })

    // penggabungan
    cardText.append(textTitle, textTime)
    card.append(cardText, cardBtn)


    if (selesai) {
        cardBtn.append(ulangi, buang)
        return document.getElementById('sudah').appendChild(card)
    } else {
        cardBtn.append(centang)
        return document.getElementById('belum').appendChild(card)
    }
}


function pindahKeSudahSelesai(idYangDiCari) {
    for (let i in tugas) {
        if (tugas[i].id == idYangDiCari) {
            tugas[i].selesai = true
            document.dispatchEvent(new Event('renderTugas'))
        }
    }
}

function pindahKeBelumSelesai(idYangDiCari) {
    for (let i in tugas) {
        if (tugas[i].id == idYangDiCari) {
            tugas[i].selesai = false
            document.dispatchEvent(new Event('renderTugas'))
        }
    }
}

function buangDariSudahSelesai(idYangDiCari) {
    for (let i in tugas) {
        if (tugas[i].id == idYangDiCari) {
            tugas.splice(i, 1)
            document.dispatchEvent(new Event('renderTugas'))
        }
    }
}