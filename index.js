document.addEventListener("DOMContentLoaded", () => {
  let currentUser
    let bagsURL ='http://localhost:3000/handbags/'
    let usersURL = 'http://localhost:3000/users/'
    let userHandbagsURL = 'http://localhost:3000/user_handbags'

    let signUpForm = document.querySelector('#sign-up')
    let signLoginDiv = document.querySelector('#signup-login')
    let topnav = document.querySelector('.topnav')
    let listedBtn = document.querySelector('#listed-btn')
    let rentedBtn = document.querySelector('#rented-btn')
    let listBagBtn = document.querySelector('#list-bag-btn')

    let div = document.querySelector('#view-listed-bags')
    let viewBagDiv = document.querySelector('#view-bag')
    const containerDiv = document.querySelector('#container')
    const listBagDiv = document.querySelector('#list-bag-div')
    

    function getBags(user){
        
    fetch(bagsURL)
    .then(resp => resp.json())
    .then(bags => renderBags(bags, user))}


    function renderBags(bags, user){
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
          />
          <input
            type="text"
            name="email"
            value=""
            placeholder="Email"
            class="input-text"
            required
          />
          <input
            type="text"
            name="address"
            value=""
            placeholder="Address"
            class="input-text"
            required
          />
          <input
            type="text"
            name="balance"
            value=""
            placeholder="Balance"
            class="input-text"
            required
          />
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
            myRentedBags(currentUser)
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
    loginFormDiv.append(loginForm)
    loginForm.innerHTML = `
    <input
            type="text"
            name="email"
            value=""
            placeholder="Email"
            class="input-text"
            required
          />
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
            myRentedBags(currentUser)} 
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

            viewBtn.innerText = 'View Me'
            viewBtn.addEventListener('click', () => displaySingleBag(bag, user))

        viewDiv.append(viewBtn)
        imageDiv.append(imageBag)
        bagDiv.append(designerh3, imageDiv, priceP, viewDiv)
        containerDiv.append(bagDiv)}
    }
    
    function displaySingleBag(bag, user){
        
        containerDiv.style.display = 'none'
        let imgDiv = document.createElement('div')
        let image = document.createElement('img')
        image.src = bag.image
        image.width = 300
        image.height = 300
        let detailsDiv = document.createElement('div')

        let h3designer = document.createElement('h3')
            h3designer.innerText = bag.designer
        let pBagType = document.createElement('p')
            pBagType.innerText = bag.bag_type
        let pColor = document.createElement('p')
            pColor.innerText = bag.color
        let pFabric = document.createElement('p')
            pFabric.innerText = bag.fabric
        let pPrice = document.createElement('p')
            pPrice.innerText = bag.price

        let rentBtn = document.createElement('button')
            rentBtn.innerText = 'Rent Me'
            rentBtn.addEventListener('click', (e) => rentABag(bag, user))

        let homeBtn = document.createElement('button')
            homeBtn.innerText = 'All Handbags'
            homeBtn.addEventListener('click', () => {
                viewBagDiv.innerHTML = ""
                containerDiv.style.display = 'block'
            })
        
        
        detailsDiv.append(h3designer, pBagType, pColor, pFabric, pPrice, rentBtn, homeBtn)
        imgDiv.append(image)
        
        viewBagDiv.append(imgDiv, detailsDiv)
    }

    function rentABag(bag, user){
        let configObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({user_id: user.id, handbag_id: bag.id})
        }
        fetch(userHandbagsURL, configObj)
        .then(res => res.json())
        .then(bag => myRentedBags(user))
    }

    function myListedButton(user){

        listedBtn.addEventListener('click', (e) => {
            div.innerHTML = ""
            viewBagDiv.style.display ='none'
            // let div = document.querySelector('#view-listed-bags')
            containerDiv.style.display = 'none'

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
            console.log(e)
            // editMyBag(bag,user)
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
    fetch(usersURL)
    .then(res => res.json())
    .then(rentedBtn.addEventListener('click', (e) => {

        div.innerHTML = ""
            containerDiv.style.display = 'none'
            viewBagDiv.style.display ='none'
        
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
            deleteBtn.innerText = 'Return'
            deleteBtn.addEventListener('click', (e) => {
                console.log(e)
                deleteMyBag(bag, bagDiv)
            })
            

        viewDiv.append(deleteBtn)
        imageDiv.append(imageBag)
        bagDiv.append(designerh3, imageDiv, priceP, viewDiv)
        div.append(bagDiv)
        // console.log(user.listed_bags)
    })
}))}

    function listABag(){
    listBagBtn.addEventListener('click', () => {
        containerDiv.innerHTML = ''
        viewBagDiv.innerHTML = ''
        div.innerHTML = ''

        let listBagForm = document.createElement('form')
        listBagForm.className = 'list-bag-form'
        listBagForm.innerHTML = `<input type="text" name="designer" value="" placeholder="Designer" class="input-text" required /> <br>
        <input type="text" name="bag_type" value="" placeholder="Bag Type" class="input-text" required /> <br>
        <input type="text" name="color" value="" placeholder="Color" class="input-text" required /> <br>
        <input type="text" name="fabric" value="" placeholder="Fabric" class="input-text" required /> <br>
        <input type="number" name="price" value="" placeholder="Price" class="input-text" required /> <br>
        <input type="text" name="image" value="" placeholder="Image Url" class="input-text" required /> <br>
        <input type="submit" name="submit" value="List My Bag" class="submit"  />`

        listBagDiv.append(listBagForm)

        listBagForm.addEventListener('submit', (e) => {

            e.preventDefault()
            
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
            .then(console.log)
         })
    })
    }

    listABag()
    myListedButton()
    myRentedBags()
})