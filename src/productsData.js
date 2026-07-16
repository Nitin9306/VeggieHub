import tomato from "./pages/images/tomato-15523.png";
import potato from "./pages/images/potato.png";
import onion from "./pages/images/onion.png";
import broccoli from "./pages/images/broccoli.png";
import bhindi from "./pages/images/bhindi.png";
import apple from "./pages/images/apple.png";
import banana from "./pages/images/banana.png";
import orange from "./pages/images/orange.png";
import mango from "./pages/images/mango.png";
import graps from "./pages/images/graps.png";
import brinjal from "./pages/images/Brinjal.png";
import cabbage from "./pages/images/Cabbage.png";
import palak from "./pages/images/palak.png";
import bottle from "./pages/images/bottle.png";
import green from "./pages/images/greenchili.png";
import papaya from "./pages/images/papaya.png";
import guava from "./pages/images/Guava.png";


const products = [
    {
        id : 1,
        name : "Tomato",
        pack : "1 Pack",
        price : 29,
       rating : 2.1,
        image : tomato,
        oldprice : 49,
        review: 220,
        discount: "10%",
        category : "vegetables",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
       
    },
    {
        id : 2,
        name : "Potato",
        pack : "1 pack",
        price : 49,
        rating : 2.1,
        image : potato,
        discount: "10%",
        oldprice:56,
        description : "fresh and helthy potatos",
        category : "vegetables",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
        
    },
     {
        id : 3,
        name : "Onion",
        pack : "1 Pack",
        price : 29,
        image : onion,
        discount: "10%",
        oldprice:56,
        category : "vegetables",
        description : "A humble and versatile ingredient, onions add depth and complexity to a wide range of dishes. Whether you're cooking up a hearty stew or sautéing vegetables for a quick side dish, onions bring a pungent flavor that elevates the entire meal. Their sweet, caramelized flavor is especially prized when cooked slowly over low heat, bringing out their natural sugars. Onions are also incredibly versatile in terms of preparation. They can be chopped, sliced, diced, or even pureed to add moisture and flavor to sauces and soups. Raw onions bring a pungent crunch to salads and sandwiches, while cooked onions add a tender sweetness that's perfect for complementing meats, cheeses, and grains. Whether you're cooking up a family dinner, experimenting with new recipes, or simply need a reliable pantry staple, 1 kg of onions is an excellent investment. With their long shelf life and versatility in the kitchen, this humble ingredient is sure to become a trusted companion on your culinary journey. So what are you waiting for? Go ahead and buy this product online today!",
        policy : "This product is non-returnable. For more details, please refer to the policy here."

    },
     {
        id : 4,
        name : "broccoli",
        price : 49,
        discount: "10%",
        oldprice:56,
        image : broccoli,
       category : "vegetables",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
    {
        id : 5,
        name : "brinjal",
        price : 49,
        image : brinjal,
        discount: "10%",
        oldprice:56,
        category : "vegetables",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
    {
        id : 6,
        name : "Bottle",
        price : 49,
        image : bottle,
        discount: "10%",
        oldprice:56,
        category : "vegetables",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
    {
        id : 7,
        name : "Cabbage",
        price : 49,
        image : cabbage,
        discount: "10%",
        oldprice:56,
        category : "vegetables",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
    {
        id : 8,
        name : "Palak",
        price : 49,
        image : palak,
        discount: "10%",
        oldprice:56,
        category : "vegetables",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
     {
        id : 9,
        name : "Green Chili",
        price : 49,
        discount: "10%",
        oldprice:56,
        image : green,
        category : "vegetables",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },

     {
        id : 10,
        name : "apple",
        price : 109,
        discount: "10%",
        oldprice:56,
        image : apple,
        category : "fruits",

        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
     {
        id : 11,
        name : "banana",
        price : 49,
        image : banana,
        discount: "10%",
        oldprice:56,
        category : "fruits",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
     {
        id : 12,
        name : "Grapes",
        price : 89,
        image : graps,
        discount: "10%",
        oldprice:56,
        category : "fruits",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
     {
        id : 13,
        name : "Mango",
        price : 109,
        discount: "10%",
        oldprice:56,
        image : mango,
        category : "fruits",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
     {
        id : 14,
        name : "Orange",
        price : 69,
        image : orange,
        discount: "10%",
        oldprice:56,
        category : "fruits",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
     {
        id : 15,
        name : "Papaya",
        price : 69,
        image : papaya,
        discount: "10%",
        oldprice:56,
        category : "fruits",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
    {
        id : 16,
        name : "Guava",
        price : 69,
        image : guava,
        discount: "10%",
        oldprice:56,
        category : "fruits",
        description : "fresh and helthy broccoli",
        policy : "This product is non-returnable. For more details, please refer to the policy here."
         
    },
]
export default products;