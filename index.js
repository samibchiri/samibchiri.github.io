import {ChampCardClick,fChampCheckboxes,ChampsCards,PokemonCardClickable,ChooseRandomChamp,ChooseRandomPokemon, CreateChampCard} from './Champions.js'
import { createMove } from './CreatePok&Movez.js'
import {GymleaderCardClick,fGymleaderCheckboxes,GymleadersCards,ChooseRandomGymleader} from './GymLeader.js'
import{RetrievePartiesData,GettingStatsData,DisplayParty,CreateClosePokemonInfo,MovingPokeCard } from './PrepFight.js'
import{AttackMovesDisplay} from './Battle.js' 
import { PokemonFilterBox, MoveFilterBox } from './FilterBoxes.js'
import { Testing } from './test.js'

//RetrievePartiesData()




let GreetingCont= document.getElementById("Greeting")
let StartGameButton= document.getElementById("GameStartButton")
let StartAnimation= document.getElementById("StartAnimation")
let EndAnimation= document.getElementById("EndAnimation")
let H2Greetings= document.querySelectorAll("h2")
let SearchPokemonBtn= document.getElementById("SearchPokemonBtn")
let ChooseOpponents = document.getElementById("ChooseOpponents")
let IntroButtons= document.querySelector(".introButton")

let OpponentsCont= document.getElementById("TypeOpponents")
let ChampionsButton= document.getElementById("ChampionsButton")
let GymleadersButton= document.getElementById("GymLeadersButton")
let CustomButton=document.getElementById("CustomButton")

let ChampCheckboxes= document.querySelectorAll(".ChampCheckbox")
let ChampLevelCheck= document.getElementById("ChampLevelCheck")
let ListChamps= document.querySelector(".ListChamps")
let FilterButtons= document.getElementById("FilterButtons")
let ChampRandom= document.getElementById("ChampRandom")
let ErrorMessage=document.getElementById("ErrorMessage")
let PokemonSearchText=document.getElementById("PokemonSearchText")

let PokemonRandom=document.getElementById("PokemonRandom")

let PokemonFilterButtons= document.getElementById("PokemonFilterButtons")
let clone
let PokemonGen
let PokemonType
let PokemonStats
let PokemonCheckboxes= document.querySelectorAll(".PokemonCheckbox")
let PokemonCard
let ListPokemons= document.querySelector(".ListPokemons")

let GymleaderCheckboxes= document.querySelectorAll(".GymleaderCheckbox")
let GymleaderLevelCheck= document.getElementById("GymleaderLevelCheck")
let ListGymleaders= document.querySelector(".ListGymleaders")
let GymleaderRandom= document.getElementById("GymleaderRandom")
let TextBox= document.getElementById("TextBox")

let TrainerLocation
let ChampSearchCont= document.getElementById("ChampSearchCont")
let ChampSearchText= document.getElementById("ChampSearchText")

let GymleaderSearchCont= document.getElementById("GymleaderSearchCont")
let GymleaderSearchText= document.getElementById("GymleaderSearchText")


StartGameButton.addEventListener("click",()=>{
    StartAnimation.style.animation= "explosion 1.5s ease 0s forwards";
    //1.5s
    setTimeout(()=>{
        EndAnimation.style.display="block"
        StartAnimation.style.display="none"
        StartGameButton.style.display="none"
        H2Greetings.forEach(greeting =>
            greeting.style.display="block")
            ChooseOpponents.style.display="block"
            TextBox.style.display="none"
            //SearchPokemonBtn.style.display="block"
        
        
        
    EndAnimation.style.animation= "implosion 0s ease 0s forwards";
    //3s 1.5s
        setTimeout(()=>{
            StartAnimation.style.display="none"
            setTimeout(()=>{
                EndAnimation.style.display="none"
            },0)
            
        },0)

    },0)
    //1500
})
    

ChooseOpponents.addEventListener("click",()=>{
    GreetingCont.style.display="none"
    OpponentsCont.style.display="flex"
})

ChampionsButton.addEventListener("click", async ()=>{
    ChampSearchCont.style.display="block"
    ChampSearchText.value=""
    OpponentsCont.style.display="none"
    ChampsCards()
    ListChamps.style.display="grid"
    FilterButtons.style.display="grid"

    
    ChampCheckboxes.forEach(checkbox=>{
        checkbox.addEventListener("click",fChampCheckboxes)
        checkbox.checked=false;
    }) 
    ChampCardClick()
})

