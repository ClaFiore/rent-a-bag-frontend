document.addEventListener("DOMContentLoaded", () => {

    let bagsURL ='http://localhost:3000/handbags/'
    let usersURL = 'http://localhost:3000/users/'
    let signUpForm = document.querySelector('#sign-up')
    let signLoginDiv = document.querySelector('#signup-login')
    


    function getBags(){
    fetch(bagsURL)
    .then(resp => resp.json())
    .then(bags => renderBags(bags))}


    function renderBags(bags){
        bags.forEach(bag =>
            {
        renderBag(bag)} 
        
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
        fetch(usersURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: form.name.value,
                email: form.email.value,
                address: form.address.value,
                balance: formBalance

            })
        })
        .then(resp => resp.json())
        .then(user => 
            console.log(user),
            getBags()
            
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
    })
}

function loginUser(form){
    fetch(usersURL)
    .then(resp => resp.json())
    .then(users => 
        users.forEach(user => { 
           if (user.email === form.email.value)
           {let currentUserId = user.id
            console.log(currentUserId)}  
        })
        )

}    
 

    function renderBag(bag){
        console.log('hello')
    }
    
    
})