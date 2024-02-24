const darkmode = document.getElementById('darkmode_label')
darkmode.addEventListener('click', ()=>{
  document.body.classList.toggle('dark')
})

const places = [
  {
    id: 1,
    title: "Punta Cana",
    category: "caribbean",
    img: "./imgs/img1.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,  recusandae aut distinctio."
  },
  {
    id: 2,
    title: "Rivera Maya",
    category: "caribbean",
    img: "./imgs/img2.jpg",
    desc: "Lorem ipsum dolor sit  adipisicing elit. Quibusdam, necessitatibus maxime qui recusandae aut distictio."
  },
  {
    id: 3,
    title: "Puerto Rico",
    category: "caribbean",
    img: "./imgs/img3.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, necessitatibus maxime qui "
  },
  {
    id: 4,
    title: " French Polynesia",
    category: "oceania",
    img: "./imgs/img4.jpg",
    desc: "Lorem ipsum amet consectetur adipisicing elit. Quibusdam, necessitatibus maxime qui recusandae aut distinctio."
  },
  {
    id: 5,
    title: "New Zealand",
    category: "oceania",
    img: "./imgs/img5.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, qui recusandae aut distictio."
  },
  {
    id: 6,
    title: "Australia",
    category: "oceania",
    img: "./imgs/img6.jpg",
    desc: "Dolor sit amet consectetur adipisicing elit. Quibusdam, necessitatibus maxime qui recusandae aut distictio."
  },
  {
    id: 7,
    title: "Japan",
    category: "asia",
    img: "./imgs/img7.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur elit. Quibusdam,  maxime qui recusandae aut distinctio."
  },
  {
    id: 8,
    title: "China",
    category: "asia",
    img: "./imgs/img8.jpg",
    desc: "Lorem  dolor sit amet consectetur elit. Quibusdam, necessitatibus maxime qui  aut distictio."
  },
  {
    id: 9,
    title: "Singapore",
    category: "asia",
    img: "./imgs/img9.jpg",
    desc: "Lorem ipsum dolor sit  consectetur adipisicing elit. Quibusdam, necessitatibus  qui recusandae aut distictio."
  },
  {
    id: 10,
    title: "Europe",
    category: "europe",
    img: "./imgs/img10.jpg",
    desc: "Lorem ipsum dolor sit amet  adipisicing elit. Quibusdam, necessitatibus maxime qui recusandae aut distictio."
  }
];

const items = document.querySelector('.items')
const checkboxes = document.querySelector(".checkboxes");

window.addEventListener("DOMContentLoaded", ()=>{
  displayItems(places)
  displayBtns()
})

function displayBtns(){
  const categories = places.reduce((values,item)=>{
    if(!values.includes(item.category)){
      values.push(item.category)
    }
    return values
  }, [])

  const categoryBtns = categories.map(category => {
    let initialChecked = category === 'all'
    return `
        <div class="group">
          <input type="checkbox" name="${category}" id="${category}" ${initialChecked ? 'checked' : ''}>
          <label for="${category}">${category}</label>
        </div>`
  }).join("")
  checkboxes.innerHTML = categoryBtns;


  const categoryCheckboxes = checkboxes.querySelectorAll('input')
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleChange)
  })
}

function handleChange() {
    // Update the display based on the selected checkboxes
    updateDisplay();
}

function updateDisplay() {
  const selectedCategories = getSelectedCategories();
  const filteredPlaces = filterByCategories(selectedCategories);
  displayItems(filteredPlaces)
}

function getSelectedCategories() {
  const selectedCategories = []
  const categoryCheckboxes = document.querySelectorAll('.group input:checked')
  categoryCheckboxes.forEach(checkbox => {
    selectedCategories.push(checkbox.name)
  })
  return selectedCategories
}

function filterByCategories(categories) {
  if(categories.length === 0){ //if(categories.includes('all')){
    return places
  } else {
    return places.filter(item => categories.includes(item.category)) 
  }
}

function displayItems(places) {
  let display = places.map(spot => {
    let {id, title, img, desc} = spot;
    return `
      <article class="item">
        <img src="${img}" alt="menu ${id}" class="photo" />
        <div class="item-info">
            <header>
                <h4>${title}</h4>
            </header>
            <p class="item-text">${desc}</p>
        </div>
      </article>`
  })
  display = display.join('')
  items.innerHTML = display
}