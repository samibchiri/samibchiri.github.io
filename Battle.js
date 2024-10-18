
import { ThrowClosePokemon,ThrowFarPokemon,ReturnClosePokemon,ReturnFarPokemon } from './AttackAnimations.js'
import {createPokemon,createMove,PokemonStatCalc} from './CreatePok&Movez.js'
import {TypeEffectiveness,UserDmgCalc} from './dmg_calc.js'
import {Attack, PokemonTurn,YouAttack,CompAttack} from './Fighting.js'
import { HallOfFameAnimation } from './HallOfFame.js'

import{MovingPokeCard} from './PrepFight.js'

import{RetrievePartiesData,GettingStatsData,DisplayParty,DisplayBag,DisplayFightCards,CreateClosePokemonInfo,CreateFarPokemonInfo,ChangeClosePokemonInfo,ChangeFarPokemonInfo,RepeatClosePokemonInfo,RepeatFarPokemonInfo } from './PrepFight.js'

let GameInputCont= document.getElementById("GameInputCont")
let TempGameInputCont= document.getElementById("TempGameInputCont")
let BattleArea= document.getElementById("BattleArea")

let CircleFight= document.getElementById("CircleFight")
let CircleInput=document.getElementById("CircleInput")

let PokemonCloseName= document.getElementById("PokemonCloseName")
let PokemonCloseHealthbar= document.getElementById("PokemonCloseHealthbar")
let PokemonCloseHealth= document.getElementById("PokemonCloseHealth")

let MedicineBag= document.getElementById("MedicineBag")
let PokemonBag= document.getElementById("PokemonBag")

let Purpose

let GameMessage1= document.querySelector("#GameMessage1")
let GameMessage2= document.querySelector("#GameMessage2")


let timeoutId1
let timeoutId2

let Pokemon1Name
let Pokemon2Name
//PlayGamePrep()
async function PlayGamePrep(FirstParty,SecondParty){
    

    let Partys= await AddPartyLevel(FirstParty,SecondParty)
    

    let PartysMoves1=Partys[0]
    let PartysMoves2=Partys[1]

    //console.log(PartysMoves1)
    let Party1=Partys[2]
   
    let Party2=Partys[3]

    //console.log(PartysMoves1)


   // console.log(Partys[0])
/*
    for (let i in Partys[0]){
        let PokemonMovesSet=[]
        
        for(let j in Partys[0][i])
           
            for(let k in Partys[0][i][j]){
                if(k<4){
                    PokemonMovesSet.push( Partys[0][i][j][k])
                }
            }
           
       PartysMoves1.push(PokemonMovesSet)
    }
    for (let i in Partys[1]){
        let PokemonMovesSet=[]
        
        for(let j in Partys[1][i])
           
            for(let k in Partys[1][i][j]){
                if(k<4){
                    PokemonMovesSet.push( Partys[1][i][j][k])
                }
            }
           
       PartysMoves2.push(PokemonMovesSet)
    }
    
    console.log(PartysMoves1)
    //console.log(PartysMoves2)
    
*/
//console.log(PartysMoves1)
    for(let l in PartysMoves1){
        //console.log(PartysMoves1[l])
        for(let k in PartysMoves1[l]){
        for(let move in PartysMoves1[l][k]){
            let DictionaryMoves={}
            let Move= (PartysMoves1[l][k][move])
            let OgMove=Move
            Move = Move.toLowerCase().trim()
            Move=Move.replaceAll(" ","-")
            if(Move!=""){
                //console.log(Move)
                
                let MoveData= await createMove(Move)
                //console.log(MoveData)
                //console.log(OgMove)
                //console.log(MoveData.Name)
                
                MoveData.Name=OgMove
                DictionaryMoves[OgMove]=MoveData
                PartysMoves1[l][k][move]= DictionaryMoves[OgMove]
                //console.log(PartysMoves1[l][k])
                
               
            }
            else{
               // MoveData.CurrentPP=""
                //DictionaryMoves[OgMove]=MoveData
                //PartysMoves1[l][k][move]= DictionaryMoves[OgMove]
            }
        }
    }
          
    }
    //console.log(PartysMoves1)


    for(let l in PartysMoves2){
        
        for(let k in PartysMoves2[l]){

        for(let move in PartysMoves2[l][k]){
            let DictionaryMoves={}
            let Move= (PartysMoves2[l][k][move])
            let OgMove=Move
            if(typeof Move=="string"){
            Move = Move.toLowerCase().trim()
            Move=Move.replaceAll(" ","-")
            if(Move!=""){
                //console.log(Move)
                
                let MoveData= await createMove(Move)
                //console.log(MoveData)
                //console.log(OgMove)
                MoveData.Name=OgMove
                DictionaryMoves[OgMove]=MoveData
                PartysMoves2[l][k][move]= DictionaryMoves[OgMove]
                //console.log(PartysMoves2[l])
                
               
            }
        }
        }
    
    }
          
    }
    //console.log(PartysMoves2)
    //console.log(Party1)
    let AllData=[Party1,Party2,PartysMoves1, PartysMoves2]
    return AllData
}



let Party1PokeBalls=[]
let Party2PokeBalls=[]



let DisplayOutput
let MoveIndex=0
let Aim



function GetPokemonName1(ActivePokemonNumber1,Party1Moves){
    let Pokemon1Name=Object.keys(Party1Moves)[0]
    Pokemon1Name=Pokemon1Name.split("_")[0]
    //console.log(name)
    Pokemon1Name=Pokemon1Name.split("-")[0]
    return Pokemon1Name

}

function GetPokemonName2(ActivePokemonNumber2,Party2Moves){
    console.log(Party2Moves)
    let Pokemon2Name=Object.keys(Party2Moves)[0]
    Pokemon2Name=Pokemon2Name.split("_")[0]
    //console.log(name)
    Pokemon2Name=Pokemon2Name.split("-")[0]
    return Pokemon2Name

}



