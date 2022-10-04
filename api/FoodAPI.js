import axios from 'axios';
import {APP_ID} from '@env';
import {APP_KEY} from '@env';

let total = 30; 

const getCarbs = async (arrayFood) =>{
    try{
        let totalCarbs = 0; 
        const lastFood = arrayFood[arrayFood.length-1];
        await arrayFood.map((food) =>{
            axios(
                `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${food}&nutrition-type=logging&category=generic-foods`
            ).then((response)=> {
                const carbs = response.data.hints[1].food.nutrients.CHOCDF;
                totalCarbs += carbs;             
                if(food === lastFood){
                    console.log(totalCarbs)
                    total = totalCarbs;
                }
            });

        });

        return total;

    }catch(err){
        console.error(`Error!: ${err}`);
    }
}

export default getCarbs;