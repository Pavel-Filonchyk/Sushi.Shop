const cartWrapper = document.querySelector(".cart-wrapper")  
window.addEventListener("click", function(event){  
    if (event.target.hasAttribute("data-action")){  
        const counterWrapper = event.target.closest(".counter-wrapper")  
        const counter = counterWrapper.querySelector("[data-counter]") 
        if (event.target.dataset.action == "plus"){  
            counter.innerText ++ 
        }else if (event.target.dataset.action == "minus"){
            if (counter.innerText >1){
                counter.innerText -- 
                }
        }
    }
})
window.addEventListener("click", function(event){
    if (event.target.hasAttribute("data-cart")){   
    const card = event.target.closest(".card")  

    let produktInfo = {
        id : card.dataset.id,
        imgSrc: card.querySelector(".product-img").getAttribute("src"),  
        title : card.querySelector(".item-title").innerText,        // .innerText говорит о значении текстовом
        itemsInBox: card.querySelector("[data-items-in-box]").innerText,   
        width: card.querySelector(".price__weight").innerText,   
        price:  card.querySelector(".price__currency").innerText,   
        counter: card.querySelector("[data-counter]").innerText
    }
    console.log(produktInfo)  

 const itemInCart = cartWrapper.querySelector(`[data-id="${produktInfo.id}"]`)  
 if (itemInCart){
     console.log("товар в корзине")

    const counterElement = itemInCart.querySelector("[data-counter]")
    counterElement.innerText = parseInt(counterElement.innerText) + parseInt(produktInfo.counter)
 }else{
     console.log("товар нет корзине")

    const cartItemHTML = `<div class="cart-item" data-id="${produktInfo.id}">
     <div class="cart-item__top">
         <div class="cart-item__img">
             <img src="${produktInfo.imgSrc}" alt="">
         </div>
         <div class="cart-item__desc">
             <div class="cart-item__title">${produktInfo.title}</div>
             <div class="cart-item__weight">${produktInfo.itemsInBox}/${produktInfo.width}</div>
 
             <!-- cart-item__details -->
             <div class="cart-item__details">
 
                 <div class="items items--small counter-wrapper">
                     <div class="items__control" data-action="minus">-</div>
                     <div class="items__current" data-counter="">${produktInfo.counter}</div>
                     <div class="items__control" data-action="plus">+</div>
                 </div>
 
                 <div class="price">
                     <div class="price__currency">${produktInfo.price}</div>
                 </div>
 
             </div>
           
 
         </div>
     </div>
 </div>`

    cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML) 
    card.querySelector("[data-counter]").innerText = "1"
    toggleCartStatus ();
    }
}
}) 

function toggleCartStatus () {
    const cartEmpty = document.querySelector("[data-cart-empty]")   
    const cartTotal = document.querySelector(".cart-total")    
    const orderForm = document.querySelector("#order-form")   
    
    if (cartWrapper.querySelector(".cart-item").length >0){   
        cartEmpty.classList.add("none")   
        cartTotal.classList.remove("none")  
        orderForm.classList.remove("none")  
    } 
}
toggleCartStatus ();






