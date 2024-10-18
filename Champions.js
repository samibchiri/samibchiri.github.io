import {Recursive,CountProp,LevelOfChamp} from './ChampLevels.js'
import {TrainerData} from './Opponents.js'
import { createMove } from './CreatePok&Movez.js'
import { PokemonFilterBox, MoveFilterBox } from './FilterBoxes.js'
import { GymleaderCardClick,GymNumChosenPokemon,fGymleaderCheckboxes,GymleadersCards,CreateGymleaderCard,ChooseRandomGymleader } from './GymLeader.js'
import {MovingPokeCard} from './PrepFight.js'

import {PlayGame} from './Battle.js'
import { HallOfFameAnimation } from './HallOfFame.js'


let ListChamps= document.querySelector(".ListChamps")
const template = document.querySelector('.ChampTemplate');
let clone
let ChampCard
let TrainerGen
let ChampsList=[]
let TrainersData;
let ChampsData;
let TrainerDictionary
let PokemonNumbers 
let GenNumber

let TrainerLevel
let PokemonAmount
let ListPokemons= document.querySelector(".ListPokemons")
let PokemonRandom=document.getElementById("PokemonRandom")
let PokemonCont= document.getElementById("PokemonCont")

let OpponentsData= Result()

let InformationBox1= document.getElementById("InformationBox1")
let InformationBox2= document.getElementById("InformationBox2")

let ListMoves= document.querySelector(".ListMoves")

let PokemonSearch= document.getElementById("PokemonSearch")
let PokemonSearchText= document.getElementById("PokemonSearchText")


let MovePower=document.getElementById("MovePower")
let MoveAccuracy=document.getElementById("MoveAccuracy")
let MoveLength=document.getElementById("MoveLength")

let FinishPokemon= document.getElementById("FinishPokemon")
let PartyCard= document.querySelector(".PartyCard")
let PokeBaseName

let TestCont= document.getElementById("TestCont")
let PokemonFilterButtons= document.getElementById("PokemonFilterButtons")
let TextBox= document.getElementById("TextBox")


let SubmitName= document.getElementById("SubmitName")
let TrainerNameCont= document.getElementById("TrainerNameCont")

let Trainer1Name
let Trainer2Name

let PokemonCheckboxes= document.querySelectorAll(".PokemonCheckbox")
let ChampCheckboxes= document.querySelectorAll(".ChampCheckbox")
let PokemonParty= []

let PartyCardTemp= document.querySelector(".PartyCardTemp")
let PartyCardTempText= document.querySelector("#PartyCardTempText")
let PartyCardTempTextVisibility =false



async function Result(){
    // [TrainerData,GymleadersData,ChampionsData]= await TrainerData()
    let Results= await TrainerData()
    return(Results)
}

let ChosenOpponent

export function ChampCardClick(){
    
    
    setTimeout(()=>{
        
        let ChampCard= Array.from(ListChamps.querySelectorAll(".ChampCard"))
        ChampCard.forEach(card=>{
            if((card.querySelector(".Trainer_Name").textContent)=="Champion Sami"){
                card.style.display="none"

            }
             card.addEventListener("click",()=>{

                window.scrollTo({
                    top: 35,
                    behavior: "smooth" 
                    
                })
                
                //ChosenOpponent= (card.querySelector(".Trainer_Name").textContent)
                TrainerLocation= card.dataset.value

                
                
                ListChamps.innerHTML=""
                ListChamps.style.display="none"
                PokemonAmount= (card.querySelector(".Trainer_Amount").textContent).split(" ")[1]
                //console.log(PokemonAmount)
                PokemonAmount=parseInt(PokemonAmount)   
                //console.log("PokemonAMoutn")
                //console.log(PokemonAmount)
                NumChosenPokemon=6-PokemonAmount
                //ErrorMessage.textContent=ChosenOpponent+"  "+ PokemonAmount
                FilterButtons.innerHTML=""
                FilterButtons.style.display="none"
                ListPokemons.style.display="grid"
                PokemonCont.style.display="flex"
               
                ChampSearchCont.style.display="none"
                TrainerLocation= PokemonCardClickable(TrainerLocation,PokemonAmount)
    
                TextBox.style.display="none"

                PokemonSearch.style.display="flex"

                PokemonFilterBox()

                MoveFilterBox()

                
        })
        
    },0
    
    )
   
})
}





        
export function CreateChampCard(Name,Gen,Level,Number,Location){
    clone= template.content.cloneNode(true);
    clone.querySelector('.Trainer_Name').textContent = Name;
    clone.querySelector('.Trainer_Gen').textContent = `Generation: ${Gen+1}`;
    clone.querySelector('.Trainer_Level').textContent = `Level: ${Level}`;
    clone.querySelector('.Trainer_Amount').textContent = `#Pokemon: ${Number}`;
    clone.querySelector(".ChampCard").dataset.value=Location

    document.querySelector('.ListChamps').appendChild(clone);
}

