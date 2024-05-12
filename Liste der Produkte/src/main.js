let shop = document.getElementById('shop'); 

//stores anything we selected
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x)=>{
            let {id,name,price,desc,img} = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
        <div id=product-id-${id} class="item">
            <img width="325" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p class="description">${desc}</p>
                <div class="price-quantity">
                    <h2>€ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join(""));
};
generateShop();

//responsible for the + icon
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    //if the item selected already exist in the basket and we press + then increment it, if it doesnt exist then push the new item in the basket when + press
    if(search === undefined) {
       basket.push({
            id: selectedItem.id,
            item: 1,
        });  
    } else {
       search.item +=1; 
    }

    localStorage.setItem("data", JSON.stringify(basket));
 
   update(selectedItem.id);
};
//responsible for the - icon
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search===undefined) return
    else if(search.item === 0) return; 
    else {
       search.item -=1; 
    }

    update(selectedItem.id);
    basket = basket.filter ((x) => x.item !=0);
    localStorage.setItem("data", JSON.stringify(basket));
};
//responsible for updating the amount when clicking on + or -
let update = (id) =>{
    let search = basket.find((x)=> x.id === id );
    console.log (search.item); 
    document.getElementById(id).innerHTML = search.item;
    calculation()
}; 


//adds all the numbers from items and shows on cart icon
let calculation  = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=> x + y, 0);
}; 

calculation();