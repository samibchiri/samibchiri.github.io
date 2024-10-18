import {Recursive,CountProp,LevelOfChamp} from './ChampLevels.js'
import {TrainerData} from './Opponents.js'
import { createMove } from './CreatePok&Movez.js'
import { PokemonFilterBox, MoveFilterBox } from './FilterBoxes.js'
import { GymleaderCardClick,fGymleaderCheckboxes,GymleadersCards,CreateGymleaderCard,ChooseRandomGymleader } from './GymLeader.js'


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
let TrainerName
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



async function Result(){
    // [TrainerData,GymleadersData,ChampionsData]= await TrainerData()
    let Results= await TrainerData()
    return(Results)
}


export function ChampCardClick(){
    setTimeout(()=>{
        
        let ChampCard= Array.from(ListChamps.querySelectorAll(".ChampCard"))
        ChampCard.forEach(card=>{
             card.addEventListener("click",()=>{
                
                let ChosenTrainer= (card.querySelector(".Trainer_Name").textContent)
                ListChamps.innerHTML=""
                ListChamps.style.display="none"
                let PokemonAmount= (card.querySelector(".Trainer_Amount").textContent).split(" ")[1]
                //console.log(PokemonAmount)
                PokemonAmount=parseInt(PokemonAmount)   
                //console.log("PokemonAMoutn")
                //console.log(PokemonAmount)
                NumChosenPokemon=6-PokemonAmount
                //ErrorMessage.textContent=ChosenTrainer+"  "+ PokemonAmount
                FilterButtons.innerHTML=""
                FilterButtons.style.display="none"
                ListPokemons.style.display="grid"
                PokemonCont.style.display="flex"
                PokemonCardClickable()
                InformationBox1.style.display="none"
                InformationBox2.style.display="none"
                PokemonSearch.style.display="flex"

                PokemonFilterBox()

                MoveFilterBox()

                console.log(ChosenTrainer)
            
     
        
        })
        
    },3500
    
    )
   
})
}





        
export function CreateChampCard(Name,Gen,Level,Number){
    clone= template.content.cloneNode(true);
    clone.querySelector('.Trainer_Name').textContent = Name;
    clone.querySelector('.Trainer_Gen').textContent = `Generation: ${Gen+1}`;
    clone.querySelector('.Trainer_Level').textContent = `Level: ${Level}`;
    clone.querySelector('.Trainer_Amount').textContent = `#Pokemon: ${Number}`;
    
    document.querySelector('.ListChamps').appendChild(clone);
}