let NumChampCheckedbox

export function fChampCheckboxes(event){
    const checkbox= event.target;
    let NumChampCheckedbox=0
    ChampSearchText.value=""

    ChampCardClick()

    function HideChampCard(){
        let FunctionRan=true

        ChampCheckboxes.forEach(checkbox=>{
            if(checkbox.checked==true){
                NumChampCheckedbox+=1
            }
        }) 

        if(NumChampCheckedbox==1 && checkbox.checked==true){
            FunctionRan=false
        }

        if(!FunctionRan){
           
            FunctionRan=true
            ChampCard= document.querySelectorAll(".ChampCard")
            ChampCard.forEach(card=>{
                card.style.display="none";
            })
            //console.log("hidden")
        
            
        }
        
    }
    HideChampCard()

    if(checkbox.checked){
        ChampCard= document.querySelectorAll(".ChampCard")
        ChampCard.forEach(card=>{
        TrainerGen= card.querySelector(".Trainer_Gen")
        if(TrainerGen.textContent.includes(`${checkbox.value}`)){
            card.style.display="inline-block"
        }})

        
    }

    else{
        ChampCard= document.querySelectorAll(".ChampCard")
        ChampCard.forEach(card=>{
        TrainerGen= card.querySelector(".Trainer_Gen")
        if(TrainerGen.textContent.includes(`${checkbox.value}`)){
            card.style.display="none"
        }})
    }

    if(NumChampCheckedbox==0){

        ChampCard.forEach(card=>{
            card.style.display="block"
 
        })

    }

}

let TrainerLocation

export async function ChampsCards(){
    ChampsList=[]
    OpponentsData= await OpponentsData
    TrainersData=OpponentsData[0]
    ChampsData= OpponentsData[2]
    GenNumber=0
   
    for (let k=0;k<9;k++){
        GenNumber=k
        TrainerDictionary= (await LevelOfChamp(GenNumber))[0]
    
        PokemonNumbers= (await LevelOfChamp(GenNumber))[1]
        for (let j=0;j<Object.keys(TrainerDictionary).length; j++){
           
            for(let p=0; p<ChampsData[GenNumber].length; p++){
                if(ChampsData[GenNumber][p]==Object.keys(TrainerDictionary)[j]){
                    
                    Trainer2Name= (Object.keys(TrainerDictionary)[j])
                    TrainerLevel=(TrainerDictionary[(Object.keys(TrainerDictionary)[j])])
                    PokemonAmount=(PokemonNumbers[(Object.keys(TrainerDictionary)[j])])
                    //console.log(TrainerDictionary)
                    //console.log(TrainerDictionary[(Object.keys(TrainerDictionary)[j])])
                    
                    TrainerLocation=`${Trainer2Name},${GenNumber},${PokemonAmount}`
                    CreateChampCard(Trainer2Name,GenNumber,TrainerLevel,PokemonAmount,TrainerLocation)
                  
                    
                    
                     let GymleaderTextBox= document.querySelectorAll(".GymleaderTextBox")
                    GymleaderTextBox.forEach(gymleader=>{
                        gymleader.style.display="none"
                       
                    })
                }

            }
        }

    }
}