export async function PlayGame(FirstParty,SecondParty,Name1,Name2){
    

    Name2=Name2.split(" ")
    let CopyName2=""
    for (let i in Name2){
        
        if (i<2){
            CopyName2+=Name2[i]+" "
        }
    }

    CopyName2.trim()
    Name2=CopyName2

    
    let PokeBallClose=document.getElementById("PokeBallClose")
    let GreatBallClose=document.getElementById("GreatBallClose")

    let PokeBallFar=document.getElementById("PokeBallFar")
    let GreatBallFar=document.getElementById("GreatBallFar")

    let ActivePokemonNumbers
    let ActivePokemonNumber1=0
    let ActivePokemonNumber2=0

    
    let Partys= await PlayGamePrep(FirstParty,SecondParty)

 
    let Party1=Partys[0]
    let Party2=Partys[1]
    
    let Party1Moves=Partys[2]
    let Party2Moves=Partys[3]





    //console.log(Party1Moves)

    for(let i in Party1Moves){
        for(let name in Party1Moves[i]){
            name=name.split("_")[0]
            //console.log(name)
            name=name.split("-")[0]
            name=name[0].toUpperCase()+name.slice(1)
            //console.log(name)
            
            Party1[i].Name=name
            Party1[i]=PokemonStatCalc(Party1[i])
            
            console.log("Paerty")
            if(Party1[i].BST>=600){
                Party1PokeBalls.push(GreatBallClose)
            }
            else{
                Party1PokeBalls.push(PokeBallClose)
       
            }
            
        }
      
    }
    //console.log(Party1)
    let Pokemon1Name=Object.keys(Party1Moves[ActivePokemonNumber1])[0]
    Pokemon1Name=Pokemon1Name.split("_")[0]
    //console.log(name)
    Pokemon1Name=Pokemon1Name.split("-")[0]

    


   

    //console.log(Pokemon1Name)
        
   
   // console.log(Party1[ActivePokemonNumber1])
   
   
   
   /*
    for(let pokemon in Party1[ActivePokemonNumber1]){
        Pokemon1Name=pokemon
        Pokemon1Name=Pokemon1Name.split("_")[0]

        let Pokemon1NameWords=Pokemon1Name.split(" ")
        Pokemon1Name=""
        for(let i in Pokemon1NameWords ){
             Pokemon1NameWords[i]=Pokemon1NameWords[i].charAt(0).toUpperCase()+Pokemon1NameWords[i].slice(1)
            
             Pokemon1Name=Pokemon1Name+" "+Pokemon1NameWords[i]
        }
        let Pokemon1Level=Party1[ActivePokemonNumber1][pokemon][4].split(":")[1]
        Pokemon1Level=parseInt(Pokemon1Level)
        
       
        let CurrentHp1=(Party1[ActivePokemonNumber1][pokemon][7]).split(":")[1]
        let MaxHp1=(Party1[ActivePokemonNumber1][pokemon][8]).split(":")[1]
        
    }
        */


    //RepeatClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, ActivePokemon1.MaxHp)
          
   
    /*
    for(let pokemon in Party2[ActivePokemonNumber1]){
        Pokemon2Name=pokemon
        Pokemon2Name=Pokemon2Name.split("_")[0]

        let Pokemon2NameWords=Pokemon2Name.split(" ")
        Pokemon2Name=""
        for(let i in Pokemon2NameWords ){
             Pokemon2NameWords[i]=Pokemon2NameWords[i].charAt(0).toUpperCase()+Pokemon2NameWords[i].slice(1)
            
             Pokemon2Name=Pokemon2Name+" "+Pokemon2NameWords[i]
        }
        let Pokemon2Level=Party2[ActivePokemonNumber1][pokemon][4].split(":")[1]
        Pokemon2Level=parseInt(Pokemon2Level)
        
       
        let CurrentHp2=(Party2[ActivePokemonNumber2][pokemon][7]).split(":")[1]
        let MaxHp2=(Party2[ActivePokemonNumber2][pokemon][8]).split(":")[1]
        
        CreateFarPokemonInfo(Pokemon2Name,CurrentHp2,MaxHp2)
    }  */ 
    
    for(let i in Party2Moves){
        for(let name in Party2Moves[i]){
            name=name.split("_")[0]
            //console.log(name)
            name=name.split("-")[0]
            //console.log(name)
            Party2[i].Name=name
            Party2[i]=PokemonStatCalc(Party2[i])
            
            if(Party2[i].BST>=600){
                Party2PokeBalls.push(GreatBallFar)
            }
            else{
                Party2PokeBalls.push(PokeBallFar)
       
            }
            
            
        }
       
    }

    if(Name1.toLowerCase()=="he"){
        Name1="He"
        Name2="You"
        CopyName2=Name2
        
    }
    if(Name1.toLowerCase()=="she"){
        Name1="She"
        Name2="You"
        CopyName2=Name2
    }
    

    document.getElementById("TrainerNames").textContent=`${Name1} vs ${CopyName2}`


    MovingPokeCard(Name1,Name2)
    await delay(6000)
    
    BattleArea.style.display="flex"

    let Bag1={
        Name:"Bag1",
        HealPP:"0",
        RevivePP:"0",
        priority:10
    }

    if(Party1.length>3){
        
        Bag1.RevivePP="1"
    }

    Bag1.HealPP=Math.floor(Party1.length/2)

    let Bag2={
        Name:"Bag2",
        HealPP:"0",
        RevivePP:"0",
        priority:10
    }

    if(Party2.length>3){
        Bag2.RevivePP="1"
    }
    
    Bag2.HealPP=Math.floor(Party2.length/2)


    
    await delay(1000)

    let ActivePokemon1=Party1[ActivePokemonNumber1]
    
    let PokemonCloseSprite=ActivePokemon1.SpriteBack
    

    GameMessage1.textContent=`Do your Best, ${Pokemon1Name}!`

    
    ThrowClosePokemon(Party1PokeBalls[ActivePokemonNumber1],PokemonCloseSprite)
    
    await delay(1500)
    
    CreateClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp,ActivePokemon1.MaxHp)

    let Pokemon2Name=Object.keys(Party2Moves[ActivePokemonNumber2])[0]
    Pokemon2Name=Pokemon2Name.split("_")[0]
    //console.log(name)
    Pokemon2Name=Pokemon2Name.split("-")[0]

    Pokemon2Name=Pokemon2Name[0]+Pokemon2Name.slice(1)

    
    let ActivePokemon2=Party2[ActivePokemonNumber2]

    let PokemonFarSprite=ActivePokemon2.SpriteFront
    
    GameMessage1.textContent=`You know you are Stronger, ${Pokemon2Name}!`
    
   

    
    ThrowFarPokemon(Party2PokeBalls[ActivePokemonNumber2],PokemonFarSprite)

    await delay(1500)

    CreateFarPokemonInfo(Pokemon2Name,ActivePokemon2.Hp,ActivePokemon2.MaxHp);
    
    GameMessage1.textContent=""
 
   //console.log(MovesOfActive1)

   
   CircleFight.addEventListener("click",async()=>{
    

    GameMessage1.textContent=""
    GameMessage2.textContent=""
    clearTimeout(timeoutId1);
    clearTimeout(timeoutId2);



    let MovesOfActive1=(Party1Moves[ActivePokemonNumber1])
    let MovesOfActive2=(Party2Moves[ActivePokemonNumber2])

   
    Purpose="Fight"
    
  
    DisplayOutput=await DisplayFightCards(MovesOfActive1)

 
    Purpose=DisplayOutput[0]
    MoveIndex=DisplayOutput[1]
    

    if(Purpose=="Fight"){
   
        Purpose=Purpose+"_"+MoveIndex
     

         ActivePokemonNumbers=await AttackMovesDisplay(Purpose,Pokemon1Name,Pokemon2Name,Party1,ActivePokemonNumber1,Party2,ActivePokemonNumber2,MovesOfActive1,MovesOfActive2,Bag1,Bag2)
        GameMessage1.textContent=""
        GameMessage2.textContent=""
        ActivePokemonNumber1=ActivePokemonNumbers[0]
        ActivePokemonNumber2=ActivePokemonNumbers[1]
        
        EndBattle(ActivePokemonNumber1,ActivePokemonNumber2,Name1,Name2)
    }
    else{
        
        CircleFight.style.pointerEvents="auto"
        CircleInput.style.pointerEvents="auto"
        MedicineBag.style.pointerEvents="auto"
        PokemonBag.style.pointerEvents="auto"

        
    }

})

   CircleInput.addEventListener("click",async ()=>{
   
    GameMessage1.textContent=""
    GameMessage2.textContent=""
    clearTimeout(timeoutId1);
    clearTimeout(timeoutId2);

    let MovesOfActive1=(Party1Moves[ActivePokemonNumber1])
    let MovesOfActive2=(Party2Moves[ActivePokemonNumber2])

    Purpose="Fight"
    
 
    DisplayOutput=await DisplayFightCards(MovesOfActive1)


    
    Purpose=DisplayOutput[0]
    MoveIndex=DisplayOutput[1]
    
    if(Purpose=="Fight"){

        Purpose=Purpose+"_"+MoveIndex
   
   
        ActivePokemonNumbers=await AttackMovesDisplay(Purpose,Pokemon1Name,Pokemon2Name,Party1,ActivePokemonNumber1,Party2,ActivePokemonNumber2,MovesOfActive1,MovesOfActive2,Bag1,Bag2)
        GameMessage1.textContent=""
        GameMessage2.textContent=""
        ActivePokemonNumber1=ActivePokemonNumbers[0]
        ActivePokemonNumber2=ActivePokemonNumbers[1]
        
        EndBattle(ActivePokemonNumber1,ActivePokemonNumber2,Name1,Name2)
    }
    else{
       
        CircleFight.style.pointerEvents="auto"
        CircleInput.style.pointerEvents="auto"
        MedicineBag.style.pointerEvents="auto"
        PokemonBag.style.pointerEvents="auto"
        
    }

})
    
    
    
    //Purpose=await DisplayBag(Purpose)
        
   
    MedicineBag.addEventListener("click",async ()=>{
        
       GameMessage1.textContent=""
        GameMessage2.textContent=""
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);

        let MovesOfActive1=(Party1Moves[ActivePokemonNumber1])
        let MovesOfActive2=(Party2Moves[ActivePokemonNumber2])

        Purpose="Heal"
       
        DisplayOutput=await DisplayBag(Purpose,Bag1)
        
       
        DisplayOutput=await DisplayParty(DisplayOutput,Party1,Party1Moves,"",Bag1)
        
        Purpose=DisplayOutput[0]

        if(Purpose!=""){

            ActivePokemonNumbers=await AttackMovesDisplay(Purpose,Pokemon1Name,Pokemon2Name,Party1,ActivePokemonNumber1,Party2,ActivePokemonNumber2,MovesOfActive1,MovesOfActive2,Bag1,Bag2)
            ActivePokemonNumber1=ActivePokemonNumbers[0]
            ActivePokemonNumber2=ActivePokemonNumbers[1]
        }

        else{
            CircleFight.style.pointerEvents="auto"
            CircleInput.style.pointerEvents="auto"
    
        }   
        EndBattle(ActivePokemonNumber1,ActivePokemonNumber2,Name1,Name2)
           
     })
    
     PokemonBag.addEventListener("click",async ()=>{
        
        GameMessage1.textContent=""
        GameMessage2.textContent=""
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);

        let MovesOfActive1=(Party1Moves[ActivePokemonNumber1])
        let MovesOfActive2=(Party2Moves[ActivePokemonNumber2])


        Purpose="1_Switch"

        DisplayOutput=await DisplayParty(Purpose,Party1,Party1Moves,ActivePokemonNumber1)
        
        Purpose=DisplayOutput[0]
        
        if(Purpose!=""){
        
        ActivePokemonNumbers= await AttackMovesDisplay(Purpose,Pokemon1Name,Pokemon2Name,Party1,ActivePokemonNumber1,Party2,ActivePokemonNumber2,MovesOfActive1,MovesOfActive2,Bag1,Bag2)
        ActivePokemonNumber1=ActivePokemonNumbers[0]
        ActivePokemonNumber2=ActivePokemonNumbers[1]
        
        
        EndBattle(ActivePokemonNumber1,ActivePokemonNumber2,Name1,Name2)
        
    }
   
        
     })

     async function EndBattle(ActivePokemonNumber1,ActivePokemonNumber2,Name1,Name2){

        if(String(ActivePokemonNumber1).includes("_")){

        
        if(ActivePokemonNumber1.split("_")[1]=="You Lose"){

            ActivePokemonNumber1=ActivePokemonNumber1.split("_")[0]
            await delay(300)
            await ReturnClosePokemon(Party1PokeBalls[ActivePokemonNumber1])
           

            setTimeout(()=>{
                
                GameMessage1.textContent=`${Name1} Blacked Out!`
                GameMessage2.textContent=`${Name2} Earned €2000!`
            },100)
            
            
            await delay(1500)
            

            GameInputCont.style.display="none"
            TempGameInputCont.style.display="none"
            BattleArea.style.display="none"
        
            HallOfFameAnimation(Party2,CopyName2,"Player2")

            }
        }
        if(String(ActivePokemonNumber2).includes("_")){
            if(ActivePokemonNumber2.split("_")[1]=="You Win"){
            
            ActivePokemonNumber2=ActivePokemonNumber2.split("_")[0]
           
            await delay(200)
            GameMessage1.textContent=`${Name2} Blacked Out!`
            
            await delay(500)
            GameMessage2.textContent=`${Name1} Earned €10000!`

            
           
            await delay(1000)

            GameInputCont.style.display="none"
            TempGameInputCont.style.display="none"
            BattleArea.style.display="none"
                
            HallOfFameAnimation(Party1,Name1,"Player1")

            }
        }
     }

    
     //DisplayParty(Purpose,Party1,Party1Moves)


}
//PlayGame("","","Champion Blue","Jared Jimbob Jaou")