export function fChampCheckboxes(event){
    const checkbox= event.target;
    
    ChampCardClick()

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

}



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
                    
                    TrainerName= (Object.keys(TrainerDictionary)[j])
                    TrainerLevel=(TrainerDictionary[(Object.keys(TrainerDictionary)[j])])
                    PokemonAmount=(PokemonNumbers[(Object.keys(TrainerDictionary)[j])])
                    
                    
                    CreateChampCard(TrainerName,GenNumber,TrainerLevel,PokemonAmount)
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
    let PokemonUrl
    let response
    let data
    let PokemonNumber=card.querySelector(".Pokemon_Dex").textContent;
    PokemonNumber= (PokemonNumber.split(" ")[1])
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
    let PokeBaseName= (card.querySelector(".Pokemon_Base_Name").textContent)
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
        console.log(NameSegment)
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
    try{
        PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`

        response= await fetch(PokemonUrl);
        data= await response.json()
        MoveSet=[]
        MoveSetMaker(PokemonApi)
        
    }
    catch(error){
        try{
            
            //console.log(PokemonNumber)
            
            PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonNumber}`  
            response= await fetch(PokemonUrl);
            data= await response.json()
            InformationBox1.style.display="block"
            InformationBox2.style.display="block"
            InformationBox1.textContent=(`Couldnt get ${(card.querySelector(".Pokemon_Name").textContent)}`)
            InformationBox2.textContent=(`Now you have ${card.querySelector(".Pokemon_Base_Name").textContent}`)
            //console.log(PokemonApi)
            //console.log(data)
            MoveSetMaker(PokemonNumber)
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

export function PokemonCardClickable(){
    setTimeout(()=>{
        let PokemonCard=Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        PokemonCard.forEach(card=>{
            //card.addEventListener("click",async ()=>{
            card.addEventListener("click",()=>{
                Test(card)
                //console.log(card)
                PokemonCard.forEach(cards=>{
                    cards.style.pointerEvents = "none";
                    
                    PokemonSearchText.value=""
            })
            })
            })
            
        },3500)
        
        //InformationBox1.style.display="block"
        //InformationBox2.style.display="block"
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
       
        let ChosenTrainer= (RandomChamp.querySelector(".Trainer_Name").textContent)   
        console.log(ChosenTrainer)
        let PokemonAmount= (RandomChamp.querySelector(".Trainer_Amount").textContent).split(" ")[1]
        PokemonAmount=parseInt(PokemonAmount)   
        PokemonSearch.style.display="flex"
        NumChosenPokemon=6-PokemonAmount

        ListChamps.innerHTML=""
        ListChamps.style.display="none"
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
        console.log(ChosenPokemon)

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

let PokemonParty=[]
async function MoveSetMaker(PokemonApi){
    let PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`
    let response= await fetch(PokemonUrl);
    let data= await response.json()
    let MoveSet=[]
   
    //console.log(data.moves)
    data.moves.forEach(async move=>{
        let Move=(move.move.name)
        //let CreatedMove= createMove(Move)
        let MoveUrl=`https://pokeapi.co/api/v2/move/${Move}/`

        let Answer= await fetch(MoveUrl);
        let MoveData= await Answer.json()
        //console.log(MoveData)
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
        PokemonParty= await MoveCardClick(PokemonApi)
        console.log(PokemonParty)
        console.log("Party Complete")
    }
        ,500)
    
    
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
    
    let MoveCards=document.querySelectorAll(".MoveCard")
    
    MoveCards.forEach(MoveCard=>{
        MoveCard.style.backgroundColor="rgb(246, 71, 71)"
        MoveCard.style.pointerEvents="none"
    })
    
    ListMoves.style.display="block"
    
}

