import axios from 'axios';
import {APP_ID} from '@env';
import {APP_KEY} from '@env';
import { Alert } from 'react-native';


const promiseFood = async (food) =>{
    let carbs = await axios(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${food}&nutrition-type=logging&category=generic-foods`
    ).then((response)=> {
        const carbs = response.data.hints[1].food.nutrients.CHOCDF;
        return carbs; 
    })
    .catch((err) =>{
        Alert.alert('Food name is invalid. Please enter your food again.');
    })

    return carbs; 
}

const getCarbs = async (arrayFood) =>{
    try{
        let total = 0; 

        let promises = arrayFood.map((food) =>{
            return promiseFood(food);
        });

        let numFruits = await Promise.all(promises)
            .then((res)=>{
                res.map((item) =>{
                    total = total + item
                });
            });
        
        return Math.round(total);

    }catch(err){
        console.error(`Error!: ${err}`);
    }
}

export default getCarbs;