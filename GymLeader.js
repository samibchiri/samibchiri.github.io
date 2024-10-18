import {TrainerData} from './Opponents.js'
import {Recursive,CountProp} from './ChampLevels.js'
import {ChampCardClick,fChampCheckboxes,ChampsCards,PokemonCardClickable,ChooseRandomChamp,ChooseRandomPokemon} from './Champions.js'
import { PokemonFilterBox, MoveFilterBox } from './FilterBoxes.js'

export let GymNumChosenPokemon = -1;


let ListGymleaders= document.querySelector(".ListGymleaders")
const template = document.querySelector('.GymleaderTemplate');
let clone
let GymleaderCard
let TrainerGen
let GymleadersList=[]
let TrainersData;
let GymleadersData;
let TrainerDictionary
let PokemonNumbers
let GenNumber
let Trainer2Name
let TrainerLevel
let PokemonAmount
let ListPokemons= document.querySelector(".ListPokemons")
let PokemonRandom=document.getElementById("PokemonRandom")
let PokemonCont= document.getElementById("PokemonCont")
let TrainerLocation
let GymleaderCheckboxes= document.querySelectorAll(".GymleaderCheckbox")
let GymleaderSearchCont= document.getElementById("GymleaderSearchCont")

let Total


let OpponentsData= Result()

async function Result(){
    // [TrainerData,GymleadersData,ChampionsData]= await TrainerData()
    let Results= await TrainerData()
    return(Results)
}

export function GymleaderCardClick(){
    setTimeout(()=>{
        
        let GymleaderCard= Array.from(ListGymleaders.querySelectorAll(".GymleaderCard"))
        GymleaderCard.forEach(card=>{
             card.addEventListener("click",()=>{
                
                TrainerLocation= (card.querySelector(".Trainer_Name").textContent)
                
                window.scrollTo({
                    top: 35,
                    behavior: "smooth" 
                    
                })

                ListGymleaders.innerHTML=""
                ListGymleaders.style.display="none"
                PokemonAmount= (card.querySelector(".Trainer_Amount").textContent).split(" ")[1]
                //console.log(PokemonAmount)
                PokemonAmount=parseInt(PokemonAmount)   
                //console.log("PokemonAMoutn")
                //console.log(PokemonAmount)
                GymNumChosenPokemon=6-PokemonAmount
                //ErrorMessage.textContent=ChosenTrainer+"  "+ PokemonAmount
                FilterButtons.innerHTML=""
                GymleaderSearchCont.style.display="none"
                FilterButtons.style.display="none"
                ListPokemons.style.display="grid"
                PokemonCont.style.display="flex"
                TrainerLocation=card.dataset.value
                console.log(TrainerLocation)
                console.log(6-PokemonAmount)
                PokemonCardClickable(TrainerLocation,PokemonAmount)
                InformationBox1.style.display="none"
                InformationBox2.style.display="none"
                PokemonSearch.style.display="flex"

                PokemonFilterBox()

                MoveFilterBox()
                

            
     
        
        })
        
    },0
    
    )
   
})
return TrainerLocation
}






        
export function CreateGymleaderCard(Name,Gen,Level,Number,Location){
    clone= template.content.cloneNode(true);
    clone.querySelector('.Trainer_Name').textContent = Name;
    clone.querySelector('.Trainer_Gen').textContent = `Generation: ${Gen+1}`;
    clone.querySelector('.Trainer_Level').textContent = `Level: ${Level}`;
    clone.querySelector('.Trainer_Amount').textContent = `#Pokemon: ${Number}`;
    clone.querySelector(".GymleaderCard").dataset.value=Location
    document.querySelector('.ListGymleaders').appendChild(clone);
}

export function fGymleaderCheckboxes(event){
    const checkbox= event.target;
    let NumGymleaderCheckedbox=0

    GymleaderCardClick()

    function HideGymleaderCard(){
        let FunctionRan=true
        console.log(NumGymleaderCheckedbox)

        GymleaderCheckboxes.forEach(checkbox=>{
            if(checkbox.checked==true){
                NumGymleaderCheckedbox+=1
            }
        }) 

        if(NumGymleaderCheckedbox==1 && checkbox.checked==true){
            FunctionRan=false
            console.log("1 now")
        }

        if(!FunctionRan){
           
            FunctionRan=true
            GymleaderCard= document.querySelectorAll(".GymleaderCard")
            GymleaderCard.forEach(card=>{
                card.style.display="none";
            })
            //console.log("hidden")
        
            
        }
        
    }
    HideGymleaderCard()

    if(checkbox.checked){
        GymleaderCard= document.querySelectorAll(".GymleaderCard")
        GymleaderCard.forEach(card=>{
        TrainerGen= card.querySelector(".Trainer_Gen")
        if(TrainerGen.textContent.includes(`${checkbox.value}`)){
            card.style.display="inline-block"
        }})

        
    }

    else{
        GymleaderCard= document.querySelectorAll(".GymleaderCard")
        GymleaderCard.forEach(card=>{
        TrainerGen= card.querySelector(".Trainer_Gen")
        if(TrainerGen.textContent.includes(`${checkbox.value}`)){
            card.style.display="none"
        }})
    }

    if(NumGymleaderCheckedbox==0){
        console.log("0 Now")
        GymleaderCard.forEach(card=>{
            card.style.display="block"
            console.log("shown")
        })

    }

}


