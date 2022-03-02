
document.getElementById('search-phone').addEventListener('click',()=>{
    const searchText = document.getElementById('search-input').value
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res =>res.json())
    .then(data=>displayPhone(data.data))
})

const maxDisplayphone = datas =>{
    const phoneContainer = document.getElementById('display-phone')
    phoneContainer.innerText = ''
    for(const data of datas){
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="col">
            <div class="card">
                <img height="350px" src=${data.image} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">${data.brand}</p>
                <form action='#phone-details'>
                    <button onclick="moreDetails('${data.slug}')" class="btn btn-primary">More Details</button>
                </form>
                
                </div>
            </div>
            </div>
        `
        phoneContainer.appendChild(div)
    }

}
function maxDisplayphone2(datas){
    console.log(Object.keys(datas))
}

function displayPhone(datas){
    console.log(datas)
    const newdata = datas.slice(0,20)
    console.log(newdata)
    const buttonContainer = document.getElementById('showmore-btn')
    if(datas.length<=20){
        maxDisplayphone(datas)

    }else{
        maxDisplayphone(newdata)
        buttonContainer.innerText=''
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="d-grid col-6 mx-auto">
        <button class="btn btn-success" type="button" id='show'>Show All Results</button>
      </div>
        `
        buttonContainer.appendChild(div)
    }
    document.getElementById('show').addEventListener('click',()=>{
        const phoneContainer = document.getElementById('display-phone')
        phoneContainer.innerText = ''
    for(const data of datas){
        const div = document.createElement('div')
        div.innerHTML = `
            <div class="col">
            <div class="card">
                <img height="350px" src=${data.image} class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">${data.brand}</p>
                <form action='#phone-details'>
                    <button onclick="moreDetails('${data.slug}')" class="btn btn-primary">More Details</button>
                </form>
                
                </div>
            </div>
            </div>
        `
        phoneContainer.appendChild(div)
        document.getElementById('show').style.display='none'
    }


    })


} 

const moreDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res =>res.json())
    .then(data=>displayDetails(data.data))
}

const otherFeatures = data=>{
    if(data){
        return `
        <p class="card-text"><b>WLAN :</b> ${data.WLAN}</p>
        <p class="card-text"><b>Bluetooth :</b> ${data.Bluetooth}</p>
        <p class="card-text"><b>GPS :</b> ${data.GPS}</p>
        <p class="card-text"><b>NFC :</b> ${data.NFC}</p>
        <p class="card-text"><b>Radio :</b> ${data.Radio}</p>
        <p class="card-text"><b>USB :</b> ${data.USB}</p>
        `
    }else{
        return `<p class="card-text"><b>NO Others Data Found</p>`
    }
}

const displayDetails = data =>{
    const phoneContainer = document.getElementById('phone-details')
    const releaseDate = data.releaseDate ? data.releaseDate:"No Releasedate"
    phoneContainer.innerText = ''
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="card w-50 m-auto">
        <div class="card-body">
        <img height="400px" src=${data.image} class="card-img-top" alt="...">
        <h4 class="card-title">${data.name}</h4>
        <h5 class="card-title">${data.brand}</h5>
        <p class="card-text"><b>Released Date :</b> ${releaseDate}</p>
        <h4 class="card-title">Main Features</h4>
        <p class="card-text"><b>Chipset :</b> ${data.mainFeatures.chipSet}</p>
        <p class="card-text"><b>Display :</b> ${data.mainFeatures.displaySize}</p>
        <p class="card-text"><b>Memory :</b> ${data.mainFeatures.memory}</p>
        <p class="card-text"><b>Storage :</b> ${data.mainFeatures.storage}</p>
        <p class="card-text"><b>Sensors :</b> ${data.mainFeatures.sensors}</p>
        <h4 class="card-title">Other Features</h4>
        ${otherFeatures(data.others)}
        </div>
   </div>
    `
    phoneContainer.appendChild(div)


}