export function PokemonFightCardChanges(Card,Type,CurrentPP,MaxPP,Power,Accuracy){
       
    
       
        if(window.innerWidth > 777){
            document.querySelectorAll(".PokemonMovesCardCont").forEach((card)=>{
               
                Card.querySelector(".NameOfMoveCard").style.fontSize="2.5rem"
                Card.querySelectorAll(".PartOfMoveCard")[0].textContent=Type
                
                Card.querySelectorAll(".PartOfMoveCard").forEach((PartCard)=>{
                    PartCard.style.fontSize="1.2rem"
                })

                if(typeof CurrentPP=="number"){
                    Type=Type[0].toUpperCase()+Type.slice(1)
                    Card.querySelectorAll(".PartOfMoveCard")[1].textContent=`PP: ${CurrentPP}/${MaxPP}`
                
                    Card.querySelectorAll(".PartOfMoveCard")[2].textContent=`Power: ${Power}`
                    Card.querySelectorAll(".PartOfMoveCard")[3].textContent=`Accuracy: ${Accuracy}`
                   
                }
                else{
                    Card.style.pointerEvents="none"
                    Card.querySelectorAll(".PartOfMoveCard")[0].textContent=`Normal`
                    Card.querySelectorAll(".PartOfMoveCard")[1].textContent=`PP: 0/0`
                    Card.style.backgroundColor="grey"
                    Card.querySelectorAll(".PartOfMoveCard")[2].textContent=`Power: 0`
                    Card.querySelectorAll(".PartOfMoveCard")[3].textContent=`Accuracy: 0`
                   
                }
                 Card.style.height="140px"
            })
           
        }
        else{
            document.querySelectorAll(".PartOfMoveCard").forEach((card)=>{
                card.style.fontSize="1rem"
                Card.querySelector(".NameOfMoveCard").style.fontSize="1.5rem"
                 if(typeof CurrentPP=="number"){
                    Type=Type[0].toUpperCase()+Type.slice(1)
                    
                    Card.querySelectorAll(".PartOfMoveCard")[0].textContent=Type
                    Card.querySelectorAll(".PartOfMoveCard")[1].textContent=`PP: ${CurrentPP}/${MaxPP}`
                    Card.querySelectorAll(".PartOfMoveCard")[2].textContent=`Pow: ${Power}`
                    Card.querySelectorAll(".PartOfMoveCard")[3].textContent=`Acc: ${Accuracy}`
                      }
                else{
                    Card.style.pointerEvents="none"
                    Card.style.backgroundColor="grey"
                    
                    Card.querySelectorAll(".PartOfMoveCard")[0].textContent="Normal"
                    Card.querySelectorAll(".PartOfMoveCard")[1].textContent=`PP: 0/0`
                    Card.querySelectorAll(".PartOfMoveCard")[2].textContent=`Pow: 0`
                    Card.querySelectorAll(".PartOfMoveCard")[3].textContent=`Acc: 0`
                    
                }
                Card.style.height="90px"
            })
        }
    
    
}
let FinalHp=190
let PreviousHp=120
let Maxhp=350


