class Country {
    constructor(name, number,delivery_price, tax){
        this.delivery_price = delivery_price;
        this.tax = tax ? tax : 0;
        this.number = number;
        this.name = name;
    }
}


/* (проверить наличие товара на складах, проверить стоимости 
    почтовых доставок, проверить актуальные налоговые ставки в 
    разных частях света*/
class Dish { //name, number,food_points, сaloric_content, proteins, fats, carbohydrates, in_stock, postage_costs, taxis_cost, discount, price
    constructor(name, number,food_points, сaloric_content, proteins, fats, carbohydrates, in_stock, discount, price)
    {
        this.name = name;
        this.food_points = food_points;
        this.сaloric_content = сaloric_content; 
        this.proteins =  proteins; 
        this.fats = fats; 
        this.carbohydrates = carbohydrates; 
        this.in_stock = in_stock;
        this.number = number;
        this.discount = discount;
        this.price = price ? price : 100;
    }
}