ChampRandom.addEventListener("click",()=>{
    ChampSearchCont.style.display="none"
    TrainerLocation= ChooseRandomChamp()
    PokemonCardClickable(TrainerLocation)

    PokemonFilterBox()

    MoveFilterBox()
    }  
)

ChampLevelCheck.addEventListener("change",()=>{
        
        let ChampParent= ListChamps
        let divs= Array.from(ChampParent.querySelectorAll(".ChampCard"))
        
        if(ChampLevelCheck.checked){
            divs.sort((a,b)=>{
                let FirstLevel=a.querySelector(".Trainer_Level")
                FirstLevel= (FirstLevel.textContent).split(" ")
                FirstLevel= parseInt(FirstLevel[1]*10)
                let SecondLevel=b.querySelector(".Trainer_Level")
                SecondLevel= (SecondLevel.textContent).split(" ")
                SecondLevel= parseInt(SecondLevel[1]*10)
                return (FirstLevel-SecondLevel).toFixed(1)
            })
        }
        else{
            divs.sort((a,b)=>{
                let FirstLevel=a.querySelector(".Trainer_Level")
                FirstLevel= (FirstLevel.textContent).split(" ")
                FirstLevel= parseInt(FirstLevel[1]*10)
                let SecondLevel=b.querySelector(".Trainer_Level")
                SecondLevel= (SecondLevel.textContent).split(" ")
                SecondLevel= parseInt(SecondLevel[1]*10)
                return SecondLevel-FirstLevel
            })
        }
        
        ListChamps.innerHTML="";
        divs.forEach(div =>{
            ListChamps.appendChild(div)
        })
})

GymleadersButton.addEventListener("click", async ()=>{
    GymleaderSearchCont.style.display="block"
    GymleaderSearchText.value=""

    OpponentsCont.style.display="none"
    GymleadersCards()
    ListGymleaders.style.display="grid"
    FilterButtons.style.display="grid"

    
    GymleaderCheckboxes.forEach(checkbox=>{
        checkbox.addEventListener("click",fGymleaderCheckboxes)
        checkbox.checked=false;
    }) 
    GymleaderCardClick()
})

GymleaderRandom.addEventListener("click",()=>{

    TrainerLocation= ChooseRandomGymleader()
    PokemonCardClickable(TrainerLocation)
    }  
)


GymleaderLevelCheck.addEventListener("change",()=>{
        
        let GymleaderParent= ListGymleaders
        let divs= Array.from(GymleaderParent.querySelectorAll(".GymleaderCard"))
        
        if(GymleaderLevelCheck.checked){
            divs.sort((a,b)=>{
                let FirstLevel=a.querySelector(".Trainer_Level")
                FirstLevel= (FirstLevel.textContent).split(" ")
                FirstLevel= parseInt(FirstLevel[1]*10)
                let SecondLevel=b.querySelector(".Trainer_Level")
                SecondLevel= (SecondLevel.textContent).split(" ")
                SecondLevel= parseInt(SecondLevel[1]*10)
                return (FirstLevel-SecondLevel).toFixed(1)
            })
        }
        else{
            divs.sort((a,b)=>{
                let FirstLevel=a.querySelector(".Trainer_Level")
                FirstLevel= (FirstLevel.textContent).split(" ")
                FirstLevel= parseInt(FirstLevel[1]*10)
                let SecondLevel=b.querySelector(".Trainer_Level")
                SecondLevel= (SecondLevel.textContent).split(" ")
                SecondLevel= parseInt(SecondLevel[1]*10)
                return SecondLevel-FirstLevel
            })
        }
        
        ListGymleaders.innerHTML="";
        divs.forEach(div =>{
            ListGymleaders.appendChild(div)
        })
})

/*OpponentsCont.style.display="none"
ChampsCards()
ListChamps.style.display="grid"
FilterButtons.style.display="grid"
*/

PokemonCards()

async function PokemonCards(){

    let response= await fetch("PokemonData.json")
    let data= await response.json()


    for(let i=0;i<data.length;i++){
        CreatePokemonCard(data[i])
    }
}


const PokemonTemplate = document.querySelector('.PokemonTemplate');

PokemonCheckboxes.forEach(checkbox=>{
  
    checkbox.addEventListener("click",fPokemonCheckboxes)
    checkbox.checked=false;
}) 
        