async function Test(card){
    //console.log(card)
    
     TextBox.style.display="none"

    let PokemonUrl
    let response
    let data
    let PokemonNumber=card.dataset.value;

    //console.log(PokemonNumber)
    PokemonNumber=parseInt(PokemonNumber)
    PokemonNumber= PokemonNumber.toString()
    //console.log(PokemonNumber)
    //console.log(typeof PokemonNumber)

    
    try{
        
        let NameSegment=""
        let PartOfName=""
    let PokeName= (card.querySelector(".Pokemon_Name").textContent)
    PokeName=PokeName.toLowerCase().trim()
    PokeBaseName= (card.querySelector(".Pokemon_Base_Name").textContent)
    
    PokeBaseName=PokeBaseName.toLowerCase().trim()

    
    
    
    
    let PokemonApi=""
    //console.log([PokeName,PokeBaseName])

    if(PokeName==PokeBaseName){
        PokemonApi=PokeName
    }
    if(PokeName!=PokeBaseName){
        //console.log(PokeName.split(" "))
        PartOfName=(PokeName.split(" "))
        PokeBaseName=PokeBaseName.trim()
        
        for(let i=0;i<PartOfName.length;i++){
            NameSegment=(PartOfName[i])
            //console.log(PartOfName[i])
            //console.log(PartOfName)
            //PartOfName[i]=PartOfName[i].trim()
            NameSegment=NameSegment.trim()
        
        if(NameSegment==PokeBaseName){
            //console.log([(PartOfName),(PokeBaseName),i])
            //console.log([PokeName,i,PartOfName])
            if(i==1){
                
                NameSegment=PartOfName[0]
                //console.log(NameSegment)
                //console.log(PokeName)
                //console.log(NameSegment=="hisuian")
                
                }
                
            
            else if(i==0){
                NameSegment=PartOfName[1]
               
                //console.log(NameSegment)
            }
            else if(i==2){
                NameSegment=PartOfName[0]+"-"+PartOfName[1]
            }
            else{
                
                NameSegment=""
            }
        }
        if(NameSegment!=PokeBaseName &&i==PartOfName.length-1){
            NameSegment=PartOfName[0]
        }
        }
    //console.log(NameSegment)
    if(typeof NameSegment=="object"){
       // console.log(NameSegment)
        //console.log(NameSegment)
        //PartOfName=PartOfName[0]
    }
    if(NameSegment=="hisuian"){
        NameSegment="hisui"
    }
    //console.log(PartOfName,NameSegment)
    //console.log(NameSegment)
    if(NameSegment=="mega"){
        if(PartOfName[2]){
            NameSegment=NameSegment+"-"+PartOfName[2]
            
        }
    }
    
        //console.log(PartOfName)
    //PartOfName=PartOfName.trim()
    }
    if(NameSegment!=""){
        PokemonApi=PokeBaseName+"-"+NameSegment;
    }
    //console.log([PokeBaseName,NameSegment,PokemonApi])
          

    
    PokemonApi=PokemonApi.replace(/[♂@#!$%^&*()_+={}\[\]|\\;:'",.<>?]/g, "");
    PokemonApi= PokemonApi.replaceAll(" ","-")
    //console.log(PokemonApi)
    //console.log(PokemonNumber)

    PokeBaseName= (card.querySelector(".Pokemon_Base_Name").textContent)
    
    try{
        PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`
        
        response= await fetch(PokemonUrl);
        data= await response.json()
        MoveSet=[]
        ClickedPokemonName=PokemonApi
        MoveSetMaker(PokemonApi)
        
    }
    catch(error){
        try{
            
            //console.log(PokemonNumber)
            PokemonApi=PokemonNumber
            PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`  
            response= await fetch(PokemonUrl);
            data= await response.json()
            TextBox.style.display="flex"
            InformationBox1.textContent=(`Couldnt get ${(card.querySelector(".Pokemon_Name").textContent)}`)
            InformationBox2.textContent=(`Now you have ${card.querySelector(".Pokemon_Base_Name").textContent}`)
            //console.log(PokemonApi)

            MoveSet=[]
            ClickedPokemonName=PokemonApi
            MoveSetMaker(PokemonApi)
            //console.log([PokeBaseName,data.stats])
        }
        catch(error){
            console.error(error)
        }
    
    }
    
}
        catch(error){
            console.log(error)
        }

}

PokemonSearchText.value=""
let ClickedPokemonName=""
export function PokemonCardClickable(Opponent,PokemonAmount){
    TrainerLocation=Opponent


    if(GymNumChosenPokemon!=-1){
        NumChosenPokemon=GymNumChosenPokemon

    }
    setTimeout(()=>{
        let PokemonCard=Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        PokemonCard.forEach(card=>{
            //card.addEventListener("click",async ()=>{
            card.addEventListener("click",()=>{
                Test(card)
   
                if(NumChosenPokemon!=(6-PokemonAmount)){
                     PartyCardTemp.style.display="block"
                     PartyCardTempText.style.display="block"
                     PartyCardTempTextVisibility=true
                     PartyCardTempText.textContent=`Choose ${6-NumChosenPokemon} more Pokemon`
                    
                }
                
                card.style.pointerEvents = "none";
                PokemonSearchText.value=""
                window.scrollTo({
                    top: 35,
                    behavior: "smooth" 
                    
                })
          
            })
            })
            
        },0)
        
        //InformationBox1.style.display="block"
        //InformationBox2.style.display="block"
    return TrainerLocation
}

export function ChooseRandomChamp(){
    let divs= Array.from(ListChamps.querySelectorAll(".ChampCard"))
    let RandomChampBag=[]
    divs.forEach(div =>{
        
        if(getComputedStyle(div).display=="block"){
            RandomChampBag.push(div)
        }
    })
  
    //try{
        let RandomIndex= Math.round(Math.random()*RandomChampBag.length)
        let RandomChamp= RandomChampBag[RandomIndex]

       
        //ChosenOpponent= (RandomChamp.querySelector(".Trainer_Name").textContent)   
        TrainerLocation= RandomChamp.dataset.value
      
        
        PokemonAmount= (RandomChamp.querySelector(".Trainer_Amount").textContent).split(" ")[1]
        PokemonAmount=parseInt(PokemonAmount)   
        PokemonSearch.style.display="flex"
        NumChosenPokemon=6-PokemonAmount

        ListChamps.innerHTML=""
        ListChamps.style.display="none"
                //ErrorMessage.textContent=ChosenOpponent+"  "+ PokemonAmount
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

export function ChooseRandomPokemon(){
    let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
    let RandomPokemonBag=[]
    divs.forEach(div =>{
        
        if(getComputedStyle(div).display=="block"){
            RandomPokemonBag.push(div)
        }
    })

    //try{
        let RandomIndex= Math.round(Math.random()*RandomPokemonBag.length)
        let RandomPokemon= RandomPokemonBag[RandomIndex]
        let ChosenPokemon= (RandomPokemon.querySelector(".Pokemon_Name").textContent)  


        divs.forEach(div =>{
        
            if(div!=RandomPokemon){
                div.style.display="none"
            }
            /*else{
                Test(RandomPokemon)
            }*/
        })
        //ErrorMessage.textContent=ChosenPokemon
        //PokemonFilterButtons.style.display="none"
        //ListPokemons.style.display="none"  
    /*}  
    catch{
        ErrorMessage.textContent="Choose at least one Gen"
    }*/
}

let PokemonParty1=[]
let PokemonParty2=[]
async function MoveSetMaker(PokemonApi){
    let PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`
    let response= await fetch(PokemonUrl);
    let data= await response.json()

    let MoveSet=[]


    let NumMoves= data.moves.length

   
    //console.log(data.moves)
    data.moves.forEach(async move=>{
        let Move=(move.move.name)
        //let CreatedMove= createMove(Move)
        let MoveUrl=`https://pokeapi.co/api/v2/move/${Move}/`

        let Answer= await fetch(MoveUrl);
        let MoveData= await Answer.json()

        
       
        //console.log(MoveData.power)
        //console.log(Move)
        if(MoveData.power<=40){
            MoveData.power=40
        }
        CreateMoveCard(MoveData)

    })
    setTimeout(async ()=>{
        /*PokemonRandom.addEventListener("click", ()=>{
            //ChooseRandomPokemon()
        })*/
       MoveSet=[]

        PokemonParty1= await MoveCardClick(PokemonApi,NumMoves)


        ListPokemons.style.display="none"
        TestCont.style.display="none"
        PokemonFilterButtons.style.display="none"
        PokemonStatFilter.style.display="none"
        PokemonMoveFilter.style.display="none"
        PokemonCont.style.display="none"
        window.removeEventListener("scroll",checkElementPosition)
        window.removeEventListener("resize",checkElementPosition)

        TrainerNameCont.style.display="flex"
        Trainer1Name= await getTrainerName()
        TextBox.style.display="none"
        InformationBox1.textContent=""
        InformationBox2.textContent=""

        let [Trainer2Name,Gen,Amount]= TrainerLocation.split(",")
        OpponentsData= await Result()
        //console.log(OpponentsData)
    
        for(let key in OpponentsData[0][Gen][Trainer2Name]){
           
            for(let pokemon in OpponentsData[0][Gen][Trainer2Name][key]){
                let PokemonDict={}
                PokemonDict[pokemon]=OpponentsData[0][Gen][Trainer2Name][key][pokemon]
                //console.log(PokemonDict)
                PokemonParty2.push(PokemonDict)
            }
        }
       // console.log(PokemonParty1)
        //console.log(PokemonParty2)




        PlayGame(PokemonParty1,PokemonParty2,Trainer1Name,Trainer2Name)
        
    }
        ,0)
    
    
}