/*
CreateClosePokemonInfo("Deino",PreviousHp,Maxhp)
//CreateClosePokemonInfo("Deino",10,90,100)
ChangeClosePokemonInfo("Deino",FinalHp,Previous.,Maxhp)

setTimeout(()=>{
    ChangeClosePokemonInfo("Deino",FinalHp+300,FinalHp,Maxhp)
},4000)

CreateFarPokemonInfo("Hitmonlee",PreviousHp+80,Maxhp+80)
//CreateClosePokemonInfo("Deino",10,50,100)

ChangeFarPokemonInfo("Hitmonlee",FinalHp,PreviousHp+80,Maxhp+80)

setTimeout(()=>{
    ChangeFarPokemonInfo("Hitmonlee",FinalHp-100,FinalHp,Maxhp+80)
},4000)

*/

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//AttackMovesDisplay()
export async function AttackMovesDisplay(Purpose,Pokemon1Name,Pokemon2Name,Party1,ActivePokemonNumber1,Party2,ActivePokemonNumber2,Moves1,Moves2,Bag1,Bag2){
    
    return new Promise(async (resolve)=>{

        
    CircleFight.style.pointerEvents="none"
    CircleInput.style.pointerEvents="none"
    MedicineBag.style.pointerEvents="none"
    PokemonBag.style.pointerEvents="none"
    


   
    //console.log("FunctionRand")
    //console.log(Moves1)
    /*GameInputCont.style.display="none"
    TempGameInputCont.style.display="block"
    TempGameInputCont.textContent=""
    TempGameInputCont.style.backgroundColor="rgba(33, 33, 33, 0.756)"
    TempGameInputCont.style.opacity='1'
    TempGameInputCont.style.display="grid"

    
    TempGameInputCont.style.gap = '20px';
    TempGameInputCont.style.padding="20px"
    */

    Aim=Purpose.split("_")

    /*
    if(Aim[0]=="Fight"){
        
    let AllMovesCont = document.createElement('div');
        AllMovesCont.classList.add('AllMovesContClass');
        TempGameInputCont.appendChild(AllMovesCont)

    for (let i = 0; i < 4; i++) {
        let PokemonMovesCard = document.createElement('div');
        PokemonMovesCard.classList.add('PokemonMovesCardCont');


        for(let j=0; j<5; j++){
            
            let PartOfMoveCard= document.createElement('div');
            PartOfMoveCard.textContent = " ";
            
            if(j!=0){
                PartOfMoveCard.classList.add('PartOfMoveCard');
            }
            else{
                PartOfMoveCard.classList.add('NameOfMoveCard');
            }
        
            PokemonMovesCard.appendChild(PartOfMoveCard)
        }
        
        setTimeout(()=>{
          
            let key=(Object.keys(Moves1)[0])
            let MoveCardType
            let MoveCardpp
            let MoveCardMaxpp
            let MoveCardPower
            let MoveCardAcc
                //console.log(Moves1[i])
        
            //console.log(Moves1[i][move])
           
            if(Moves1[key][i]==""){
                console.log("NO Move")
                PokemonMovesCard.style.pointerEvents="none"
                console.log(PokemonMovesCard)
                
            }
            else{
                console.log(PokemonMovesCard)
                 MoveCardType=Moves1[key][i].type
                
                 MoveCardpp=(Moves1[key][i].pp)
                 MoveCardMaxpp=(Moves1[key][i].Maxpp)
                 MoveCardPower=(Moves1[key][i].power)
                 MoveCardAcc=(Moves1[key][i].accuracy)
            }
         
           
        
           //console.log(Moves1[key])
            PokemonFightCardChanges(PokemonMovesCard,MoveCardType,MoveCardpp,MoveCardMaxpp,MoveCardPower,MoveCardAcc)
        },10)
        
    
        //console.log(Moves1)
        setTimeout(()=>{
            //console.log(Moves1[i].Name);
            //console.log(Moves1)
            //console.log(Moves1[Pokemon1Name])
            let key=(Object.keys(Moves1)[0])
                //console.log(Moves1[i])
        
            //console.log(Moves1[i][move])
            //console.log(Object.keys(Moves1))
            //console.log(Moves1[key][i])
            if(Moves1[key][i]==""){
               // console.log("No Move");
                PokemonMovesCard.style.pointerEvents="none"
                
            }
            else{
                
                let PartOfMoveName=Moves1[i].Name.split("-")
                // console.log(PartOfMoveName)
                 Moves1[i][move]=""
                 for(let word in PartOfMoveName){
                     word=PartOfMoveName[word]
                     word= word.charAt(0).toUpperCase()+word.slice(1)
                     //console.log(word.charAt(0).toUpperCase())
                     Moves1[i].Name=Moves1[i].Name+" "+word
                 }
                //console.log(Moves1[key][i]);
                 (PokemonMovesCard.querySelector(".NameOfMoveCard").textContent= Moves1[key][i].Name)
             
            }
        
        
        },10)
            

        let PokemonCardName= PokemonMovesCard.querySelector(".NameOfMoveCard")
        
        window.addEventListener('resize', ()=>{
            let key=(Object.keys(Moves1)[0])
                //console.log(Moves1[i])
            let MoveCardType
            let MoveCardpp
            let MoveCardMaxpp
            let MoveCardPower
            let MoveCardAcc
        
            //console.log(Moves1[i][move])
            //console.log(Object.keys(Moves1))
            //console.log(Moves1[key][i])
            if(Moves1[key][i]==""){
                
                PokemonMovesCard.style.pointerEvents="none"
                PokemonMovesCard.style.backgroundColor="grey"
                 MoveCardType=""
                 MoveCardpp=""
                 MoveCardMaxpp=""
                 MoveCardPower=""
                 MoveCardAcc=""
                
            }
            else{
                 MoveCardType=(Moves1[key][i].type)
                 MoveCardpp=(Moves1[key][i].pp)
                 MoveCardMaxpp=(Moves1[key][i].Maxpp)
                 MoveCardPower=(Moves1[key][i].power)
                 MoveCardAcc=(Moves1[key][i].accuracy)
            }
            
            
            PokemonFightCardChanges(PokemonMovesCard,MoveCardType,MoveCardpp,MoveCardMaxpp,MoveCardPower,MoveCardAcc)
        })

        
        AllMovesCont.appendChild(PokemonMovesCard)
        
                
        }

    }

    
    }
    */
    
    async function Fight(Party1,ActivePokemonNumber1,Party2,ActivePokemonNumber2,Moves1,Moves2 ){
        
   
    let ActivePokemon1=Party1[ActivePokemonNumber1]
    let ActivePokemon2=Party2[ActivePokemonNumber2]

    let key1=(Object.keys(Moves1)[0])
    let key2=(Object.keys(Moves2)[0])

    

   // console.log(Moves2[key2])

    return new Promise((resolve) => {
        
    /*
        let ActivePokemon1=Party1[ActivePokemonNumber1]
    let ActivePokemon2=Party2[ActivePokemonNumber2]

    let TempActivePokemon1=ActivePokemon1
    let TempActivePokemon2=ActivePokemon2
    ActivePokemon1={}
    ActivePokemon2={}
    for(let i in TempActivePokemon1){
      
        ActivePokemon1.Hp=parseInt(TempActivePokemon1[i][7].split(":")[1])
        ActivePokemon1.MaxHp=parseInt(TempActivePokemon1[i][8].split(":")[1])
        ActivePokemon1.Attack=parseInt(TempActivePokemon1[i][9].split(":")[1])
        ActivePokemon1.Defense=parseInt(TempActivePokemon1[i][10].split(":")[1])
        ActivePokemon1.Sp_Attack=parseInt(TempActivePokemon1[i][11].split(":")[1])
        ActivePokemon1.Sp_Defense=parseInt(TempActivePokemon1[i][12].split(":")[1])
        ActivePokemon1.Speed=parseInt(TempActivePokemon1[i][13].split(":")[1])
        ActivePokemon1.Level=parseInt(TempActivePokemon1[i][4].split(":")[1])
        ActivePokemon1.Primary_Type=TempActivePokemon1[i][14].split(":")[1]
        ActivePokemon1.Primary_Type= ActivePokemon1.Primary_Type.trim()
        ActivePokemon1.Secondary_Type=TempActivePokemon1[i][15].split(":")[1]
        ActivePokemon1.Secondary_Type=ActivePokemon1.Secondary_Type.trim()
        }
    
        for(let i in TempActivePokemon2){
            
            ActivePokemon2.Hp=parseInt(TempActivePokemon2[i][7].split(":")[1])
            ActivePokemon2.MaxHp=parseInt(TempActivePokemon2[i][8].split(":")[1])
            ActivePokemon2.Attack=parseInt(TempActivePokemon2[i][9].split(":")[1])
            ActivePokemon2.Defense=parseInt(TempActivePokemon2[i][10].split(":")[1])
            ActivePokemon2.Sp_Attack=parseInt(TempActivePokemon2[i][11].split(":")[1])
            ActivePokemon2.Sp_Defense=parseInt(TempActivePokemon2[i][12].split(":")[1])
            ActivePokemon2.Speed=parseInt(TempActivePokemon2[i][13].split(":")[1])
            ActivePokemon2.Level=parseInt(TempActivePokemon2[i][4].split(":")[1])
            ActivePokemon2.Primary_Type=TempActivePokemon2[i][14].split(":")[1]
            ActivePokemon2.Primary_Type= ActivePokemon2.Primary_Type.trim()
            ActivePokemon2.Secondary_Type=TempActivePokemon2[i][15].split(":")[1]
            ActivePokemon2.Secondary_Type=ActivePokemon2.Secondary_Type.trim()
        }
            */
    if(Aim[0]=="Fight"){
    setTimeout(async ()=>{

        let RandomCounter=0
        
        
        let StrongestMove=0
        let AvailibleMovesIndex=[]
        for(let i=0;i< (Moves2[key2].length)-1;i++){
           let Move=(Moves2[key2][i])
          
           if(Move.power*Move.accuracy/100>StrongestMove){
            StrongestMove=Move.power*Move.accuracy/100
           }
        }
       
        for(let i=0;i< (Moves2[key2].length)-1;i++){
            let Move=(Moves2[key2][i])
          
            if(Move.power*Move.accuracy/100>=StrongestMove/1.5){
                AvailibleMovesIndex.push(i)
            }
         }
      
        let NumMoves2=AvailibleMovesIndex.length
        let Moves2Index=AvailibleMovesIndex[Math.floor(Math.random()*NumMoves2)]
     

        

         /*
        document.querySelectorAll(".PokemonMovesCardCont").forEach((card,index)=>{
            //console.log(index)
            
            card.addEventListener("click",async ()=>{
                     
                
                //console.log(index)
                //console.log(Moves1[key1])
                //console.log(Moves1[key1][index])
                
                console.log(Moves1[key1][index])
                
                document.querySelectorAll(".PokemonMovesCardCont").forEach((card)=>{
                    card.style.pointerEvents="none"
                })
                    */
                let PreviousHp1=ActivePokemon1.Hp
                let PreviousHp2=ActivePokemon2.Hp
                
                //console.log(ActivePokemon1.Hp)
                
               

        	    let index =Aim[1]
               
                let ResultingData=await PokemonTurn(Aim[0],Moves1[key1][index],ActivePokemon1,Moves2[key2][Moves2Index],ActivePokemon2,"","",Bag1,Bag2,Party2)

                Moves1[key1][index]=ResultingData[0]
                
                Party1[ActivePokemonNumber1]=ResultingData[1]
                Moves2[key2][Moves2Index]=ResultingData[2]
                Party2[ActivePokemonNumber2]=ResultingData[3]
                Bag2=ResultingData[4]
                
                //console.log(ResultingData[3])
                //console.log(ActivePokemon2)
                
                let Result=ResultingData[4]
              
                if(Result=="DeadPokemon"){
                    if(ActivePokemon1.Hp<=0){
                        
                        let AlivePokemon=false
                        let Length= Party1.length

                        for(let i=0;i<Length;i++){
                            let index = (ActivePokemonNumber1 + i) % Length;
                            
                            if(Party1[index].Hp>0){
                               
                                AlivePokemon=true
                            }
                            
                        }
        
                        if(AlivePokemon){
                            
                            GameMessage1.textContent=`${ActivePokemon1.Name} Fainted`
                            Purpose="1_Switch"
                            Purpose=await DisplayParty(Purpose,Party1,"",ActivePokemonNumber1)
                            Purpose=Purpose.split("_")
                            await ReturnClosePokemon(Party1PokeBalls[ActivePokemonNumber1])
        
                            ActivePokemonNumber1=Purpose[2]
                            ActivePokemonNumber1=parseInt(ActivePokemonNumber1)
                            ActivePokemon1=Party1[ActivePokemonNumber1]
                           
                            await ThrowClosePokemon(Party1PokeBalls[ActivePokemonNumber1],ActivePokemon1.SpriteBack)
                    
                            let DeathCount1=0
                            for (let i in Party1){
                                if(Party1[i].Hp<=0){
                                 DeathCount1+=1
                                 
                         
                                }
                            }
                            if(DeathCount1==Party1.length-1){
                                GameMessage1.textContent="Now I will show my final Pokemon!"
                            }
                            else{
                                Pokemon1Name= GetPokemonName1(ActivePokemonNumber1,Moves1)
                                GameMessage1.textContent=`Avenge him, ${Pokemon1Name}!`
                                   
                            }
                              
                            RepeatClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, ActivePokemon1.MaxHp)
                     
                        }
                        else{
                            console.log("We are Deaddin")
                            ActivePokemonNumber1=`${ActivePokemonNumber2}_You Lose`
                        }
                              
                    }
                    else{
                        GameMessage1.textContent=`${ActivePokemon2.Name} Fainted`
                        ActivePokemonNumber2=await SwapCompPokemon(Party2,ActivePokemonNumber2,Moves2)
                    }
                }
                   
                
                ActivePokemon1.Hp=parseInt(ActivePokemon1.Hp)
                ActivePokemon1.MaxHp=parseInt(ActivePokemon1.MaxHp)
                ActivePokemon2.Hp=parseInt(ActivePokemon2.Hp)
                ActivePokemon2.MaxHp=parseInt(ActivePokemon2.MaxHp)
        
              
              
                TempGameInputCont.textContent=""
                TempGameInputCont.style.display="none"
                GameInputCont.style.display="block"
                
                CircleInput.style.pointerEvents="auto"
                CircleFight.style.pointerEvents="auto"
                MedicineBag.style.pointerEvents="auto"
                PokemonBag.style.pointerEvents="auto"

                
                timeoutId1= setTimeout(()=>{
                    GameMessage1.textContent=""
                    GameMessage2.textContent=""
                },3000)
                
                resolve([ActivePokemonNumber1,ActivePokemonNumber2]);
                
         //       })
       // })  
        ///console.log(RandomCounter)
    },100)
    }
    else{

        TempGameInputCont.textContent=""
        TempGameInputCont.style.display="none"
        GameInputCont.style.display="block"
    
        setTimeout(async ()=>{
            Purpose=Purpose.split("_")
            let Aim = Purpose[1]
      
             let Moves1Index=0

             let NumMoves2=Moves2[key2].length-1
             let Moves2Index=Math.floor(Math.random()*NumMoves2)
     

            if(Aim=="Switch"){
                await ReturnClosePokemon(Party1PokeBalls[ActivePokemonNumber1])
    
                ActivePokemonNumber1=Purpose[2]
                ActivePokemonNumber1=parseInt(ActivePokemonNumber1)
                ActivePokemon1=Party1[ActivePokemonNumber1]
                await ThrowClosePokemon(Party1PokeBalls[ActivePokemonNumber1],ActivePokemon1.SpriteBack)
                
                let DeathCount1=0
                for (let i in Party1){
                    if(Party1[i].Hp<=0){
                        DeathCount1+=1
                        
                
                    }
                }
                if(DeathCount1==Party1.length-1){
                    GameMessage1.textContent="Now I will show my final Pokemon!"
                }
                else{
                    Pokemon1Name= GetPokemonName1(ActivePokemonNumber1,Moves1)
                    GameMessage1.textContent=`Maybe you can do better, ${Pokemon1Name}.`
                        
                }

                //RepeatClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, ActivePokemon1.MaxHp)
               
            } 
                let ResultingData=await PokemonTurn(Purpose,"",ActivePokemon1,Moves2[key2][Moves2Index],ActivePokemon2,Party1,ActivePokemonNumber1,Bag1,Bag2,Party2)
                
                


                Party1[ActivePokemonNumber1]=ResultingData[1]
                Moves2[key2][Moves2Index]=ResultingData[2]
                Party2[ActivePokemonNumber2]=ResultingData[3]
                Bag2=ResultingData[4]
                
                //console.log(ResultingData[3])
                //console.log(ActivePokemon2)
                
                let Result=ResultingData[4]
                
                if(Result=="DeadPokemon"){

                    if(ActivePokemon1.Hp<=0){
                        
                        let AlivePokemon=false
                        let Length= Party1.length

                        for(let i=0;i<Length;i++){
                            let index = (ActivePokemonNumber1 + i) % Length;
                            if(Party1[index].Hp>0){
                                //ActivePokemonNumber1="You Lose"
                                AlivePokemon=true
                                }
                        }

                        if(AlivePokemon){
                            GameMessage1.textContent=`${ActivePokemon1.Name} Fainted`
                            Purpose="1_Switch"
                            Purpose=await DisplayParty(Purpose,Party1,"",ActivePokemonNumber1)
                            Purpose=Purpose.split("_")
                            await ReturnClosePokemon(Party1PokeBalls[ActivePokemonNumber1])
        
                            ActivePokemonNumber1=Purpose[2]
                            ActivePokemonNumber1=parseInt(ActivePokemonNumber1)
                            ActivePokemon1=Party1[ActivePokemonNumber1]
                           
                            await ThrowClosePokemon(Party1PokeBalls[ActivePokemonNumber1],ActivePokemon1.SpriteBack)
                            
                            let DeathCount1=0
                            for (let i in Party1){
                                if(Party1[i].Hp<=0){
                                 DeathCount1+=1
                                 
                         
                                }
                            }
                            if(DeathCount1==Party1.length-1){
                                GameMessage1.textContent="Now I will show my final Pokemon!"
                            }
                            else{
                                Pokemon1Name= GetPokemonName1(ActivePokemonNumber1,Moves1)
                                GameMessage1.textContent=`You have strong Pokemons, ${Name2}!`
                                setTimeout(()=>{
                                    GameMessage2.textContent=`But mine are Stronger!`
                                  
                                },300) 
                            }
                                 
                            RepeatClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, ActivePokemon1.MaxHp)
                     
                        }
                        else{
                            ActivePokemonNumber1=`${ActivePokemonNumber2}_You Lose`
                        }
                    }

                    else{
                        
                        GameMessage1.textContent=`${ActivePokemon2.Name} Fainted`
                        
                        ActivePokemonNumber2=await SwapCompPokemon(Party2,ActivePokemonNumber2,Moves2)
                        
                    }
                }
               
                
              
                ActivePokemon1.Hp=parseInt(ActivePokemon1.Hp)
                ActivePokemon1.MaxHp=parseInt(ActivePokemon1.MaxHp)
                ActivePokemon2.Hp=parseInt(ActivePokemon2.Hp)
                ActivePokemon2.MaxHp=parseInt(ActivePokemon2.MaxHp)
        
              
                TempGameInputCont.textContent=""
                TempGameInputCont.style.display="none"
                GameInputCont.style.display="block"
                
                CircleFight.style.pointerEvents="auto"
                CircleInput.style.pointerEvents="auto"
                MedicineBag.style.pointerEvents="auto"
                PokemonBag.style.pointerEvents="auto"
                
                
                timeoutId2= setTimeout(()=>{
                    GameMessage1.textContent=""
                    GameMessage2.textContent=""
                },3000)
                
                resolve([ActivePokemonNumber1,ActivePokemonNumber2]);
                
       },100)
    }   
})

    }
    
    let ActivePokemonNumbers=await Fight(Party1,ActivePokemonNumber1,Party2,ActivePokemonNumber2,Moves1 ,Moves2 )
    ActivePokemonNumber1=ActivePokemonNumbers[0]
    ActivePokemonNumber2=ActivePokemonNumbers[1]
    
   
    
    resolve([ActivePokemonNumber1,ActivePokemonNumber2]);
    });

    
}

