// -- JAVASCRIPT CAFE! -- //

let products = {
  whiteCoffee: {
    stock: 4,
    price: 4,
    wholesaleCost: 1.5,
  },

  blackCoffee: {
    stock: 7,
    price: 3.5,
    wholesaleCost: 1,
  },
  muffin: {
    stock: 5,
    price: 8.5,
    wholesaleCost: 3,
  },
  eggs: {
    stock: 5,
    price: 12.5,
    wholesaleCost: 4,
  },
}

function displayProducts() {
  document.getElementById('whiteCoffee').innerHTML =
    'White Coffee: ' + products.whiteCoffee.stock

  document.getElementById('blackCoffee').innerHTML =
    'Black Coffee: ' + products.blackCoffee.stock
  document.getElementById('muffin').innerHTML =
    'Muffin: ' + products.muffin.stock
  document.getElementById('eggs').innerHTML = 'Eggs: ' + products.eggs.stock
}

displayProducts()

//--Customer--//

let customer = {
  order: [],
}

let minOrderSize = 1
let maxOrderSize = 5

function generateCustomerOrder() {
  // get a random size for the order in a array, 1-5
  //make a new array of the things they're ordering
  //assign the new order to the customer object
  // display the customer order

  let orderSize = getRandomInt(minOrderSize, maxOrderSize)
  let newOrder = []
  let productsNames = Object.keys(products)
  for (let i = 0; i <= orderSize; i++) {
    let productIndex = getRandomInt(0, productsNames.length - 1)
    let productName = productsNames[productIndex]
    newOrder.push(productName)
  }

  customer.order = newOrder

  displayCustomerOrder(customer.order)
}
// generateCustomerOrder()

function displayCustomerOrder(order) {
  document.getElementById('customerOrder').innerHTML =
    'Customer order: ' + order
}

document.getElementById('customerButton').onclick = generateCustomerOrder
// --UTIL--//

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//--Transactions--//
let cash = 0

function displayCash() {
  document.getElementById('cash').innerHTML = 'cash: ' + cash
}
displayCash()

function fillOrder() {
  //make a variable to keep track of the sale total
  //loop through the ordr array
  //if we have order in stock then sell it to them and keep track of the sale
  //if we dont have it alert we are out of stock
  //addd the sale total to our cash
  //dispaly the new totals

  let saleTotal = 0
  let customerMoney = getRandomInt(40, 140)
  let currentOrderStock = []

  for (let i = 0; i < customer.order.length; i++) {
    let productName = customer.order[i]
    saleTotal += products[productName].price
    currentOrderStock.push(products[productName].stock)
  }

  let inStock = currentOrderStock.every((stockNum) => stockNum > 0)
 
  if (customerMoney < saleTotal) {
    alert('not enough money')
    displayCustomerOrder('rejected')
    customer.order = []
    return
  }
  if (inStock) {
    for (let i = 0; i < customer.order.length; i++) {
      let productName = customer.order[i]
      if (products[productName].stock > 0) {
        products[productName].stock--
        cash += saleTotal
      } else {
        document.getElementById(productName).style.color = 'red'
        alert('I am sorry, we are out of ' + productName)
        console.log('hello')
        displayCustomerOrder('rejected')
      }
    }
    displayCash()
    displayProducts()
    displayCustomerOrder(customer.order)
    customer.order = []
  } else {
    for (let i = 0; i < customer.order.length; i++) {
      let productName = customer.order[i]
      if (products[productName].stock === 0) {
        document.getElementById(productName).style.color = 'red'
        alert('I am sorry, we are out of ' + productName)
        console.log('hello')
        displayCustomerOrder('rejected')
      }
    }
  }

  // if ((document.getElementById('customerOrder').innerHTML = 'rejected')) return

  // if (customerMoney >= saleTotal) {
  //   cash += saleTotal
  //   displayCustomerOrder(customer.order)
  //   customer.order = []
  //   displayCash()
  // } else {
  //   alert('not enough money')
  //   displayCustomerOrder('rejected')
  // }
}

document.getElementById('fillOrder').onclick = fillOrder

function reStock(e) {
  if (e.target.nodeName === 'BUTTON') {
    let productName = e.target.closest('div').children[0].getAttribute('id')

    products[productName].stock++
    cash -= products[productName].wholesaleCost
    displayProducts()
    displayCash()
  }
}

document.querySelector('.container').onclick = reStock