export async function GymleadersCards(){
    GymleadersList=[]
    OpponentsData= await OpponentsData

    TrainersData=OpponentsData[0]
    GymleadersData= OpponentsData[1]
    GenNumber=0
   
    for (let k=0;k<9;k++){
        GenNumber=k
        TrainerDictionary= (await LevelOfGymleader(GenNumber))[0]
        PokemonNumbers= (await LevelOfGymleader(GenNumber))[1]
        for (let j=0;j<Object.keys(TrainerDictionary).length; j++){
           
            for(let p=0; p<GymleadersData[GenNumber].length; p++){
                if(GymleadersData[GenNumber][p]==Object.keys(TrainerDictionary)[j]){
                    
                    Trainer2Name= (Object.keys(TrainerDictionary)[j])
                    TrainerLevel=(TrainerDictionary[(Object.keys(TrainerDictionary)[j])])
                    PokemonAmount=(PokemonNumbers[(Object.keys(TrainerDictionary)[j])])
                    TrainerLocation=`${Trainer2Name},${GenNumber},${PokemonAmount}`

                    
                    CreateGymleaderCard(Trainer2Name,GenNumber,TrainerLevel,PokemonAmount,TrainerLocation)
                    let ChampTextBox= document.querySelectorAll(".ChampTextBox")
                    ChampTextBox.forEach(Box=>{
                        Box.style.display="none"
                       
                    })
                    let GymleaderTextBox= document.querySelectorAll(".GymleaderTextBox")
                    GymleaderTextBox.forEach(Box=>{
                        Box.style.display="block"
                       
                    })
                }

            }
        }
    }

}

export function ChooseRandomGymleader(){
    let divs= Array.from(ListGymleaders.querySelectorAll(".GymleaderCard"))
    let RandomGymleaderBag=[]
    divs.forEach(div =>{
        
        if(getComputedStyle(div).display=="block"){
            RandomGymleaderBag.push(div)
        }
    })
  
    //try{
        let RandomIndex= Math.round(Math.random()*RandomGymleaderBag.length)
        let RandomGymleader= RandomGymleaderBag[RandomIndex]
       
        //ChosenOpponent= (RandomGymleader.querySelector(".Trainer_Name").textContent)   

        TrainerLocation= RandomGymleader.dataset.value
      
        PokemonAmount= (RandomGymleader.querySelector(".Trainer_Amount").textContent).split(" ")[1]
        PokemonAmount=parseInt(PokemonAmount)   
        PokemonSearch.style.display="flex"
        GymNumChosenPokemon=6-PokemonAmount

        ListGymleaders.innerHTML=""
        ListGymleaders.style.display="none"
                //ErrorMessage.textContent=ChosenTrainer+"  "+ PokemonAmount
                FilterButtons.innerHTML=""
                FilterButtons.style.display="none"
                PokemonCont.style.display="flex"
                PokemonFilterButtons.style.display="grid"
                
                ListPokemons.style.display="grid"  
                //console.log(ListPokemons)
    /*        }  
    catch{
        ErrorMessage.textContent="Choose at least one Gen"
    }*/
    return TrainerLocation
}

async function LevelOfGymleader(Generation){
    OpponentsData= await OpponentsData
    
    TrainersData=OpponentsData[0]
    GymleadersData= OpponentsData[1]
    let Counter=0
    let TrainerLevel={}
    let NumberPokemon={};
    
   
    for (let name in TrainersData[Generation]){
       
        let Average=0
        let Sum=0
        
        for (let game in TrainersData[Generation][name]){
            for(let pokemon in TrainersData[Generation][name][game] ){
                Sum+=(TrainersData[Generation][name][game][pokemon][4])
                
            }

        Total=CountProp(TrainersData[Generation][name][game])
        //console.log(TrainersData)
        Average=Sum/Total
        Trainer2Name= Object.keys(TrainersData[Generation])[Counter]
        NumberPokemon[Trainer2Name]=Total
        }

        TrainerLevel[Trainer2Name]=Average.toFixed(1)
        Counter+=1
        
        
    }
    return [TrainerLevel,NumberPokemon]
}