/*
CreateClosePokemonInfo("Onix",80,"100")

setTimeout(()=>{
    ChangeClosePokemonInfo("Pizza",20,100)
},1000)

CreateFarPokemonInfo("Onix",80,"100")

setTimeout(()=>{
    ChangeFarPokemonInfo("Hitmonlee",10,100)
},1000)
*/

//AttackMovesDisplay()


//AddPartyLevel()
async function AddPartyLevel(FirstParty,SecondParty){
    let Partys= await RetrievePartiesData(FirstParty,SecondParty)
    
    let PartyMoveSet1=Partys[0]
    let PartyMoveSet2=Partys[1]


    //console.log(PartyMoveSet2)

    let Party1= Partys[2]
    
    let Party2= Partys[3]
    
    //console.log(Party1)
    let Sum=0
    let Total=0
    let Average=0
    //console.log(Party2)
    for (let i in Party2){
        
        let LevelOfPokemonTemp=parseInt(Party2[i].Level)
        Sum=Sum+LevelOfPokemonTemp
        Total+=1
        
        
    }
    Average=Sum/Total

    //console.log(Average)

  
   // console.log(Party2)
    for (let i in Party1){
        
        let LevelOfPokemonTemp
        let RandomNum=Math.random()
        if(RandomNum<0.1){
            LevelOfPokemonTemp=Average-(Math.random())*Average*0.2
            LevelOfPokemonTemp=Math.round(LevelOfPokemonTemp)
            
        }
        else if (RandomNum<0.3){
            LevelOfPokemonTemp=Average-(Math.random())*Average*0.1
            LevelOfPokemonTemp=Math.round(LevelOfPokemonTemp)
        
        }
        else if (RandomNum<0.7){
            LevelOfPokemonTemp=Average+(Math.random()-0.5)*Average*0.1
            LevelOfPokemonTemp=Math.round(LevelOfPokemonTemp)
        
        }
        else if (RandomNum<0.9){
            LevelOfPokemonTemp=Average+(Math.random())*Average*0.1
            LevelOfPokemonTemp=Math.round(LevelOfPokemonTemp)
        
        }
        else if(RandomNum<1){
            LevelOfPokemonTemp=Average+(Math.random())*Average*0.2
            LevelOfPokemonTemp=Math.round(LevelOfPokemonTemp)
        
        }
        //console.log(LevelOfPokemonTemp)
        //console.log(Party1)
        Party1[i].Level= LevelOfPokemonTemp
       // console.log(LevelOfPokemonTemp)
        
    }
    //console.log(PartyMoveSet2)
    Partys=[PartyMoveSet1,PartyMoveSet2,Party1,Party2]
   
    return Partys

}





