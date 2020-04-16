class Cart {
    constructor(person, dish_list){
        this.person = person;
        this.dish_list = dish_list ? dish_list : [];
    }
}

class Person {
    constructor(name, mail, food_points, purchased_dishes){
        this.name = name ? name : "guest";
        this.mail = mail ? mail : "-";
        this.food_points = food_points ? food_points : 0; 
        this.purchased_dishes = purchased_dishes ? purchased_dishes : {}; 
    }
}

/* (проверить наличие товара на складах, проверить стоимости 
    почтовых доставок, проверить актуальные налоговые ставки в 
    разных частях света*/
class Dish {
    constructor(name, number,food_points, сaloric_content, proteins, fats, carbohydrates, in_stock, postage_costs, taxis_cost, discount)
    {
        this.name = name;
        this.food_points = food_points;
        this.сaloric_content = сaloric_content; 
        this.proteins =  proteins; 
        this.fats = fats; 
        this.carbohydrates = carbohydrates; 
        this.in_stock = in_stock;
        this.postage_costs = postage_costs;
        this.taxis_cost = taxis_cost;
        this.number = number;
        this.discount = discount;
        //this. = ; 
    }
}