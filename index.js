
document.addEventListener("DOMContentLoaded", () => {
    let currentUser
    
      let bagsURL ='http://localhost:3000/handbags/'
      let usersURL = 'http://localhost:3000/users/'
      let userHandbagsURL = 'http://localhost:3000/user_handbags/'
  
      let signUpForm = document.querySelector('#sign-up')
      let signLoginDiv = document.querySelector('#signup-login')
      let topnav = document.querySelector('.topnav')
      let listedBtn = document.querySelector('#listed-btn')
      let rentedBtn = document.querySelector('#rented-btn')
      let listBagBtn = document.querySelector('#list-bag-btn')
      let homeBtn = document.querySelector('#home-btn')
      let balanceBtn = document.querySelector('#balance')
      let filterDiv = document.querySelector('#filter-div')
  
      let div = document.querySelector('#view-listed-bags')
      let viewBagDiv = document.querySelector('#view-bag')
      const containerDiv = document.querySelector('#container')
      const listBagDiv = document.querySelector('#list-bag-div')

      let footer = document.querySelector('footer')
      let about = document.querySelector('#about')
      let contact = document.querySelector('#contact')
      let faq = document.querySelector('#FAQ')
      let footerDiv = document.querySelector('.footer')
      let welcomeHeader = document.querySelector('#current-user')

      about.addEventListener('click', () => displayAboutPage())
      contact.addEventListener('click', () => displayContactPage())
      faq.addEventListener('click', () => displayfaqPage())
  
      function getBags(user){
      fetch(bagsURL)
      .then(resp => resp.json())
      .then(bags => renderBags(bags, user))}
  
  
      function renderBags(bags, user){
        welcomeHeader.style.display = 'block'
        welcomeHeader.innerText = `Welcome ${user.name}!`
          listBagDiv.innerHTML = ''
          containerDiv.style.display = 'block'
          filterDiv.style.display = 'block'
          containerDiv.innerHTML = ""
          footerDiv.style.display = 'block'
          bags.forEach(bag => renderBag(bag, user)  
      )}
      
  
      signUpForm.addEventListener('click', (e) =>{
           signUp(e),
           signLoginDiv.style.display = 'none'
      })
  
      function signUp(e){
          let formDiv = document.querySelector('#sign-up-form')
          let form = document.createElement('form')
          form.classList = "signup"
          form.classList.add("form")
          formDiv.append(form)
          console.log(formDiv)
          form.innerHTML = `
          <input
              type="text"
              name="name"
              value=""
              placeholder="Name"
              class="input-text"
              required
            /></br>
            <input
              type="text"
              name="email"
              value=""
              placeholder="Email"
              class="input-text"
              required
            /></br>
            <input
              type="text"
              name="address"
              value=""
              placeholder="Address"
              class="input-text"
              required
            /></br>
            <input
              type="text"
              name="balance"
              value=""
              placeholder="Balance"
              class="input-text"
              required
            /></br></br>
            <input
              type="submit"
              name="submit"
              value="Create Profile"
              class="submit"
            />`
  
      form.addEventListener('submit', (e) => {
          e.preventDefault()
          createUser(form)
          form.reset()
          form.remove()
      })
  
      }
  
      function createUser(form){
          let formBalance = parseInt(form.balance.value)
          let user = {name: form.name.value,
              email: form.email.value,
              address: form.address.value,
              balance: formBalance}
          fetch(usersURL, {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              },
              body: JSON.stringify({
                  user
              })
          })
          .then(resp => resp.json())
          .then(user => {
              let currentUser = user
              getBags(currentUser),
              myListedButton(currentUser),
              myRentedBags(currentUser),
              listABag(currentUser),
              homeButton(currentUser),
              addFilterFunc(currentUser),
              footer.style.display = 'block'
              balanceBtn.addEventListener('click', () => addMoney(currentUser))
              balanceBtn.innerText = 'Balance $ ' + currentUser.balance
          }
          )}
  
  
  let loginH3 = document.querySelector('#login-in')  
  loginH3.addEventListener('click', (e) => {
      signLoginDiv.style.display = 'none'
     logIn(e)
  })  
  
  function logIn(e){
      let loginFormDiv = document.querySelector('#login-form')
      let loginForm = document.createElement('form')
      loginForm.classList = "form"
      loginFormDiv.append(loginForm)
      loginForm.innerHTML = `
      <input
              type="text"
              name="email"
              value=""
              placeholder="Email"
              class="input-text"
              required
            /></br></br>
            <input
              type="submit"
              name="submit"
              value="Login"
              class="submit"
            />`
      
          loginForm.addEventListener('submit', (e) => {
              e.preventDefault()
              loginUser(loginForm)
              loginForm.remove()
              // getBags(currentUserId)
           })
  }
  
  function loginUser(form){
      fetch(usersURL)
      .then(resp => resp.json())
      .then(users => users.forEach(user => { 
             if (user.email === form.email.value)
             {
              let currentUser = user
              getBags(currentUser),
              myListedButton(currentUser),
              myRentedBags(currentUser),
              listABag(currentUser),
              homeButton(currentUser),
              balanceBtn.addEventListener('click', () => addMoney(currentUser)),
              balanceBtn.innerText = 'Balance $ ' + currentUser.balance,
              addFilterFunc(currentUser),
              footer.style.display = 'block'
            }                                         // add filter and sort function
          })
      )}
   
  
      function renderBag(bag, user){
        
          topnav.style.display = 'block'
  
          if (bag.lister_id !== user.id){
          let bagDiv = document.createElement('div')
              bagDiv.className = 'card'
          let imageDiv = document.createElement('div')
          let imageBag = document.createElement('img')
              imageBag.className = 'image-avatar'
              imageBag.src = bag.image
              imageBag.width = '100'
              imageBag.height = '100'
          let priceP = document.createElement('p')
              priceP.innerText = '$ ' + bag.price
          let designerh3 = document.createElement('h3')
              designerh3.innerText = bag.designer
          let viewDiv = document.createElement('div')
              viewDiv.className = 'view-button-div'
          let viewBtn = document.createElement('button')
          viewBtn.className = 'reg-button'
          viewBtn.innerText = 'View Me'
  
          if(bag.user_handbags.length > 0 ){
              viewBtn.innerText = 'Rented'
              viewBtn.disabled = true;
              viewBtn.title = "Sorry, I'm Rented"
              viewBtn.classList = 'rented-hover'
          }
          
          viewBtn.addEventListener('click', () => displaySingleBag(bag, user))
  
          viewDiv.append(viewBtn)
          imageDiv.append(imageBag)
          bagDiv.append(designerh3, imageDiv, priceP, viewDiv)
          containerDiv.append(bagDiv)}
      }
      
      function displaySingleBag(bag, user){
          viewBagDiv.innerHTML = ''
        //   detailsDiv.innerHTML = ''
        filterDiv.style.display = 'none'
          footerDiv.style.display = 'none'
          containerDiv.style.display = 'none'
          viewBagDiv.style.display = 'block'
          let imgDiv = document.createElement('div')
          imgDiv.classList = 'image-div'
          let image = document.createElement('img')
          image.src = bag.image
          image.width = 650
          image.height = 650

          let detailsDiv = document.createElement('div')
          detailsDiv.classList = 'detail-div'
  
          let h3designer = document.createElement('h3')
            h3designer.classList = 'designer-name'
              h3designer.innerText = bag.designer

          let pBagType = document.createElement('p')
               pBagType.classList = 'bagP'
              pBagType.innerText = 'Type: ' + bag.bag_type

          let pColor = document.createElement('p')
              pColor.innerText = 'Color: '+ bag.color
              pColor.classList = 'bagP'

          let pFabric = document.createElement('p')
              pFabric.innerText = 'Fabric: ' + bag.fabric
              pFabric.classList = 'bagP'

          let pPrice = document.createElement('p')
              pPrice.innerText = 'Price: '+ bag.price
              pPrice.classList = 'bagP'
  
          let rentBtn = document.createElement('button')
              rentBtn.innerText = 'Rent Me'
              rentBtn.classList = 'reg-button'
              rentBtn.addEventListener('click', (e) => rentABag(bag, user))
  
          let homeBtn = document.createElement('button')
              homeBtn.innerText = 'All Handbags'
              homeBtn.classList = 'reg-button'
              homeBtn.addEventListener('click', () => {
                  viewBagDiv.innerHTML = ""
                  containerDiv.style.display = 'block'
              })
          
              
        let listerP = document.createElement('p')
              listerP.innerText = `Lister: ${bag.lister.name}`
              listerP.classList = 'bagP'
              console.log(bag.lister.name)

        let timeP = document.createElement('p')
            timeP.innerText = "7 Day Rental"
            timeP.classList = 'bagP'

          detailsDiv.append(h3designer, pBagType, pColor, pFabric, pPrice, timeP, listerP, rentBtn, homeBtn)
          imgDiv.append(image)
          
          let lengtheDiv = document.createElement('div')
          lengtheDiv.classList = 'single-div-length'
          viewBagDiv.append(imgDiv, detailsDiv, lengtheDiv)

      }
  
      function rentABag(bag, user){
          if (bag.price <= user.balance){
              let configObj = {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                  body: JSON.stringify({user_id: user.id, handbag_id: bag.id})}
              fetch(userHandbagsURL, configObj)
              .then(res => res.json())
              .then(bag => {
                  decreaseUserBalance(),
                  increaseListerBalance(),
                  displayrentedbags(user)

                function displayrentedbags(user){
                fetch(usersURL + user.id)
                .then(res => res.json())
                .then(user => {
          
                listBagDiv.innerHTML = ''
              div.innerHTML = ""
              containerDiv.style.display = 'none'
              filterDiv.style.display = 'none'
              viewBagDiv.style.display ='none'
              div.style.display = 'block'
              footerDiv.style.display = 'block'
          
          user.handbags.forEach(bag => {
              let bagDiv = document.createElement('div')
              bagDiv.className = 'card'
  
              let imageDiv = document.createElement('div')
              let imageBag = document.createElement('img')
              imageBag.className = 'image-avatar'
              imageBag.src = bag.image
              imageBag.width = '100'
              imageBag.height = '100'
  
          let priceP = document.createElement('p')
              priceP.innerText = '$ ' + bag.price
  
          let designerh3 = document.createElement('h3')
              designerh3.innerText = bag.designer
  
          let viewDiv = document.createElement('div')
              viewDiv.className = 'view-button-div'
  
              let deleteBtn = document.createElement('button')
              deleteBtn.classList = 'reg-button'
              deleteBtn.innerText = 'Return'
              deleteBtn.addEventListener('click', (e) => returnBag(bag, user, bagDiv))
              
          viewDiv.append(deleteBtn)
          imageDiv.append(imageBag)
          bagDiv.append(designerh3, imageDiv, priceP, viewDiv)
          div.append(bagDiv)
          })})}
              })
          }
          else
              alert('Balance too low')
          

          function decreaseUserBalance(){
          let newBalance = user.balance - bag.price
          // if newBalance > 0 {patch request}
          let config2 = { method: 'PATCH', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                          body: JSON.stringify({balance: newBalance})}
          fetch(usersURL + user.id, config2)
          .then(res=>res.json())
          .then(updatedUser => {balanceBtn.innerText = 'Balance $ ' + newBalance})
          }
  
          function increaseListerBalance(){
          let lister_balance = bag.lister.balance + bag.price
          let config3 = { method: 'PATCH', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                          body: JSON.stringify({balance: lister_balance})}
          fetch(usersURL + bag.lister.id, config3)
          .then(res=>res.json())
          .then(data => console.log(data))
          }
      }
  
      function myListedButton(user){
  
          listedBtn.addEventListener('click', (e) => {
  
              fetch(usersURL + user.id)
              .then(resp => resp.json())
              .then(user => {
              div.style.display = 'block'
              div.innerHTML = ""
              viewBagDiv.style.display ='none'
              filterDiv.style.display = 'none'
              // let div = document.querySelector('#view-listed-bags')
              containerDiv.style.display = 'none'
              listBagDiv.style.display = 'none'
  
              user.listed_bags.forEach(bag => {
  
              let bagDiv = document.createElement('div')
              bagDiv.className = 'card'
  
              let imageDiv = document.createElement('div')
              let imageBag = document.createElement('img')
              imageBag.className = 'image-avatar'
              imageBag.src = bag.image
              imageBag.width = '100'
              imageBag.height = '100'
  
          let priceP = document.createElement('p')
              priceP.innerText = '$ ' + bag.price
  
          let designerh3 = document.createElement('h3')
              designerh3.innerText = bag.designer
  
          let viewDiv = document.createElement('div')
              viewDiv.className = 'view-button-div'
  
  
          let editBtn = document.createElement('button')
              editBtn.classList = 'reg-button'
              editBtn.innerText = 'Update'
              editBtn.addEventListener('click', (e) => 
             
              editMyBag(bag,user)
              
              )
  
              let deleteBtn = document.createElement('button')
              deleteBtn.classList = 'reg-button'
              deleteBtn.innerText = 'Delete'
              deleteBtn.addEventListener('click', (e) => {
                  console.log(e)
                  deleteMyBag(bag, bagDiv)
              })
              
              

          viewDiv.append(editBtn, deleteBtn)
          imageDiv.append(imageBag)
          bagDiv.append(designerh3, imageDiv, priceP, viewDiv)
          div.append(bagDiv)
          console.log(user.listed_bags)
  
              })
          })})
      }
  
  function  editMyBag(bag,user){
      div.innerHTML = ""

  
  
      let updateBagForm = document.createElement('form')
      updateBagForm.classList = 'list-bag-form'
      updateBagForm.classList.add('form')
      updateBagForm.innerHTML = `<input type="text" name="designer" value=${bag.designer} placeholder="Designer" class="input-text" required /> </br>
      <input type="text" name="bag_type" value=${bag.bag_type} placeholder="Bag Type" class="input-text" required /> </br>
      <input type="text" name="color" value=${bag.color} placeholder="Color" class="input-text" required /> </br>
      <input type="text" name="fabric" value=${bag.fabric} placeholder="Fabric" class="input-text" required /> </br>
      <input type="number" name="price" value=${bag.price} placeholder="Price" class="input-text" required /> </br>
      <input type="text" name="image" value=${bag.image} placeholder="Image Url" class="input-text" required /> </br></br>
      <input type="submit" name="submit" value="Update My Bag" class="submit"  />`
  
      div.append(updateBagForm)
  
      updateBagForm.addEventListener('submit', (e) => {
          e.preventDefault()
         
          fetch(bagsURL + bag.id, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
              },
              body: JSON.stringify({
                  designer: updateBagForm.designer.value,
                  bag_type: updateBagForm.bag_type.value,
                  color: updateBagForm.color.value,
                  fabric: updateBagForm.fabric.value,
                  price: updateBagForm.price.value,
                  image: updateBagForm.image.value
              })
          })
          .then(response => response.json())
          .then(updatedBag => {
              console.log(updatedBag)
              updateBagForm.remove(),
              backToListedBags(user, bag)}
          )
      })
      
  }  
      
  
  function deleteMyBag(bag,bagDiv){
      fetch(bagsURL + bag.id, {
          method: "DELETE"
      })
      .then(bagDiv.remove(),
      console.log)
  }
  
  function myRentedBags(user){
      fetch(usersURL + user.id)
      .then(res => res.json())
      .then(user => {
          rentedBtn.addEventListener('click', (e) => {
            listBagDiv.innerHTML = ''
              div.innerHTML = ""
              containerDiv.style.display = 'none'
              filterDiv.style.display = 'none'
              viewBagDiv.style.display ='none'
              div.style.display = 'block'
              footerDiv.style.display = 'block'
          
              console.log(user.handbags)
              
          user.handbags.forEach(bag => {
              let bagDiv = document.createElement('div')
              bagDiv.className = 'card'
  
              let imageDiv = document.createElement('div')
              let imageBag = document.createElement('img')
              imageBag.className = 'image-avatar'
              imageBag.src = bag.image
              imageBag.width = '100'
              imageBag.height = '100'
  
          let priceP = document.createElement('p')
              priceP.innerText = '$ ' + bag.price
  
          let designerh3 = document.createElement('h3')
              designerh3.innerText = bag.designer
  
          let viewDiv = document.createElement('div')
              viewDiv.className = 'view-button-div'
  
              let deleteBtn = document.createElement('button')
              deleteBtn.classList = 'reg-button'
              deleteBtn.innerText = 'Return'
              deleteBtn.addEventListener('click', (e) => returnBag(bag, user, bagDiv))
              
          viewDiv.append(deleteBtn)
          imageDiv.append(imageBag)
          bagDiv.append(designerh3, imageDiv, priceP, viewDiv)
          div.append(bagDiv)
          // console.log(user.listed_bags)
      })
  })})}
  
  function returnBag(bag, user, bagDiv){
  
      let user_handbag_id
  
      user.user_handbags.forEach(rented_bag => {
          if (rented_bag.handbag_id === bag.id)
          {user_handbag_id = rented_bag.id}
          
      })
      
      // console.log(user_handbag_id)
  
      configObj = {method: 'DELETE'}
      fetch(userHandbagsURL + user_handbag_id, configObj)
      .then(bagDiv.remove())  // change button rented to view me in home
  }
  
  
  
      function listABag(currentUser){
      listBagBtn.addEventListener('click', () => {
          containerDiv.innerHTML = ''
          viewBagDiv.innerHTML = ''
          div.innerHTML = ''
          listBagDiv.innerHTML = ''
          filterDiv.style.display = 'none'
          listBagDiv.style.display = 'block'
          footerDiv.style.display = 'block'
  
          let listBagForm = document.createElement('form')
          listBagForm.classList = 'list-bag-form'
          listBagForm.classList.add('form')
          listBagForm.innerHTML = `<input type="text" name="designer" value="" placeholder="Designer" class="input-text" required /> <br>
          <input type="text" name="bag_type" value="" placeholder="Bag Type" class="input-text" required /> <br>
          <input type="text" name="color" value="" placeholder="Color" class="input-text" required /> <br>
          <input type="text" name="fabric" value="" placeholder="Fabric" class="input-text" required /> <br>
          <input type="number" name="price" value="" placeholder="Price" class="input-text" required /> <br>
          <input type="text" name="image" value="" placeholder="Image Url" class="input-text" required /> <br></br>
          <input type="submit" name="submit" value="List My Bag" class="submit"  />`
  
          listBagDiv.append(listBagForm)
  
          listBagForm.addEventListener('submit', (e) => {
  
              e.preventDefault()
              
              console.log(currentUser)
             let lister_id = currentUser.id //cannot read undefined
             configObj = { method: 'POST',
              headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
              body: JSON.stringify({
                  designer: listBagForm.designer.value,
                  bag_type: listBagForm.bag_type.value,
                  color: listBagForm.color.value,
                  fabric: listBagForm.fabric.value,
                  price: listBagForm.price.value,
                  image: listBagForm.image.value,
                  lister_id
              })}
  
              fetch(bagsURL, configObj)
              .then(res => res.json())
              .then(console.log,
                  listBagForm.reset())
           })
      })
      }
  
      function homeButton(currentUser){
          homeBtn.addEventListener('click', (e) => {
              viewBagDiv.style.display = "none"
              div.style.display ='none'
              getBags(currentUser)
              console.log(currentUser)
              console.log(e)
          })
      }
      
  function backToListedBags(user, bag){
          fetch(usersURL + user.id)
          .then(resp => resp.json())
          .then(user => {
          div.style.display = 'block'
          div.innerHTML = ""
          viewBagDiv.style.display ='none'
          // let div = document.querySelector('#view-listed-bags')
          containerDiv.style.display = 'none'
          listBagDiv.style.display = 'none'
  console.log(user.listed_bags)
          user.listed_bags.forEach(bag => {
  
          let bagDiv = document.createElement('div')
          bagDiv.className = 'card'
  
          let imageDiv = document.createElement('div')
          let imageBag = document.createElement('img')
          imageBag.className = 'image-avatar'
          imageBag.src = bag.image
          imageBag.width = '100'
          imageBag.height = '100'
  
      let priceP = document.createElement('p')
          priceP.innerText = '$ ' + bag.price
  
      let designerh3 = document.createElement('h3')
          designerh3.innerText = bag.designer
  
      let viewDiv = document.createElement('div')
          viewDiv.className = 'view-button-div'
  
  
      let editBtn = document.createElement('button')
          editBtn.innerText = 'Update'
          editBtn.addEventListener('click', (e) => 
         
          editMyBag(bag,user)
          
          )
  
          let deleteBtn = document.createElement('button')
          deleteBtn.innerText = 'Delete'
          deleteBtn.addEventListener('click', (e) => {
              console.log(e)
              deleteMyBag(bag, bagDiv)
          })
          
  
      viewDiv.append(editBtn, deleteBtn)
      imageDiv.append(imageBag)
      bagDiv.append(designerh3, imageDiv, priceP, viewDiv)
      div.append(bagDiv)
      console.log(user.listed_bags)
  
          })
      })}
      
  
      // SORT BY DESIGNER
  function addFilterFunc(user){
      let dropDownDiv = document.createElement('div')
      dropDownDiv.className = 'drop-down-div'
      let filterDiv = document.querySelector('#filter-div')
      filterDiv.append(dropDownDiv)
      
      let filter = document.createElement('select')
          filter.innerHTML = `<select id="filter">
                              <option value="">Filter By</option>
                              <option value="designer">Designer</option>
                              <option value="available">Available for Rent</option>
                              <option value="rented">Currently Rented</option>
                              <option value="price-low">Price Low to High</option>
                              <option value="price-high">Price High to Low</option>
                          </select>`
  
      dropDownDiv.append(filter)
      let allBagsArray = []
          fetch('http://localhost:3000/handbags/')
          .then(res => res.json())
          .then(allBags => allBags.forEach(bag => allBagsArray.push(bag)))
  
      filter.addEventListener('change', () => {
          switch (filter.value){
              case 'designer':
                  console.log('designer')
                  sortByDesigner()
                  break
              case 'available':
                  console.log('available')
                  sortByAvailable()                   // callback function added after commit SORT BY AVAILABLE *************
                  break
              case 'rented':
                  console.log('rented')
                  sortByRented()
                  break
              case 'price-low':
                  sortByPriceLow()
                  console.log('price low to high')
                  break
              case 'price-high':
                  sortByPriceHigh()
                  console.log('price low to high')
                  break
              default:
                  console.log('no click')
          }
          })
  
          function sortOn(property){
              return function(a, b){
                  if(a[property] < b[property]){
                      return -1;
                  }else if(a[property] > b[property]){
                      return 1;
                  }else{
                      return 0;   
                  }
              }
          }
  
          function sortByDesigner(){
              let bagsSortedDesigner = [...allBagsArray]
              bagsSortedDesigner.sort(sortOn("designer"))
              renderBags(bagsSortedDesigner, user)
          }
          
          function sortByAvailable() {
              let availableBags = []
              allBagsArray.forEach(bag => {
                      if (bag.user_handbags.length === 0){
                          availableBags.push(bag)}
              })
              renderBags(availableBags, user)
          }
  
          function sortByRented(){
              let rentedBags = []
              allBagsArray.forEach(bag => {
                      if (bag.user_handbags.length > 0){
                          rentedBags.push(bag)}
              })
              renderBags(rentedBags, user)
          }
  
          function sortByPriceLow(){
              let bagsSortedPriceLow = [...allBagsArray]
              bagsSortedPriceLow.sort(sortOn("price"))
              renderBags(bagsSortedPriceLow, user)
          }
  
          function sortByPriceHigh(){
              let bagsSortedPriceHigh = [...allBagsArray]
              function sortOnReverse(property){
                  return function(a, b){
                      if(b[property] < a[property]){
                          return -1;
                      }else if(b[property] > a[property]){
                          return 1;
                      }else{
                          return 0;   
                      }
                  }
              }
              bagsSortedPriceHigh.sort(sortOnReverse("price"))
              renderBags(bagsSortedPriceHigh, user)
          }
  
      }
  
      function addMoney(user){
          viewBagDiv.innerHTML = ''
          div.innerHTML = ''
          listBagDiv.innerHTML = ''
          footerDiv.style.display = 'block'

          
          filterDiv.style.display = 'none'
          containerDiv.innerHTML= ''
          containerDiv.style.display = 'block'

          let addMoneyForm = document.createElement('form')
          addMoneyForm.innerHTML = `<label id='balance-label' for="amount">Increase your balance</label><br></br></br>
                                    <input type="number" id='amount' name="amount" value="" placeholder="Amount in $$"><br>
                                    <input type="number" name="card-num" value="" placeholder="Card Number"><br>
                                    <input type="number" name="expiration" value="" placeholder="Expiration Date"><br>
                                    <input type="number" name="cvv" value="" placeholder="CVV"><br></br>
                                    <input type="submit" value="Submit" class='submit'>`
          containerDiv.append(addMoneyForm)
          addMoneyForm.addEventListener('submit', () => {
              event.preventDefault()
              let additionalAmount = parseInt(event.target[0].value)
              let userNewBalance = user.balance + additionalAmount
              balanceBtn.innerText = 'Balance $ ' + userNewBalance
              configObjPatch = {method: 'PATCH', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                                body: JSON.stringify({balance: userNewBalance})}
              fetch(usersURL + user.id, configObjPatch)
              .then(res=>res.json())
              .then(updatedUser => {
                  containerDiv.innerHTML = ''
                    getBags(user)
            })
              
          })
      }
  

  function displayAboutPage(){
        filterDiv.style.display = 'none'
        containerDiv.innerHTML= ''
        viewBagDiv.innerHTML = ''
        div.innerHTML = ''
        listBagDiv.innerHTML = ''
        containerDiv.style.display = 'block'

      let aboutDiv = document.createElement('div')
      aboutDiv.className = 'footer-page'
      let aboutTitle = document.createElement('h2')
      aboutTitle.innerText = 'ABOUT'
      let aboutDescription = document.createElement('p')
      aboutDescription.innerHTML = `The B List was founded in 2020 by Catrina and Claudia. <br> 
      With The B List you can put your designer handbags for rent, and you can rent beautiful bags from other users. <br>
                                    Rentals last 7 days.<br>
                                    Our mission is to make women feel beautiful and self-confident every day. <br>
                                    We are reimagining Luxury:<br>We believe every woman deserves luxury, which is why The B List provides high quality handbags, from verified users, without charging the traditional retail mark up.`

      aboutDiv.append(aboutTitle, aboutDescription)
      containerDiv.append(aboutDiv)
  }

  
  function displayContactPage(){
    filterDiv.style.display = 'none'
    containerDiv.innerHTML= ''
    viewBagDiv.innerHTML = ''
    div.innerHTML = ''
    listBagDiv.innerHTML = ''
    containerDiv.style.display = 'block'

    let contactDiv = document.createElement('div')
    contactDiv.className = 'footer-page'
      let contactTitle = document.createElement('h2')
      contactTitle.innerText = 'CONTACT US'
      let contactText = document.createElement('p')
      contactText.innerHTML = `The B List is located at 3 Handbags Place, New Heaven, NY<br></br>
      The B List creators:<br></br>
      Catrina Friday, co-founder<br>
      Claudia Borghini, co-founder<br>`

      contactDiv.append(contactTitle, contactText)
      containerDiv.append(contactDiv)

  }


    function displayfaqPage(){
        filterDiv.style.display = 'none'
        containerDiv.innerHTML= ''
        viewBagDiv.innerHTML = ''
        div.innerHTML = ''
        listBagDiv.innerHTML = ''
        containerDiv.style.display = 'block'
    
        let faqDiv = document.createElement('div')
        faqDiv.className = 'footer-page'
          let faqTitle = document.createElement('h2')
          faqTitle.innerText = 'FREQUENTLY ASKED QUESTIONS'
          let faqText = document.createElement('p')
          faqText.innerHTML = `
 
          Order Status<br></br>
          Q: How will I know which carrier will ship my merchandise?<br>
          A: Orders placed on BList.com will ship through one of the following: FedEx, FedEx Smartpost, or the United States Postal Service (USPS). Standard delivery orders will ship via FedEx Smartpost or Federal Express Ground, depending on your zip code. Orders shipped Overnight, Rush, or Saturday delivery will ship via FedEx while shipments to Alaska, Hawaii, US Territories, APO/FPO, and PO Boxes will be shipped via USPS. Once your order ships you will be notified via email. The e-mail will also contain your tracking details. Please select the "Track It" option in the email to track your package.<br>
          
          Q: If I order multiple items will they ship all in the same shipment?<br>
          A: Orders placed online can ship from our Distribution Center, BList Avenue store, or from a vendor. Therefore, your items may be shipped in multiple shipments. Merchandise shipping from a store can take up to 7 to 10 business days to ship. You will not be charged extra delivery fees for multiple shipments, as the single delivery fee will be distributed over the multiple shipments.<br>
          
          Q: It has been 24 to 48 business hours and I have not received a shipping confirmation, why?<br>
          A: All orders are subject to a review process to protect our company and customers. During peak periods, the review process may extend past our goal of 48 hours. Orders shipping from one of our stores or a vendor may take longer to ship than from our Distribution Center. Stores have up to 4 business days to physically locate the merchandise. If the merchandise is not located in this time frame the item(s) will be canceled from the order and an e-mail confirmation will be sent to notify you. Once located, please be advised standard delivery for items shipping from a store is 7 to 10 business days.<br>
          
          Q: My order was canceled, so why do I still see a charge?<br>
          A: Unfortunately, when an order is canceled you may have a pending authorization which is not an actual charge. If paid with a debit card it could take up to 3 to 5 business days for the authorization to be removed. Credit card authorizations usually take up to 72 hours to remove. If you have questions or concerns about the pending authorization, please contact Customer Service at 1-877-551-BList (7257).<br>
          
          Q: Can I change my address once my order has been placed?<br>
          A: Once an order is submitted, we do not have the capability to change an address. To make an address change, we would have to cancel the order and replace it with the correct address.<br>
          
          Q: Can I change the size, color, or quantity of my order?<br>
          A: Once an order is submitted we do not have the capability to make any changes. To make a change, we would have to cancel the order and replace it with the correct information.<br>
          
          Q: My order shows delivered and I did not receive my package. What should I do?<br>
          A: We take matters like these very seriously. If your package shows delivered and you are unable to locate the package please contact Customer Service at 1-877-551-BList (7257) so that we can start an investigation. Please be sure to have your order number and tracking number readily available.<br></br>
          
          Returns<br></br>
          Q: What if my merchandise is incorrect or damaged?<br>
          A: We take matters like these very seriously. Please contact us directly at 1-877-551-BList (7257) and let us know so we can resolve these matters in a timely manner. It is very important that you do not try to return these items in a store because it is possible they will be denied for a return credit.<br>
          
          Q: How can I return my order?<br>
          A: You can either bring your item to your local BList Avenue store or send it back to us. To return through the mail, you can start your return directly from your BList.com account order history or by entering your order number and billing zip code on our returns website. You can find your order number in the top right corner of your packing slip or in the subject line of your shipping confirmation email.<br>
          
          Q: What if my merchandise is incorrect or damaged?<br>
          A: We apologize if any of your items are anything less than perfect. You can either bring your item to your local BList Avenue store or send it back to us.<br>
          
          Q: How much does it cost to return my item through BList.com?<br>
          A: $9.95, which covers shipping and insurance.<br>
          
          Q: How long will it take for my return to be received and a credit issued?<br>
          A: Returns can take up to 3 weeks to be processed and refunded. Please be advised this timeframe can take longer during the holiday season.<br></br>
          
          Payment Methods<br></br>
          Q: What payment types are accepted?<br>
          A: We accept the following tenders: BList Avenue Store Card, BList Avenue Mastercard, Visa, Mastercard, American Express, Discover, Japan Credit Bureau, China Union Pay Credit, Diners Club, PayPal, and Masterpass.<br>
          
          Q: Do you accept gift cards?<br>
          A: Yes, we accept BList Avenue gift cards with a PIN code on the back of the card. For security reasons, when placing an order with a gift card as a form of payment, a credit card is required in conjunction with the gift card.<br>
          
          Q: How many promotional codes can I use on a single order and are there any restrictions?<br>
          A: We offer a variety of promotional codes to our customers such as gift with purchases, free shipping, free returns, percentage off, and dollar amount off. A total of 5 promotional codes can be used at checkout as long as they are not two monetary codes, such as percentage off or dollar off. Promotional codes may exclude certain brands or categories of merchandise, which will be listed in the details of the promotional code.<br>
          
          Q: How do I redeem my points online?<br>
          A: Customers have the capability to redeem their BList First points online in the form of an e-gift card or a standard gift card. To do so, please log into your online shopping account to review your points and eligibility.<br>
          
          Q: What is an online shopping account and the benefits of having one?<br>
          A: The online shopping account serves as a speedier checkout process for our customers. By having an online shopping account our customers have the capability to: review and redeem BList First points, view order history, control email preferences, save their favorite items to view later, and store their billing and shipping information.<br>
          
          `
    
          faqDiv.append(faqTitle, faqText)
          containerDiv.append(faqDiv)
    
      }
  })