function CreatePokemonCard(Pokemon){
    clone= PokemonTemplate.content.cloneNode(true);
    if(Pokemon.Dex_Num<152){
        PokemonGen=1
    }
    else if(Pokemon.Dex_Num<252){
        PokemonGen=2
    }
    else if(Pokemon.Dex_Num<387){
        PokemonGen=3
    }
    else if(Pokemon.Dex_Num<494){
        PokemonGen=4
    }
    else if(Pokemon.Dex_Num<650){
        PokemonGen=5
    }
    else if(Pokemon.Dex_Num<722){
        PokemonGen=6
    }
    else if(Pokemon.Dex_Num<810){
        PokemonGen=7
    }
    else if(Pokemon.Dex_Num<906){
        PokemonGen=8
    }
    else{
        PokemonGen=9}
    
    Pokemon.Type_1=Pokemon.Type_1[0]+Pokemon.Type_1.slice(1).toLowerCase()

    PokemonType= Pokemon.Type_1
    if(!(Pokemon.Type_2=="-")){
        Pokemon.Type_2=Pokemon.Type_2[0]+Pokemon.Type_2.slice(1).toLowerCase()
        PokemonType+=`, ${Pokemon.Type_2}`
    }
    
    PokemonStats= Pokemon.HP+", "+ Pokemon.Attack+", "+ Pokemon.Defense+", "
    +Pokemon.Sp_Attack+", "+Pokemon.Sp_Defense+", "+Pokemon.Speed


    

    clone.querySelector('.Pokemon_Name').textContent = Pokemon.Name;
    clone.querySelector(".Pokemon_Base_Name").textContent=Pokemon.Base_Name
    clone.querySelector('.Pokemon_Gen').textContent = `Generation: ${PokemonGen}`;
    clone.querySelector('.Pokemon_Type').textContent = `Type: ${PokemonType}`;
    clone.querySelector('.Pokemon_BST').textContent = `BST: ${Pokemon.BST}`;
    clone.querySelector('.Pokemon_Stats').textContent = `Stats: ${PokemonStats}`;
    clone.querySelector('.PokemonCard').dataset.value = `${Pokemon.Dex_Num}`;
    document.querySelector('.ListPokemons').appendChild(clone);
}

PokemonRandom.checked=false;
GymleaderRandom.checked=false;
ChampRandom.checked=false;

function fPokemonCheckboxes(event){
    let FunctionRan=false
    let NumPokeCheckedbox=0
    PokemonSearchText.value=""
   

    const checkbox= event.target;
    //console.log(checkbox.value)
    PokemonCheckboxes.forEach(checkbox=>{
        if(checkbox.checked==true){
            NumPokeCheckedbox+=1
        }
    }) 

    function HidePokeCard(){
        let FunctionRan=true

        if(NumPokeCheckedbox==1 && checkbox.checked==true){
            FunctionRan=false

        }

        if(!FunctionRan){
           
            FunctionRan=true
            PokemonCard= document.querySelectorAll(".PokemonCard")
         PokemonCard.forEach(card=>{
            card.style.display="none"
            //console.log("hidden")
        })
            
        }
        
    }
   HidePokeCard()

    //console.log("Checkbx")
    //console.log(checkbox.checked)
    if(checkbox.checked){

      

        PokemonCard= document.querySelectorAll(".PokemonCard")
        PokemonCard.forEach(card=>{
        PokemonGen= card.querySelector(".Pokemon_Gen")
        if(PokemonGen.textContent.includes(`${checkbox.value}`)){
            card.style.display="inline-block"

        }})

        
    }

    else{

        PokemonCard= document.querySelectorAll(".PokemonCard")
        PokemonCard.forEach(card=>{
        PokemonGen= card.querySelector(".Pokemon_Gen")
        if(PokemonGen.textContent.includes(`${checkbox.value}`)){
            card.style.display="none"
            
            
        }
        
        })

        if(NumPokeCheckedbox==0){

            PokemonCard.forEach(card=>{
                card.style.display="block"

            })

        }

    }

}

PokemonSearchText.addEventListener("input",()=>{
   let SearchedText= (PokemonSearchText.value).toLowerCase()
   
   let PokemonCard= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
   PokemonCard.forEach(card=>{
        let PokemonName=card.querySelector(".Pokemon_Name").textContent
        let PokemonBaseName= card.querySelector(".Pokemon_Base_Name").textContent
        PokemonName=PokemonName.toLowerCase()
        PokemonBaseName=PokemonBaseName.toLowerCase()
        
        if (PokemonName.includes(SearchedText)||PokemonBaseName.includes(SearchedText)){
            card.style.display="block"
        }
        else{
            card.style.display="none"
        }
    })
})