/*

let Pokemon1="deino"
let Pokemon7="lillipup"
let Move1="crunch"
let Move7="bite"
let P1Level=0
let P7Level=0


async function MultipleTurns(Move1,Pokemon1,Move7,Pokemon7){

    [Move1,Pokemon1,Move7,Pokemon7]= await PokemonTurn(Move1,Pokemon1,Move7,Pokemon7);
    return [Move1,Pokemon1,Move7,Pokemon7]
}

*/

function SwapCompPokemon(Party2,ActivePokemonNumber2,Party2Moves){
    return new Promise(async (resolve,reject)=>{
        await ReturnFarPokemon(Party2PokeBalls[ActivePokemonNumber2])
    
    let Length= Party2.length
    
    for(let i=0;i<Length;i++){
        let index = (ActivePokemonNumber2 + i) % Length;
        if(Party2[index].Hp>0){
            
            ActivePokemonNumber2=index
            
            await ThrowFarPokemon(PokeBallFar,Party2[ActivePokemonNumber2].SpriteFront)
            ChangeFarPokemonInfo(Party2[index].Name,Party2[index].Hp,Party2[index].Hp, Party2[index].MaxHp)
            
            let DeathCount2=0
            for (let i in Party2){
                if(Party2[i].Hp<=0){
                 DeathCount2+=1
                 
         
                }
            }
            if(DeathCount2==Party2.length-1){
                GameMessage1.textContent="Now I will show my final Pokemon!"
            }
            else{
                Pokemon2Name= GetPokemonName2(ActivePokemonNumber2,Party2Moves)
                GameMessage1.textContent=`I haven't shown my Strongest Pokemon Yet!`
                GameMessage2.textContent=`Go for it, ${Pokemon2Name}!`
                   
            }

            resolve(ActivePokemonNumber2)
            return;
            }
        }
   
        resolve(`${ActivePokemonNumber2}_You Win`)
    });
}