let TrainerNameInput=document.getElementById("TrainerNameInput")
document.getElementById("TrainerNameInput").value=""

async function getTrainerName() {


    return new Promise((resolve) => {

        function TrainerNameCheck(){

            Trainer1Name=document.getElementById("TrainerNameInput").value
            if(Trainer1Name.length==0){
     
                TextBox.style.display="flex"
                InformationBox2.style.display="none"
                InformationBox1.textContent="Your Name is Empty"
                InformationBox1.style.fontSize= "3rem";

                
            }
            else{
                if(Trainer1Name.length<20){
                    TrainerNameCont.style.display="none"
                    TextBox.style.display="none"
                    resolve(Trainer1Name)
                }
                else{
                    TextBox.style.display="flex"
                    InformationBox2.style.display="none"
                    InformationBox1.textContent="Your Name is too Long"
                }
            }
            
        }


    SubmitName.addEventListener("click",TrainerNameCheck)
    
    TrainerNameInput.addEventListener("keydown",function(event){
        if (event.key === 'Enter') {
            TrainerNameCheck()
        }
    })
})
}


const MoveTemplate = document.querySelector('.MoveTemplate');

function CreateMoveCard(MoveData){
    clone= MoveTemplate.content.cloneNode(true);

    ListMoves.style.display="block"
    

    
    
    let TempName=MoveData.name
    TempName=TempName.split("-")
    let MoveName=""
    for(let i=0;i<TempName.length;i++){
        TempName[i]=TempName[i].charAt(0).toUpperCase()+TempName[i].slice(1)
        
        MoveName=MoveName+TempName[i]+" "
    }
    
    if(MoveData.accuracy==null){
        MoveData.accuracy=100
    }
   
    if(MoveData.accuracy>80 && MoveData.power>110){
        MoveData.accuracy=Math.round((100-Math.sqrt(MoveData.power-110)*6)/5)*5
    }

    MoveData.type.name= MoveData.type.name.charAt(0).toUpperCase()+ MoveData.type.name.slice(1)
    MoveData.damage_class.name=MoveData.damage_class.name.charAt(0).toUpperCase()+ MoveData.damage_class.name.slice(1)
    clone.querySelector('.Move_Name').textContent = MoveName
    clone.querySelector(".Move_Type").textContent= MoveData.type.name
    clone.querySelector('.Move_Power').textContent = `Power: ${(MoveData.power)}`;
    clone.querySelector('.Move_Accuracy').textContent = `Accuracy: ${MoveData.accuracy}`;
    clone.querySelector('.Move_Kind').textContent = `${MoveData.damage_class.name}`;
    document.querySelector('.ListMoves').appendChild(clone);
    
    
    
    
    
    ListMoves.style.display="block"

}

