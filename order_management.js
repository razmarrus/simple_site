function addDishToCart(dish_number)
{
    let dishes_list= [];
    initializeDishes(dishes_list)
    //alert(dish_number);
    let person = new Person({name: "Jack", food_points : "200"})//({ radius: 10, x: 40, y: 30 }); 
    let my_cart = new Cart(person);
    for(let key in dishes_list)
    {
        if(String(dish_number) == String(dishes_list[key].number)){
            //alert("found!")
            my_cart.dish_list.push(dishes_list[key]);

        }
        //alert(dishes_list[key].name);
    }
    /*for(key in my_cart.dish_list)
        alert(my_cart.dish_list[key].name)
    alert(dish_number);*/
}

function initializeDishes(dishes)
{        
    for(let i =1; i < 3; i++)
    {
        let name = String(document.getElementById("food_name"+ String(i)).innerText);
        let food_points = String(document.getElementById("food_points"+ String(i)).innerText);
        let сaloric_content = String(document.getElementById("сaloric_content"+ String(i)).innerText);
        let proteins = String(document.getElementById("proteins"+ String(i)).innerText);
        let fats = String(document.getElementById("fats"+ String(i)).innerText);
        let carbohydrates = String(document.getElementById("carbohydrates"+ String(i)).innerText);
        let in_stock = String(document.getElementById("in_stock"+ String(i)).innerText);
        let postage_costs = String(document.getElementById("postage_costs"+ String(i)).innerText);
        let taxis_cost  = String(document.getElementById("taxis_cost"+ String(i)).innerText);
        //let  = String(document.getElementById(""+ String(i)).innerText);
        //alert(`${name}`);
        //alert(name, food_points, сaloric_content, proteins, fats, carbohydrates, in_stock, postage_costs, taxis_cost)
        let dish = new Dish(name, String(i),food_points, сaloric_content, proteins, fats, carbohydrates, in_stock, postage_costs, taxis_cost);
        dishes.push(dish)
    }
    //name, number,food_points, сaloric_content, proteins, fats, carbohydrates, in_stock, postage_costs, taxis_cost
}


//let room_number = String(document.getElementById("room_number"+ String(i)).innerText)
//        document.getElementById("fname"  + String(i)).value = "";

function updateProfileStat(person)
{
    let dish_map = person.purchased_dishes;
    for (var [key, value] of dish_map.entries()) 
    {
        document.getElementById("quantity" + String(value)).innerText = key; 
    }
    document.getElementById("food_points").innerText = "Food points" + String(person.food_points);
}

function buyDishes(cart, profile)
{
    cart.person.name = String(document.getElementById("name_input").value);
    cart.person.mail = String(document.getElementById("male_input").value);
    for(let key in cart.dish_list)
    {
        //purchased_dishes
        if((profile.purchased_dishes).has(cart.dish_list[key].name))
        {
            let old_value = Number(profile.purchased_dishes.get(cart.dish_list[key].name));
            old_value +=1;
            profile.purchased_dishes.set(cart.dish_list[key].name, old_value)
        }   
        else 
            profile.purchased_dishes.set(cart.dish_list[key].name, 1)
    }
}