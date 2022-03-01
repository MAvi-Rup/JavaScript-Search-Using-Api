
document.getElementById('search-phone').addEventListener('click',()=>{
    const searchText = document.getElementById('search-input').value
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res =>res.json())
    .then(data=>displayPhone(data.data))
})

function displayPhone(datas){
    const phoneContainer = document.getElementById('display-phone')
    for(const data of datas){
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="col">
            <div class="card">
                <img height="350px" src=${data.image} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">${data.brand}</p>
                <button onclick="moreDetails('${data.slug}')" class="btn btn-primary">More Details</button>
                </div>
            </div>
            </div>
        `
        phoneContainer.appendChild(div)
    }
} 

const moreDetails = id =>{

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res =>res.json())
    .then(data=>displayDetails(data.data))
}
const displayDetails = data =>{
    const phoneContainer = document.getElementById('phone-details')
    phoneContainer.innerText = ''
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card w-50 m-auto">
        <div class="card-body">
        <img  height="400px" src=${data.image} class="card-img-top " alt="...">
        <h4 class="card-title">${data.name}</h4>
        <h5 class="card-title">${data.brand}</h5>
        <p class="card-text">${data.releaseDate}</p>
        </div>
   </div>
    `
    phoneContainer.appendChild(div)


}