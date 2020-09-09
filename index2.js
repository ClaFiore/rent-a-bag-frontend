let topnav = document.querySelector('.topnav')   // duplicate

function addFilterFunc(user){
    let dropDownDiv = document.createElement('div')
    dropDownDiv.className = 'drop-down-div'
    topnav.append(dropDownDiv)

    let filter = document.createElement('select')
        filter.innerHTML = `<select id="filter">
                            <option value="">Filter By</option>
                            <option value="designer">Designer</option>
                            <option value="available">Available for Rent</option>
                            <option value="rented">Currently Rented</option>
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
                break
            case 'rented':
                console.log('rented')
                break
            default:
                console.log('no click')
        }
        })

        function sortByDesigner(){
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
        allBagsArray.sort(sortOn("designer"))
        renderBags(allBagsArray, user)
        }
    }
