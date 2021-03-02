BASE_URL = "http://localhost:3000/monsters/"
let page = 1

document.addEventListener("DOMContentLoaded",()=> {
    const backBtn = document.getElementById('back')
    const forwardBtn = document.getElementById('forward')
    navBtnEventListeners(backBtn,forwardBtn)
    fetchMonsters(page)
    const newMonsterForm = document.getElementById('monster-form')
    newMonsterForm.addEventListener('submit',addMonster)

})

const fetchMonsters = (page) => {
    const limit = 50

    const urlSearchModifier = `?_limit=${limit}&_page=${page}`
    fetch(BASE_URL+urlSearchModifier).then(res=>res.json()).then(monsters => {
        const monsterDiv = document.getElementById("monster-container")
        monsterDiv.innerHTML = ""
        monsters.forEach((monster)=>renderMonster(monster,monsterDiv))
        setNavBtnStatus()}
        )
}

function renderMonster(monster,monsterDiv) {

    const monsterCard = document.createElement("div")
        monsterCard.className = "monster-card"
        monsterCard.id = monster.id
    const monsterName = document.createElement('h2')
        monsterName.innerText = monster.name
    const monsterAge = document.createElement('h4')
        monsterAge.innerText = "Age: " + monster.age
    const monsterBio = document.createElement('p')
        monsterBio.innerText = "Bio: " + monster.description

    monsterCard.append(monsterName,monsterAge,monsterBio)
    monsterDiv.appendChild(monsterCard)
}

function setNavBtnStatus() {
    const backBtn = document.getElementById('back')
    page === 1 ? backBtn.disabled = true : backBtn.disabled = false
}

function navBtnEventListeners(backBtn,forwardBtn){
    backBtn.addEventListener('click',() => {
        page -= 1
        fetchMonsters(page)}
    )
    forwardBtn.addEventListener('click',() => {
        page += 1
        fetchMonsters(page)}
    )
}

function addMonster(e) {
    e.preventDefault()

    formMonster = {
        "name": e.target.name.value,
        "age": e.target.age.value,
        "description": e.target.description.value
    }
    console.log(formMonster)

    reqObj ={
        headers: {"Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(formMonster)
    }

    fetch(BASE_URL,reqObj).then(res=>res.json()).then(console.log)

}