let RandomPokemon
let RandomIndex
let ChosenPokemon
let MoveCards

PokemonRandom.addEventListener("click", ()=>{
    let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
    let RandomPokemonBag=[]
    if(PokemonRandom.checked){

    

    
    divs.forEach(div =>{
        
       

        if(getComputedStyle(div).display=="block"){
            RandomPokemonBag.push(div)
        }
    })

    //try{
        RandomIndex= Math.round(Math.random()*RandomPokemonBag.length)
        RandomPokemon= RandomPokemonBag[RandomIndex]
        ChosenPokemon= (RandomPokemon.querySelector(".Pokemon_Name").textContent)  

        divs.forEach(div =>{
        
            if(div!=RandomPokemon){
                div.style.display="none"
            }
            /*else{
                Test(RandomPokemon)
            }*/
        })
    }
    else{
        
        
        let PokemonCard= document.querySelectorAll(".PokemonCard")
        PokemonCard.forEach(card=>{
            
            card.style.display="inline-block"
            
        })
        PokemonCheckboxes.forEach(checkbox=>{
            checkbox.checked=false
        })

        MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));
            MoveCards.forEach(card=>{
                card.remove()
            })
    }
})

let RedValue=0
let RedInterval
let ElapsedTime=0
let BlackCover=0


