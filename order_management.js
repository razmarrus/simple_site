function addDishToCart(dish_number)  //срабатывает при нажатии buy на index.html - добавление блюда в заказ
{
    var dish_list = JSON.parse(localStorage.getItem("dish_list")) //получаем список блюд из локального хранилища
    let number_of_orders = 0;
    for(let key in dish_list)
    {
        if(String(dish_number) == String(dish_list[key].number))  //находим выбранное блюдо
        {
            if(dish_list[key].in_stock != "true")  //если оно не находится в продаже, то выходим из функции
            {
                alert(`item: ${dish_list[key].name} is not in stock`);
                return;
            }
            number_of_orders = Number(localStorage.getItem(dish_list[key].name))  //смотрим, сколько раз оно было заказано (можно заказать больше одного)
            if(number_of_orders  !== null) //&& number_of_orders > 0)
                localStorage.setItem(dish_list[key].name, String(number_of_orders + 1));   //если оно уже было заказано - увеличиваем количество заказов на 1
            else
                localStorage.setItem(dish_list[key].name, String(1));   //при первом заказе счетчик заказов устанавливается на 1 
            alert(`item: ${dish_list[key].name} now in your cart!`);
        }
    }
}


function initializeInfo()   //получаем данные для таблицы блюд
{       
    let dishes = []; 
    for(let i =1; i < 10; i++)
    {
        let name = String(document.getElementById("food_name"+ String(i)).innerText);
        let food_points = String(document.getElementById("food_points"+ String(i)).innerText);
        let сaloric_content = String(document.getElementById("сaloric_content"+ String(i)).innerText);
        let proteins = String(document.getElementById("proteins"+ String(i)).innerText);
        let fats = String(document.getElementById("fats"+ String(i)).innerText);
        let carbohydrates = String(document.getElementById("carbohydrates"+ String(i)).innerText);
        let in_stock = String(document.getElementById("in_stock"+ String(i)).innerText);
        let discount  = String(document.getElementById("discount"+ String(i)).innerText);
        let price  = String(document.getElementById("price"+ String(i)).innerText);
        let dish = new Dish(name, String(i),food_points, сaloric_content, proteins, 
        fats, carbohydrates, in_stock, discount, price);
        dishes.push(dish)
    }

    var serialObj = JSON.stringify(dishes); //сериализуем 
    localStorage.setItem("dish_list", serialObj); //запишем его в хранилище по ключу 
}


function initializeCountry()  //данные для таблицы стран (используются для доставки)
{
    let countries = [];
    for(let i = 1; i < 14; i++)
    {
        let name = String(document.getElementById("delivery_country" + String(i)).innerText);
        let delivery_price = document.getElementById("delivery_price"  + String(i)).innerText;
        let tax  = document.getElementById("delivert_tax"  + String(i)).innerText;
        let country = new Country(name, i,delivery_price, tax);
        countries.push(country)
    }
    var serialObj = JSON.stringify(countries); 
    localStorage.setItem("country_list", serialObj);
}


/* При покупке начисляются специальные очки - FoodPoints, а также ведётся статистика по 
потребляемым продуктам, их составу, калорийности и полезности. */

function updateProfileStat()        //обновление таблицы в profile.html - 
{
    let dish_list= [];
    dish_list = JSON.parse(localStorage.getItem("dish_list")) 
    let sum_food_points = 0, sum_caloric = 0, sum_proteins = 0, sum_fats = 0,sum_carbohydrates = 0;
    for(let key in dish_list)
    {
        if(getCookie(dish_list[key].name) !== undefined)  //смотрим на приобретенные продукты (они хранятся в куки)
        {
            let number_of_orders = Number(getCookie(String(dish_list[key].name)));
            sum_food_points += dish_list[key].food_points*number_of_orders;
            sum_caloric += dish_list[key].сaloric_content *number_of_orders;
            sum_fats += dish_list[key].fats  *number_of_orders;
            sum_carbohydrates += dish_list[key].carbohydrates *number_of_orders;
            sum_proteins += dish_list[key].proteins*number_of_orders;
            document.getElementById("quantity" + String(dish_list[key].number)).innerText = (number_of_orders); 
        }
        else
            document.getElementById("table_stat_line" + String(dish_list[key].number)).style.display = "none";
    }
    document.getElementById("stat_food_points").innerText =  sum_food_points;   //заполняем таблицу
    document.getElementById("stat_fats").innerText =  sum_fats;
    document.getElementById("stat_carbohydrates").innerText =  sum_carbohydrates;
    document.getElementById("stat_proteins").innerText =  sum_proteins;
    document.getElementById("stat_caloric_content").innerText =  sum_caloric;
    document.getElementById("food_points").innerText =  "your food points: " + String(sum_food_points);  //информация о Food Points
}


/*Администрирование: мониторинг всех акций на товары*/
function deliveryInfo()  //обновление таблицы с итемами, которые бали заказаны на delivery.heml
{
    let dish_list = JSON.parse(localStorage.getItem("dish_list")) 
    let sum_price = 0, sum_quantity = 0, sum_discount_price =0;
    for(let key in dish_list)
    {
        let number_of_orders = Number(localStorage.getItem(dish_list[key].name));
        if( number_of_orders !== null && number_of_orders > 0)  //если итем был заказн - добавляем его в таблицу
        {
            let price_with_discount = Number(dish_list[key].price)
            if(Number(dish_list[key].discount) > 0)
                price_with_discount = Number(dish_list[key].price) - Number(dish_list[key].price)*Number(dish_list[key].discount);
            document.getElementById("quantity" + String(dish_list[key].number)).innerText = (number_of_orders); 
            document.getElementById("price_of_dish" + String(dish_list[key].number)).innerText = dish_list[key].price; 
            document.getElementById("price_of_with_discount" + String(dish_list[key].number)).innerText = price_with_discount; 
            document.getElementById("discount" + String(dish_list[key].number)).innerText = String(Number(dish_list[key].discount) * 100) + "%"; 
            sum_price += dish_list[key].price*number_of_orders;
            sum_discount_price += price_with_discount*number_of_orders
            sum_quantity += number_of_orders;
        }
        else
            document.getElementById("table_stat_line" + String(dish_list[key].number)).style.display = "none";  //если нет - строка не отображается
    }
    document.getElementById("quantity_of_order").innerText = sum_quantity;  //суммарная стоимость и цена
    document.getElementById("price_of_order").innerText = sum_price; 
    document.getElementById("price_of_order_with_discount").innerText = sum_discount_price; 

}