let RandomPokemon
let RandomIndex
let ChosenPokemon

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
        console.log(ChosenPokemon)

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
        divs.forEach(div =>{
            div.style.display="block"
            div.style.pointerEvents = "auto";
            ListMoves.textContent=""
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

async function MoveCardClick(PokemonApi) {
    let PokemonCard = Array.from(ListPokemons.querySelectorAll(".PokemonCard"));

    return new Promise((resolve) => {
        let MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));
     
    function FinishParty(){
        console.log("DOwn")
        if(ListMoves.style.display=="none"){
            console.log(typeof MoveSet)
            if(MoveSet=="" && typeof MoveSet=="string"){
                clearInterval(RedInterval);

                RedInterval = setInterval(() => {
                    ElapsedTime+=40
                    BlackCover=ElapsedTime+200
                    if(BlackCover>2000){
                        BlackCover=2000
                    }

                    if (RedValue < 255) {
                        RedValue += 5;
                        FinishPokemon.style.background = `linear-gradient(90deg, rgb(${RedValue},0,0) ${ElapsedTime/20}%,black ${(BlackCover/20)}%)`;
                    }

                    if(ElapsedTime>2000){
                    console.log("Done")
                    FinishPokemon.removeEventListener("mousedown", FinishParty)
                    resolve(PokemonParty)
                    console.log("PCOmplete")
                    clearInterval(RedInterval)
                    }
                }, 40);
            }
        }
    }
    
    FinishPokemon.addEventListener("mousedown",FinishParty);
    //

    FinishPokemon.addEventListener("mouseup", function() {
        console.log("Up")
        clearInterval(RedInterval);
        RedValue=0
        ElapsedTime=0
        FinishPokemon.style.background = `linear-gradient(rgb(31, 30, 30),rgb(31, 30, 30)`;
        })

        FinishPokemon.addEventListener("mouseleave", function() {
        console.log("Leave")
        clearInterval(RedInterval);
        RedValue=0
        ElapsedTime=0
        FinishPokemon.style.background = `linear-gradient(rgb(31, 30, 30),rgb(31, 30, 30)`;
        })



            FinishPokemon.addEventListener("click", function() {
            let MoveCards = Array.from(ListMoves.querySelectorAll(".MoveCard"));
            

            if(ListMoves.querySelector(".MoveCard")!=null){
              
            
            console.log("Button Clicked");
            console.log(MoveSet)
            
            // Check and update MoveSet and NumChosenPokemon
            

            if (MoveSet.length !== 0) {
                
                while (MoveSet.length !== 4) {
                    if (MoveSet.length === 0) {
                        
                    }
                    MoveSet.push(""); // Add placeholder to MoveSet
                }
                
                if (NumChosenPokemon == 5){
                    Dictionary = {};
                    Dictionary[PokemonApi+NumChosenPokemon] = MoveSet;
                    PokemonParty.push(Dictionary);
                    Dictionary={}
                    resolve(PokemonParty)
                }
                if (NumChosenPokemon !== 5) {
                        //console.log("Passed")
                        Dictionary = {};
                        Dictionary[PokemonApi+NumChosenPokemon] = MoveSet;
                        PokemonParty.push(Dictionary);
                        console.log(PokemonParty)
                        NumChosenPokemon+=1
                        Dictionary={}
                        MoveSet=""
                        
                }
                
                else if(Dictionary[PokemonApi+NumChosenPokemon]){
                    console.log("Empty")
                }
                
                else{
                    console.log(PokemonParty)
                }
                
                
                
            }
            
        }
        
        //console.log("contitue")
        PokemonCard.forEach(cards => {
            cards.style.pointerEvents = "auto";
            PokemonSearchText.value=""
            ListMoves.textContent = "";
            ListMoves.style.display="none"
            cards.style.display="block"})

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

    //console.log("Continue")
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
            if (MoveCard.style.backgroundColor === "rgb(255, 248, 59)") {
                MoveCard.style.backgroundColor = "rgb(91, 255, 91)";
                
                //console.log(MoveSet)
           
                MoveSet.push(MoveName)
            
                
                if (NumChosenPokemon !== 6) {
                    console.log("HERE")
                    if (MoveSet.length === 4) {
                      //  console.log(MoveSet)
                        ListMoves.textContent = "";
                        ListMoves.style.display="none"
                        
                        
                        
                        Dictionary = {};
                        Dictionary[PokemonApi+NumChosenPokemon] = MoveSet;
                        PokemonParty.push(Dictionary);
                        //console.log(Dictionary)
                        console.log(PokemonParty)
                        MoveSet=""
                        NumChosenPokemon+=1
                
                 PokemonCard = Array.from(ListPokemons.querySelectorAll(".PokemonCard"));
                            PokemonCard.forEach(cards => {
                                cards.style.pointerEvents = "auto";
                                PokemonSearchText.value=""
                                cards.style.display="block"
                            });
                        }
                    }
            //console.log(NumChosenPokemon)
                    if(NumChosenPokemon==6){
                resolve(PokemonParty)
                //console.log(PokemonParty)
                //console.log(ChosenTrainer)
            }

            } else if (MoveCard.style.backgroundColor === "rgb(91, 255, 91)") {
                MoveCard.style.backgroundColor = "rgb(252, 252, 108)";
                let Index=MoveSet.indexOf(MoveName)
                MoveSet.splice(Index,1)
                //console.log(MoveSet)
            } 
            
            
        });
   
        
            
        
    });
   
    
    
    })
}
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