let NumChosenPokemon;
let Dictionary={}
let MoveSet=[]

let NewPartyMember

async function MoveCardClick(PokemonApi,NumMoves) {
    
    
    let PokemonCards = Array.from(ListPokemons.querySelectorAll(".PokemonCard"));

    PokemonCards.forEach(PokemonCard=>{
        PokemonCard.style.pointerEvents = "none";
    })
    
    return new Promise(async (resolve) => {
        
        function waitMoveCards(NumMoves){
            return new Promise((resolve)=>{
                const Id= setInterval(()=>{
                    let MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));


                    if(MoveCards.length== NumMoves){
                        clearInterval(Id)
                        resolve(MoveCards)
                    }
                },100)
            })
        }
            
        MoveCards= await waitMoveCards(NumMoves)    

    function FinishParty(){

            if(MoveSet=="" && typeof MoveSet=="string"){
                clearInterval(RedInterval);

                RedInterval = setInterval(() => {
                    ElapsedTime+=40
                    BlackCover=ElapsedTime+200
                    if(BlackCover>2000){
                        BlackCover=2000
                    }

                    if(ElapsedTime>1000){
                        FinishPokemon.textContent="Complete Party"
                    }

                    if (RedValue < 255) {
                        RedValue += 5;
                        FinishPokemon.style.background = `linear-gradient(90deg, rgb(${RedValue},0,0) ${ElapsedTime/20}%,black ${(BlackCover/20)}%)`;
                    }

                    if(ElapsedTime>2000){
 
                    FinishPokemon.removeEventListener("mousedown", FinishParty)
                    resolve(PokemonParty)
 
                    clearInterval(RedInterval)
                    }
                }, 40);
            }
        
    }
    
    FinishPokemon.addEventListener("mousedown",FinishParty);
    //

    FinishPokemon.addEventListener("mouseup", function() {
        clearInterval(RedInterval);
        RedValue=0
        ElapsedTime=0
        FinishPokemon.textContent="Go to Next Pokemon"
        FinishPokemon.style.background = `linear-gradient(rgb(31, 30, 30),rgb(31, 30, 30)`;
        })

        FinishPokemon.addEventListener("mouseleave", function() {
        clearInterval(RedInterval);
        RedValue=0
        ElapsedTime=0
        FinishPokemon.style.background = `linear-gradient(rgb(31, 30, 30),rgb(31, 30, 30)`;
        })



            FinishPokemon.addEventListener("click", function() {
            let MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));
            
            TextBox.style.display="none"

            if(ListMoves.querySelector(".MoveCard")!=null){
              
            
            // Check and update MoveSet and NumChosenPokemon
            

            if (MoveSet.length !== 0) {
                
                while (MoveSet.length !== 4) {
                    if (MoveSet.length === 0) {
                        
                    }
                    MoveSet.push(""); // Add placeholder to MoveSet
                }
                
                if (NumChosenPokemon == 5){
                    Dictionary = {};

                    MoveSet.push(ClickedPokemonName)
                    //Dictionary[ClickedPokemonName+NumChosenPokemon] = MoveSet;
                    Dictionary[`${PokeBaseName}_${NumChosenPokemon}`]= MoveSet
                    PokemonParty.push(Dictionary);
                    PartyCard.style.display="inline-block"
                    PartyCardTempText.style.display="none"
                    PartyCardTempTextVisibility=false
                   
                    PokemonCheckboxes.forEach(checkbox=>{
                        checkbox.checked=false;
                    }) 
                    PokemonRandom.checked=false;
    
                    NewPartyMember = document.createElement('li');
                    NewPartyMember.classList.add("PartyInfo")
                    PokeBaseName=PokeBaseName.split("_")[0]
                    //NewPartyMember.textContent=PokeBaseName
                    document.querySelector('.PartyCard').appendChild(NewPartyMember);
                    

                    Dictionary={}
                    resolve(PokemonParty)
                }
                if (NumChosenPokemon !== 5) {
                        //console.log("Passed")
                        Dictionary = {};

                        MoveSet.push(ClickedPokemonName)
                        //Dictionary[ClickedPokemonName+NumChosenPokemon] = MoveSet;
                        Dictionary[`${PokeBaseName}_${NumChosenPokemon}`]= MoveSet
                        PokemonParty.push(Dictionary);
                        
                        PartyCard.style.display="inline-block"
                        PartyCardTempText.style.display="none"
                        PartyCardTempTextVisibility=false
                        PokemonCheckboxes.forEach(checkbox=>{
                            checkbox.checked=false;
                        }) 
                        PokemonRandom.checked=false
        
                        NewPartyMember = document.createElement('li');
                        NewPartyMember.classList.add("PartyInfo")
                        NewPartyMember.textContent=PokeBaseName
                        document.querySelector('.PartyCard').appendChild(NewPartyMember);
                        
                        NumChosenPokemon+=1
                        Dictionary={}
                        MoveSet=""

                        let newPokemonName = document.createElement("li");

                        
                        newPokemonName.textContent = PokeBaseName;

                       PartyCardTemp.appendChild(newPokemonName)
                        
                }
                
                else if(Dictionary[`${PokeBaseName}_${NumChosenPokemon}`]){

                }
                
                else{

                }
                
                
                
            }
            
        }

        PokemonCards.forEach(cards => {
            cards.style.pointerEvents = "auto";
            PokemonSearchText.value=""
            
            ListMoves.style.display="none"
            PartyCardTempText.style.display="none"
            PartyCardTempTextVisibility=false

            cards.style.display="block"})
            MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));
            MoveCards.forEach(card=>{
                card.remove()
            })
     
            if(PokemonParty.length>0){
                MoveSet=""
            }
            }, { once: true })

       

        MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));
        
        
           
        /*
        document.getElementById("ResetPokemon").addEventListener("click", function() {
                
            PokemonCard.forEach(cards => {
                cards.style.pointerEvents = "auto";
                ListMoves.textContent = "";
                NumChosenPokemon=0
                PokemonParty=[]
            });
        })*/

    MoveCards.forEach(MoveCard => {
        let MoveName=(MoveCard.querySelector(".Move_Name").textContent)
        MoveCard.style.backgroundColor = "rgb(252, 252, 108)";
        MoveCard.style.pointerEvents = "auto";

        

        MoveCard.addEventListener("mouseover", () => {
            if (MoveCard.style.backgroundColor !== "rgb(91, 255, 91)") {
                MoveCard.style.backgroundColor = "rgb(255, 248, 59)";
            }
        });

        MoveCard.addEventListener("mouseout", () => {
            if (MoveCard.style.backgroundColor !== "rgb(91, 255, 91)") {
                MoveCard.style.backgroundColor = "rgb(252, 252, 108)";
            }
        });
       
        MoveCard.addEventListener("click", () => {

            if (MoveCard.style.backgroundColor === "rgb(255, 248, 59)" ||MoveCard.style.backgroundColor === "rgb(252, 252, 108)") {
                MoveCard.style.backgroundColor = "rgb(91, 255, 91)";

                MoveSet.push(MoveName)
            
                
                if (NumChosenPokemon !== 6) {

                    if (MoveSet.length === 4) {

                      MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));
                      MoveCards.forEach(card=>{
                          card.remove()
                      })
                        ListMoves.style.display="none"
                       

                        
                        
                        MoveSet.push(ClickedPokemonName)

                        Dictionary = {};
                        //Dictionary[ClickedPokemonName+NumChosenPokemon] = MoveSet;
                        Dictionary[`${PokeBaseName}_${NumChosenPokemon}`]= MoveSet
                        PokemonParty.push(Dictionary);
                        
                        PartyCard.style.display="inline-block"
                        PartyCardTempText.style.display="none"
                        PartyCardTempTextVisibility=false
                        PokemonCheckboxes.forEach(checkbox=>{
                            checkbox.checked=false;
                        }) 
                        PokemonRandom.checked=false
                        

                        NewPartyMember = document.createElement('li');
                        NewPartyMember.classList.add("PartyInfo")
                        NewPartyMember.textContent=PokeBaseName

                        let newPokemonName = document.createElement("li");

                        
                        newPokemonName.textContent = PokeBaseName;

                        document.querySelector('.PartyCardTemp').appendChild(newPokemonName);

                        MoveSet=""
                        NumChosenPokemon+=1
                
                 PokemonCards = Array.from(ListPokemons.querySelectorAll(".PokemonCard"));
                            PokemonCards.forEach(cards => {
                                cards.style.pointerEvents = "auto";
                                PokemonSearchText.value=""
                                cards.style.display="block"
                            });
                        }
                    }

                    if(NumChosenPokemon==6){
                resolve(PokemonParty)

            }

            } else if (MoveCard.style.backgroundColor === "rgb(91, 255, 91)") {
                MoveCard.style.backgroundColor = "rgb(252, 252, 108)";
                let Index=MoveSet.indexOf(MoveName)
                MoveSet.splice(Index,1)

            } 
            
            
        });
   
        
            
        
    });
   
    
    
    })
}