/* 
Администрирование: проверить стоимости почтовых доставок, проверить актуальные налоговые ставки в разных частях света).  
*/

function updateDeliveryPrice()  //работаем со стоимостью доставки и налогами (первая кнопка на delivery.html)
{
    let price = 0;
    let country_list = JSON.parse(localStorage.getItem("country_list"))
    if (document.getElementById("ordinary_switch").checked)   //если была выбрана обычная доставка
    {
        for(let i = 1; i < 14; i++)     //идем по всем странам
        {
            if(document.getElementById("ordinary_delivery_option" + String(i)).selected)  //находим выбранную страну
            {
                let selected_number = Number(country_list[i].number) -2;
                price = Number(document.getElementById("price_of_order").innerText)
                price = price + price* Number(country_list[selected_number].tax) *0.01 + Number(country_list[selected_number].delivery_price);   //обновляем цену
                document.getElementById("final_price").innerText = "Price with delivery: " + String(price) + "\ntax is " + String(country_list[selected_number].tax)+ "%; delivery is " + String(country_list[selected_number].delivery_price);
                break;               
            }
        }
    }
    else     //если это экспресс доставка
    {
        for(let i = 1; i < 6; i++)
        {
            if(document.getElementById("express_delivery_option" + String(i)).checked)  //ищем выбранную страну
            {
                let selected_number = Number(country_list[i].number) -2;
                price = Number(document.getElementById("price_of_order").innerText);
                price = price + price * Number(country_list[selected_number].tax) *0.01 + Number(country_list[selected_number].delivery_price) + 10; 
                document.getElementById("final_price").innerText = "Price with delivery: " + String(price) + "\ntax is " + String(country_list[selected_number].tax)+ "%; delivery is " + String(country_list[selected_number].delivery_price) + " ; +10 for express delivery";
                break;               
            }
        }
    }
}


function buyDishes()  //самая нижняя кнопка в delivery: переносит объекты из локального хранилища в куки
{
    var dish_list = JSON.parse(localStorage.getItem("dish_list")) 
    for(let key in dish_list)                                   //идем по списку продуктов
    {
        let number_of_orders = Number(JSON.parse(localStorage.getItem(dish_list[key].name)));
        if( number_of_orders !== null && number_of_orders > 0)  //если итем был ранее добален в корзину, то работаем с ним дальше
        { 
            if(getCookie(dish_list[key].name) !== undefined)  //если итем был ранее заказан,то увеличиваем число купленных экземпляров
            {
                number_of_orders +=  Number(getCookie(dish_list[key].name));
                setCookie(dish_list[key].name, String(number_of_orders), { 'max-age': 3600000});
                localStorage.removeItem(dish_list[key].name);   //удаляем из локального хранилища
            }
            else                                                //если заказывается первый раз, то заносим в куки
            {
                setCookie(dish_list[key].name, (JSON.parse(localStorage.getItem(dish_list[key].name))), { 'max-age': 3600000});
                localStorage.removeItem(dish_list[key].name);
            }
        }

    }
    alert("Your order is on the way");
}


/*следующие три функции проверяют наличие товаров на складах и присутвие скидок */

function showDiscount()  //кнопка-фильтр для index.html
{
    let dish_list= [];
    document.getElementById("showAllButton").style.background=`#555`;  //изменяем цвет других кнопок фильтров
    //document.getElementById("showInStockButton").style.background= `#555`;
    document.getElementById("showDiscountButton").style.background=`#008000`;
    dish_list = JSON.parse(localStorage.getItem("dish_list")) 
    for(let key in dish_list)
    {
        if(String(dish_list[key].discount) == String(0))
            document.getElementById("product" + String(dish_list[key].number)).style.display = "none";    //отображаем только те итемы, что на скидке
    }
}


function showOnlyInStock() //кнопка-фильтр для index.html  
{
    let dish_list= [];
    document.getElementById("showAllButton").style.background=`#555`;
    document.getElementById("showInStockButton").style.background= `#008000`;
    //document.getElementById("showDiscountButton").style.background=`#555`;

    dish_list = JSON.parse(localStorage.getItem("dish_list")) 
    for(let key in dish_list)
    {
        if(String(dish_list[key].in_stock) != "true")
            document.getElementById("product" + String(dish_list[key].number)).style.display = "none";     
    }
}

function showAll() //кнопка-фильтр для index.html
{
    document.getElementById("showAllButton").style.background= `#008000`;
    document.getElementById("showInStockButton").style.background=`#555`;
    document.getElementById("showDiscountButton").style.background=`#555`;
    let dish_list= [];
    dish_list = JSON.parse(localStorage.getItem("dish_list")) 
    for(let key in dish_list)
    {
        document.getElementById("product" + String(dish_list[key].number)).style.display = "inline";  //отображаем все итемы  
    }
}


//
// функции для работы с куки
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