ChampSearchText.addEventListener("input",()=>{
    let SearchedText= (ChampSearchText.value).toLowerCase()
    
    let ChampCard= Array.from(ListChamps.querySelectorAll(".ChampCard"))
    ChampCard.forEach(card=>{
         let ChampName=card.querySelector(".Trainer_Name").textContent
         ChampName=ChampName.toLowerCase()
         if (ChampName.includes(SearchedText)){
             card.style.display="block"

             if(ChampName=="champion sami"){
                card.style.display="none"
             }
         }
         else{
             card.style.display="none"
         }
         if(SearchedText.includes("sami")){
            if(ChampName=="champion sami"){
            card.style.display="block"
            }
         }
    })
     
 })
 

 GymleaderSearchText.addEventListener("input",()=>{
    let SearchedText= (GymleaderSearchText.value).toLowerCase()
    
    let GymleaderCard= Array.from(ListGymleaders.querySelectorAll(".GymleaderCard"))
    GymleaderCard.forEach(card=>{
         let GymleaderName=card.querySelector(".Trainer_Name").textContent
         GymleaderName=GymleaderName.toLowerCase()
         if (GymleaderName.includes(SearchedText)){
             card.style.display="block"
             
         }
         else{
             card.style.display="none"
         }
         
    })
     
 })



    /*
function MoveCardClick(){


    let MoveSetNum=0
        //let MoveCards= document.querySelectorAll(".MoveCard")
        
        // Set up event listeners
   
        let MoveCard= Array.from(ListMoves.querySelectorAll(".MoveCard"))
        
        console.log(MoveCard)
        
        MoveCard.forEach(card=>{
            let Clicked=false
             card.addEventListener("click",()=>{
                MoveSetNum=HandleMoveClick(card,Clicked,MoveSetNum)
                console.log(MoveSetNum)
            })
            })
            if(MoveSetNum==4){
                card.removeEventListener("click",HandleMoveClick)
            }
            
        

}

function HandleMoveClick(card,Clicked,MoveSetNum){
    let ChosenMove= (card.querySelector(".Move_Name").textContent)
    //console.log(card)
    console.log(ChosenMove)
    if(Clicked==false){
        Clicked=true
        card.style.backgroundColor="rgb(91, 255, 91)"
        MoveSetNum+=1
        //console.log(MoveSetNum)
    }
    
    else if(Clicked==true){
        (card.style.backgroundColor="rgb(252, 252, 108)")
        Clicked=false
        MoveSetNum-=1
    }

card.addEventListener("mouseover",()=>{
    if(card.style.backgroundColor!="rgb(91, 255, 91)"){
        
    card.style.backgroundColor="rgb(255, 248, 59)"}
})
card.addEventListener("mouseout",()=>{
    if(card.style.backgroundColor!="rgb(91, 255, 91)"){
        
        card.style.backgroundColor="rgb(252, 252, 108)"}
})
return MoveSetNum
}
    */




    /*
    let MoveSetNum=0
        let MoveCard= document.querySelectorAll(".MoveCard")
        let Clicked=false
        MoveCard.forEach(card=>{
            
            card.addEventListener("click",()=>{
                MoveCardClick(card,Clicked,MoveSetNum)
            })
                
            if(MoveSetNum==4){
                MoveCard.forEach(card=>{
                    card.removeEventListener("click",MoveCardClick(card,Clicked,MoveSetNum))
                    console.log("MoveSet")
                })
                
               
            }
        })

}*/
/*
function MoveCardClick(card,Clicked,MoveSetNum){
    //card=event.currentTarget;
   //console.log(card)
    if(Clicked==false){
        Clicked=true
        card.style.backgroundColor="rgb(91, 255, 91)"
        MoveSetNum+=1
        //console.log(MoveSetNum)
    
    
    }
    
    else if(Clicked==true){
        (card.style.backgroundColor="rgb(252, 252, 108)")
        Clicked=false
        MoveSetNum-=1
    }

card.addEventListener("mouseover",()=>{
    if(card.style.backgroundColor!="rgb(91, 255, 91)"){
        
    card.style.backgroundColor="rgb(255, 248, 59)"}
})
card.addEventListener("mouseout",()=>{
    if(card.style.backgroundColor!="rgb(91, 255, 91)"){
        
        card.style.backgroundColor="rgb(252, 252, 108)"}
})

}
*/
/*async function Testing(){
    let PokemonNumber=1
    let PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonNumber}`
    
    let response= await fetch(PokemonUrl);
    let data= await response.json()
    console.log(data)
}
Testing()*/