function checkElementPosition() {
    var myDiv = document.getElementById('PokemonMoveFilter');
    var rect = myDiv.getBoundingClientRect(); // Get the position of the element
    
    var threshold = 640; // Distance from the left edge to hide the element
    
    if (rect.left < threshold) {
        myDiv.style.display = 'none'; // Hide the element
        myDiv.style.gap="20px"
    } 
    if(window.innerWidth>855){

        myDiv.style.display = 'grid'
    }

    let NumPokLeftText = PartyCardTempText

    if(PartyCardTempTextVisibility){
        if(window.innerWidth>910){
        
            NumPokLeftText.style.display = 'block'
        }
        else{
            NumPokLeftText.style.display = 'none'
            
        }
    
    }
    
}

// Run the function on window resize and scroll
window.addEventListener('resize', checkElementPosition);
window.addEventListener('scroll', checkElementPosition);



/*
        // Add event listener to the "FinishPokemon" button
        document.getElementById("FinishPokemon").addEventListener("click", function() {
            console.log("Button Clicked");

            // Check and update MoveSet and NumChosenPokemon
            if (MoveSet.length !== 0 || NumChosenPokemon !== 0) {
                while (MoveSet.length !== 4) {
                    if (MoveSet.length === 0) {
                        NumChosenPokemon = 6;
                        break; // Exit loop if MoveSet is empty
                    }
                    MoveSet.push(""); // Add placeholder to MoveSet
                }

                if (NumChosenPokemon !== 6) {
                    NumChosenPokemon += 1; // Increment NumChosenPokemon
                }

                console.log(NumChosenPokemon);
                
            }
        })

            // Additional condition checks
            if (MoveSet.length === 4) {
                ListMoves.textContent = "";
                NumChosenPokemon += 1;
                console.log(MoveSet);
                let Dictionary = {};
                Dictionary[PokemonApi] = MoveSet;
                PokemonParty.push(Dictionary);

                // Enable pointer events for Pokémon cards
                let PokemonCard = Array.from(ListPokemons.querySelectorAll(".PokemonCard"));
                PokemonCard.forEach(cards => {
                    cards.style.pointerEvents = "auto";
                });
            }

            // Resolve the promise if enough Pokémon are chosen
            

            // Re-enable pointer events for Pokémon cards
            let PokemonCard = Array.from(ListPokemons.querySelectorAll(".PokemonCard"));
            PokemonCard.forEach(cards => {
                cards.style.pointerEvents = "auto";
            });
        });
    */

    