import {TrainerData} from './Opponents.js'

let OpponentsData= Result()
let TrainersData
let ChampsData
let Total

async function Result(){
    let Results= await TrainerData()
    return(Results)
}

export async function LevelOfChamp(Generation){
    OpponentsData= await OpponentsData
    
    TrainersData=OpponentsData[0]
    ChampsData= OpponentsData[2]
    let Counter=0
    let TrainerLevel={}
    let NumberPokemon={};
    let TrainerName
    
    for (let name in TrainersData[Generation]){
       
        let Average=0
        let Sum=0
     

        for (let game in TrainersData[Generation][name]){

            for(let pokemon in TrainersData[Generation][name][game] ){
                Sum+=(TrainersData[Generation][name][game][pokemon][4])
                
            }
        Total=CountProp(TrainersData[Generation][name][game])
        
        Average=Sum/Total

        TrainerName= Object.keys(TrainersData[Generation])[Counter]
        NumberPokemon[TrainerName]=Total
        }

        TrainerLevel[TrainerName]=Average.toFixed(1)
        Counter+=1
        
        
    }
    return [TrainerLevel,NumberPokemon]
}

export function CountProp(obj){
    let Count=0
    Count=Count+Recursive(obj,Count)
    Count=Count/5
    return Count
}
export function Recursive(obj,Count){
    Count=0
    for (let key in obj){
        if(typeof(obj[key])=="object"){
            Count=Count+(Recursive(obj[key],Count))
        }
        else{
            Count=Count+1
        }
    }
    return Count
} 
