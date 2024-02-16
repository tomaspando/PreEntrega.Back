const containerProducts = document.querySelector("#containerProducts")

const newCard = ({title, description, price}) => {
    return `
        <div class="card">
            <h3 class="card-title">${title}</h3>
            <img class="card-img" src="" alt="">
            <p class="card-desc">${description}</p>
            <strong class="card-price">${price}</strong>
            <button class="btn-add">Agregar al Carrito</button>
        </div>
`
}

const renderCards = (array) => {
    containerProducts.innerHTML = ""
    array.map(item => {
        containerProducts.innerHTML += newCard(item)
    })
}

const getAll = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/products/")
        if(response.status !== 200) throw new Error("Error en la solicitud")
        const data = await response.json()
        renderCards(data.payload)

    } catch (error) {
        alert("Error" + error)
    }
}

/* fetch("http://localhost:8080/api/products/")
    .then( res => res.json())
    .then(data => renderCards(data.payload))
    .catch(err => console.log(err)) */

getAll()