/*Pokemon1=createPokemon(Pokemon1,P1Level)
Move1=createMove(Move1)
Pokemon7=createPokemon(Pokemon7,P7Level)
Move7=createMove(Move7)


Pokemon1= await Pokemon1
Move1= await Move1
Pokemon7= await Pokemon7
Move7= await Move7;


[Move1,Pokemon1,Move7,Pokemon7]= await MultipleTurns(Move1,Pokemon1,Move7,Pokemon7);

*/
//console.log(Move1,Pokemon1,Move7,Pokemon7)






//[Move1,Pokemon1,Move7,Pokemon7]= await MultipleTurns(Move1,Pokemon1,Move7,Pokemon7);
//[Move1,Pokemon1,Move7,Pokemon7]= await MultipleTurns(Move1,Pokemon1,Move7,Pokemon7);

//console.log(Pokemon1);
//console.log(Pokemon7);
//UserDmgCalc(Move1,Pokemon1,Pokemon7)










        /*
        const AvailibleMoves= await FetchMoves()
        UserMoves=[]
        //console.log(AllUserMoves)
        AllUserMoves.forEach(move => {
            Availible=false
            AvailibleMoves.forEach(AvailibleMove=>{
                if(AvailibleMove.name==move.name){
                    Availible=true
                }

            })
            if(Availible==true){
                UserMoves.push(move)
            }
        }) 
        
        for (let i=0; i<UserMoves.length; i++){
            UserMoves[i].type="grass"
            
            
            for(let p=0; p<AvailibleMoves.length;p++){
                
                if(UserMoves[i].name==AvailibleMoves[p].name){
                    UserMoves[i].type=AvailibleMoves[p].type
                    UserMoves[i].category=AvailibleMoves[p].category
                    UserMoves[i].power=AvailibleMoves[p].power
                    UserMoves[i].pp=AvailibleMoves[p].pp
                    UserMoves[i].accuracy=AvailibleMoves[p].accuracy
                    if(AvailibleMoves[p].hasOwnProperty("effect"))
                    
                    if(AvailibleMoves[p].hasOwnProperty("effect"))
                        UserMoves[i].effect={
                            stat:AvailibleMoves[p].effect.stat,
                            stages:AvailibleMoves[p].effect.stages
                    }
                    else{
                        UserMoves[i].effect=null
                    }


                    break;
                }
                
                    
            }
        }
        console.log(UserMoves)
        */

        /*
        //console.log(UserMoves)
        //UserMoves.forEach(move=>console.log(move))
        //console.log(UserMoves)
        //AllowedMoves.forEach(move=> console.log(move.name))
    
        }
    
    catch(error) {
        console.error(error)
    }
}





//numbers=[[1,2,4],[67,4,5],[8,3,14,22]]
//numbers= numbers.filter(number => console.log(number))
//console.log(numbers)



async function FetchMoves() {
    try {
    response= await fetch("moves.json")
    moves= await response.json()
    //console.log(moves)
    FilteredMoves=moves.filter(move=>!move.hasOwnProperty("effects"))
    FilteredMoves.forEach(move=> move.name= move.name.replace(/ /g,"-"))
    return FilteredMoves
    }

    catch(error){
        console.log("Error")
        console.error(error)
    }
}



function DamageCalculation(){

}*/

/*
    for(let i=0; i<data.moves.length; i++) {

        Learn_Method= (data.moves[i].version_group_details[0].move_learn_method.name)
        
            Move_Object=(data.moves[i].move.name)
            Move_Object = {
                name: (data.moves[i].move.name),
                Level_Learned: data.moves[i].version_group_details[0].level_learned_at
            }
            AllUserMoves.push(Move_Object)
            
        }
        */