function addDishToCart(dish_number)
{
    let dishes_list= [];
    initializeDishes(dishes_list)
    let person = new Person("Jack");//({name: "Jack", food_points : "200"})//({ radius: 10, x: 40, y: 30 }); 
    let my_cart = new Cart(person);
    let number_of_orders = 0;
    for(let key in dishes_list)
    {
        if(String(dish_number) == String(dishes_list[key].number))
        {
            my_cart.dish_list.push(dishes_list[key]);
            localStorage.setItem('dishes_list[key].name', '1');
            if(getCookie(dishes_list[key].name) !== undefined)
            {
                number_of_orders = Number(getCookie(dishes_list[key].name));
                number_of_orders++;
                setCookie(dishes_list[key].name, String(number_of_orders), { 'max-age': 360000});
            }
            else
                setCookie(`${dishes_list[key].name}`, '0', { 'max-age': 360000});
        }
    }
    //document.cookie = "my_cart=" + my_cart + ";expires=Fri, 7 Aug 2020 01:00:00 UTC;";
}



function initializeDishes(dishes)
{        
    for(let i =1; i < 10; i++)
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
        let discount  = String(document.getElementById("discount"+ String(i)).innerText);
        let dish = new Dish(name, String(i),food_points, сaloric_content, proteins, 
        fats, carbohydrates, in_stock, postage_costs, taxis_cost, discount);
        //alert(`discount on ${name}: ${discount}`)
        dishes.push(dish)
    }
}


function updateProfileStat()//person)
{
    let dishes_list= [];
    initializeDishes(dishes_list)
    let sum_food_points = 0, sum_caloric = 0, sum_proteins = 0, sum_fats = 0,sum_carbohydrates = 0;
    //alert("updating profile stat in function")
    for(let key in dishes_list)
    {
        if(getCookie(dishes_list[key].name) !== undefined)
        {
            //alert(dishes_list[key].name)
            let number_of_orders = Number(getCookie(String(dishes_list[key].name)));
            sum_food_points += dishes_list[key].food_points*number_of_orders;
            sum_caloric += dishes_list[key].сaloric_content *number_of_orders;
            sum_fats += dishes_list[key].fats  *number_of_orders;
            sum_carbohydrates += dishes_list[key].carbohydrates *number_of_orders;
            sum_proteins += dishes_list[key].proteins*number_of_orders;
            document.getElementById("quantity" + String(dishes_list[key].number)).innerText = (number_of_orders + 1); 
        }
        else
            document.getElementById("table_stat_line" + String(dishes_list[key].number)).style.display = "none";
    }
    document.getElementById("stat_food_points").innerText =  sum_food_points;
    document.getElementById("stat_fats").innerText =  sum_fats;
    document.getElementById("stat_carbohydrates").innerText =  sum_carbohydrates;
    document.getElementById("stat_proteins").innerText =  sum_proteins;
    document.getElementById("stat_caloric_content").innerText =  sum_caloric;
    document.getElementById("food_points").innerText =  "your food points: " + String(sum_food_points);

}



function buyDishes()//(cart, profile)
{

    //cart.person.name = String(document.getElementById("name_input").value);
    //cart.person.mail = String(document.getElementById("male_input").value);
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

function showDiscount()
{
    let dishes_list= [];
    initializeDishes(dishes_list);
    for(let key in dishes_list)
    {
        if(String(dishes_list[key].discount) == String(0))
            document.getElementById("product" + String(dishes_list[key].number)).style.display = "none";    
    }
}

function showOnlyInStock()
{
    let dishes_list= [];
    initializeDishes(dishes_list);
    for(let key in dishes_list)
    {
        if(String(dishes_list[key].in_stock) != "true")
            document.getElementById("product" + String(dishes_list[key].number)).style.display = "none";    
    }
}

function showAll()
{
    let dishes_list= [];
    initializeDishes(dishes_list);
    for(let key in dishes_list)
    {
        document.getElementById("product" + String(dishes_list[key].number)).style.display = "inline";    
    }
}


//
// Пример использования:
//setCookie('user', 'John', {secure: true, 'max-age': 3600});
function getCookie(name) 
{
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

//setCookie('user', 'John', {secure: true, 'max-age': 3600});
function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) 
    {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) 
    {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) 
        {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
      'max-age': -1
    })
  }