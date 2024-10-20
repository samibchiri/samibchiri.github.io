
import{ReturnClosePokemon,ReturnFarPokemon,ThrowClosePokemon, ThrowFarPokemon} from './AttackAnimations.js'

import{PokemonFightCardChanges} from './Battle.js'


let Pokemon_Display= document.querySelectorAll(".Pokemon_Display")

let PokemonParty1
let PokemonParty2

let PartyCards1
let PartyCards2

let Trainer1= document.querySelector(".Trainer1")
let Trainer2= document.querySelector(".Trainer2")


let Stripe1= document.querySelector(".Stripe1")
let Stripe2= document.querySelector(".Stripe2")

let PokemonNumber
let PokemonUrl
let response
let data
let MoveSet=[]

let PokemonSpriteFront
let PokemonSpriteBack

let Hp
let Att
let Def
let Sp_Att
let Sp_Def
let Speed

let PokemonIntro= document.querySelector(".PokemonIntro")
let Pokemon_Display1= document.getElementById("Pokemon_Display1")
let Pokemon_Display2= document.getElementById("Pokemon_Display2")

let PokemonClose= document.getElementById("PokemonClose")
let PokemonFar= document.getElementById("PokemonFar")


let PokeBallClose=document.getElementById("PokeBallClose")
let GreatBallClose=document.getElementById("GreatBallClose")

let PokeBallFar=document.getElementById("PokeBallFar")
let GreatBallFar=document.getElementById("GreatBallFar")

let GameInputCont= document.getElementById("GameInputCont")
let TempGameInputCont= document.getElementById("TempGameInputCont")


let CircleFight= document.getElementById("CircleFight")
let MedicineBag= document.getElementById("MedicineBag")
let PokemonBag= document.getElementById("PokemonBag")
let CircleInput=document.getElementById("CircleInput")

let HealthBarClone= document.getElementById("HealthBarClone")

let PokemonApi

let PokemonPrimaryType
let PokemonSecondaryType 
let PokemonHpStat
let PokemonAttStat
let PokemonDefStat
let PokemonSpAttStat
let PokemonSpDefStat
let PokemonSpeedStat

let Message2
let GameMessage2= document.querySelector("#GameMessage2")

let BattleArea= document.getElementById("BattleArea")

//ThrowClosePokemon(PokeBallClose)
//ThrowFarPokemon(PokeBallFar)


export function MovingPokeCard(Name1,Name2){


   document.querySelector(".PokemonIntro").style.display="flex"



    PartyCards1= Array.from(Pokemon_Display1.querySelectorAll(".PartyCard"))

    
    for(let i=0; i<PartyCards1.length; i++){
     
        PartyCards1[i].style.animation= "MovePokemonCardRight 2s ease-in-out 1s forwards"
        setTimeout(()=>{
            PartyCards1[i].style.display="flex"
         PartyCards1[i].style.animation= "MovePokemonCardRight 1.5s ease-in-out 0s forwards"
        },i*100)
    }

    PartyCards2= Array.from(Pokemon_Display[1].querySelectorAll(".PartyCard"))

    for(let i=0; i<PartyCards2.length; i++){
        PartyCards2[i].style.animation= "MovePokemonCardRight 2s ease-in-out 1s forwards"
        setTimeout(()=>{
            PartyCards2[PartyCards2.length-i-1].style.display="flex"
            PartyCards2[PartyCards2.length-i-1].style.animation= "MovePokemonCardLeft 1.5s ease-in-out 0s forwards"
    
        },i*100)
       }


  Trainer1.textContent=Name1
  Trainer2.textContent=Name2
   Trainer1.style.animation=" MovePokemonCardRight 1s ease 0s forwards"
   Trainer2.style.animation=" MovePokemonCardLeft 1s ease 0s forwards"


   Stripe1.style.animation=" Nothing 2s, MovePokemonCardLeft 1s ease 2s forwards, Stripes 1s ease 3s forwards,Boom 1s ease 4s forwards, Fade 1s ease-in-out 5s forwards"
   Stripe2.style.animation=" Nothing 2s, MovePokemonCardLeft 1s ease 2s forwards, Stripes 1s ease 3s forwards,Boom 1s ease 4s forwards, Fade 1s ease-in-out 5s forwards"
   PokemonIntro.style.animation= "Fade 0.5s ease-in-out 5s forwards"
   
    setTimeout(()=>{
      BattleArea.style.display="flex"
      BattleArea.style.animation= "Fade 1s ease-in-out 0s reverse forwards"
    },6000)

   setTimeout(()=>{
    PokemonIntro.style.display="none"
   },6000)



}





//RetrievePartiesData()

export async function RetrievePartiesData(FirstParty,SecondParty){
    //console.log("FunctionRand")
    
    /*
    let response= await fetch("ExampleTrainers.json")
    let data= await response.json()
  
    let MovesParty1=(data[0])
    let MovesParty2=(data[1])
    */

    let GoodPokemonName

    let MovesParty1=FirstParty
   
    let MovesParty2=SecondParty
    
    for(let i in MovesParty2){
      
      //console.log(MovesParty2[i])
      for(let pokemon in MovesParty2[i]){
        //console.log(pokemon)
        for (let move in MovesParty2[i][pokemon]){
         
          //console.log(MovesParty2[i][pokemon][move])
          //console.log(typeof move)
          if(typeof MovesParty2[i][pokemon][move]=="string"){
            //console.log(MovesParty2[i][pokemon][move])

          
         let MoveName=(MovesParty2[i][pokemon][move])
         //console.log(MoveName)
         let PartOfMoveName=MoveName.split("-")
         MoveName=""
         for(let word in PartOfMoveName){
          word=PartOfMoveName[word]
          word= word.charAt(0).toUpperCase()+word.slice(1)
          //console.log(word)
          MoveName=MoveName+" "+word
          MoveName=MoveName.trim()
         }
         //console.log(MoveName)
         MovesParty2[i][pokemon][move]=(MoveName)

        }
        
        }
      }
    }

    let PokemonParty1=[]
    let PokemonParty2=[]

    //console.log(PokemonParty2)
    /*
    for(let i in PokemonParty1){
        console.log(PokemonParty1[i])
        for(let key in PokemonParty1[i]){
            console.log(key)
            PokemonParty1[i][key].push(55)
            console.log(PokemonParty1[i][key])
        }
    }
    */

    
    
    
    for(let i in MovesParty1){
        
       //console.log(PokemonParty2[i])
        
       for(let key in MovesParty1[i]){

        let PokemonApi=MovesParty1[i][key][4]
        MovesParty1[i][key][4]

        MovesParty1[i][key].pop()
        
        GoodPokemonName={}
        
        GoodPokemonName.Level=null
        //console.log(CopyPokemonApi)
       
        if(GoodPokemonName!=undefined){
            let Stats= await GettingStatsData(PokemonApi);
            [PokemonSpriteFront,PokemonSpriteBack,Hp,Att,Def,Sp_Att,Sp_Def,Speed,PokemonPrimaryType,PokemonSecondaryType]= Stats
            GoodPokemonName.SpriteFront=(PokemonSpriteFront)
            GoodPokemonName.SpriteBack=(PokemonSpriteBack)
           
            GoodPokemonName.Hp=Hp
            GoodPokemonName.MaxHp=Hp
            GoodPokemonName.Attack=Att
            GoodPokemonName.Defense=Def
            GoodPokemonName.Sp_Attack=Sp_Att
            GoodPokemonName.Sp_Defense=Sp_Def
            GoodPokemonName.Speed=Speed
            GoodPokemonName.Primary_Type=PokemonPrimaryType
            GoodPokemonName.Secondary_Type=PokemonSecondaryType

            //console.log( PokemonParty1[i][key])
            //console.log(PokemonParty1[i][key])
            PartyCards1= Pokemon_Display1.querySelectorAll(".PartyCard")
            
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
         
            let CopyKey= key.split("_")[0]
            //PartyCards1[i].textContent=""
            
            let PartyCardLists = PartyCards1[i].querySelectorAll("li");


            // Loop through each list and remove it
            PartyCardLists.forEach((list)=> {
                list.remove();
            });
            
            PartyCards1[i].querySelector("h4").textContent=CopyKey
            PartyCards1[i].querySelector("img").src = PokemonSpriteFront
            
            PokemonParty1.push(GoodPokemonName)
            
        }
        
            else{
                throw new Error("Undef")
                
            }

        }
    }

    //console.log(MovesParty2)
    for(let i in MovesParty2){
        
        
         
      for(let key in MovesParty2[i]){
        PokemonApi= ((key.split("_"))[0])
        //console.log(MovesParty2[i][key])
        let CopyPokemonApi=PokemonApi
        CopyPokemonApi={}
        CopyPokemonApi.Level=(MovesParty2[i][key][4])
       
        if(PokemonApi!=undefined){
            let Stats= await GettingStatsData(PokemonApi);
            [PokemonSpriteFront,PokemonSpriteBack,Hp,Att,Def,Sp_Att,Sp_Def,Speed,PokemonPrimaryType,PokemonSecondaryType]= Stats
            CopyPokemonApi.SpriteFront=(PokemonSpriteFront)
            CopyPokemonApi.SpriteBack=(PokemonSpriteBack)
           
            CopyPokemonApi.Hp=Hp
            CopyPokemonApi.MaxHp=Hp
            CopyPokemonApi.Attack=Att
            CopyPokemonApi.Defense=Def
            CopyPokemonApi.Sp_Attack=Sp_Att
            CopyPokemonApi.Sp_Defense=Sp_Def
            CopyPokemonApi.Speed=Speed
            CopyPokemonApi.Primary_Type=PokemonPrimaryType
            CopyPokemonApi.Secondary_Type=PokemonSecondaryType

            //console.log( PokemonParty2[i][key])
            //console.log(PokemonParty2[i][key])
            PartyCards2= Pokemon_Display2.querySelectorAll(".PartyCard")
            
            function delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            let CopyKey= key.split("_")[0]
            
            PartyCards2[i].querySelector("h4").textContent=CopyKey
            PartyCards2[i].querySelector("img").src = PokemonSpriteFront
            
            PokemonParty2.push(CopyPokemonApi)
            //console.log(PokemonParty2)
        }
        
        else{
            throw new Error("Undef")
            
        }
        
    
         
     }
    }

    //console.log(PokemonParty1)
    //console.log(PokemonParty2)

    let PokemonParty=[MovesParty1,MovesParty2,PokemonParty1,PokemonParty2]
    
    return PokemonParty

    
    //MovingPokeCard()
}
//MovingPokeCard()
//RetrievePartiesData()

PokemonIntro.style.display="none"


//GettingData("charizard")

export async function GettingStatsData(PokemonApi){
    //console.log(card)
    //console.log(PokemonApi)
    
    try{
        PokemonApi=PokemonApi.toLowerCase()
        
        PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`
        
        
        response= await fetch(PokemonUrl);
        data= await response.json()
        MoveSet=[]
        
        //console.log(data)
        //console.log(data.sprites.back_default)
        PokemonSpriteFront=(data.sprites.front_default)
        PokemonSpriteBack=(data.sprites.back_default)

        PokemonPrimaryType= data.types[0].type.name;
        if(data.types[1]==undefined){
            PokemonSecondaryType=""
        }
        else{
            PokemonSecondaryType= data.types[1].type.name;
        }
        
        const[{base_stat:Hp},{base_stat:Att},{base_stat:Def},{base_stat:Sp_Att},{base_stat:Sp_Def},{base_stat:Speed}] = data.stats
        PokemonHpStat=Hp
        PokemonAttStat=Att
        PokemonDefStat=Def
        PokemonSpAttStat=Sp_Att
        PokemonSpDefStat=Sp_Def
        PokemonSpeedStat=Speed
    
        
        

        if(PokemonSpriteBack==null){
            PokemonSpriteBack=PokemonSpriteFront
        }
        
    }
    catch(error){
        /*
        try{
            
            console.log(PokemonNumber)
            //console.log(PokemonApi)
            PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonNumber}`  
            
            response= await fetch(PokemonUrl);
            data= await response.json()
            
            PokemonSpriteFront=(data.sprites.front_default)
            PokemonSpriteBack=(data.sprites.front_default)

            if(PokemonSpriteBack==null){
                PokemonSpriteBack=PokemonSpriteFront
            }
            
            //console.log([PokeBaseName,data.stats])
        }
        catch(error){
            console.log(error)
            PokemonSpriteFront="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/213.png"
            PokemonSpriteBack="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/213.png"
        }
            */
    
   console.log(error)
    }

    let PokemonStatData=[PokemonSpriteFront,PokemonSpriteBack,PokemonHpStat,PokemonAttStat,PokemonDefStat,PokemonSpAttStat,PokemonSpDefStat,PokemonSpeedStat,PokemonPrimaryType,PokemonSecondaryType]
   
    return PokemonStatData


}


export async function DisplayFightCards(Moves1) {
  return new Promise((resolve) => {

    let key1=(Object.keys(Moves1)[0])

    CircleFight.style.pointerEvents="none"
    CircleInput.style.pointerEvents="none"
    MedicineBag.style.pointerEvents="none"
    PokemonBag.style.pointerEvents="none"
    


   
    //console.log("FunctionRand")
    //console.log(Moves1)
    GameInputCont.style.display="none"
    TempGameInputCont.style.display="block"
    TempGameInputCont.textContent=""
    TempGameInputCont.style.backgroundColor="rgba(33, 33, 33, 0.756)"
    TempGameInputCont.style.opacity='1'
    TempGameInputCont.style.display="grid"

    
    TempGameInputCont.style.gap = '20px';
    TempGameInputCont.style.padding="20px"
    
    
    let AllMovesCont = document.createElement('div');
        AllMovesCont.classList.add('AllMovesContClass');
        TempGameInputCont.appendChild(AllMovesCont)

    let NoPP=true
    let key=(Object.keys(Moves1)[0])
 
    
    for (let i = 0; i < 4; i++){
      if(Moves1[key][i].pp>0){
        NoPP=false
      }
    }
    
    if(NoPP==true){
      Moves1[key][0]={
        Name:"Struggle",
        pp:100,
        damage_type:"status",
        Maxpp:100,
        priority:0,
        accuracy:100,
        power:40,
        type:"normal"
      }
    }

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

                PokemonMovesCard.style.pointerEvents="none"

                
            }
            else{

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
                /*
                let PartOfMoveName=Moves1[i].Name.split("-")
                // console.log(PartOfMoveName)
                 Moves1[i][move]=""
                 for(let word in PartOfMoveName){
                     word=PartOfMoveName[word]
                     word= word.charAt(0).toUpperCase()+word.slice(1)
                     //console.log(word.charAt(0).toUpperCase())
                     Moves1[i].Name=Moves1[i].Name+" "+word
                 }*/
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

      document.querySelectorAll(".PokemonMovesCardCont").forEach((card,index)=>{
        //console.log(index)
        
        card.addEventListener("click",async ()=>{
                 
            
            //console.log(index)
            //console.log(Moves1[key1])
            //console.log(Moves1[key1][index])
            
      
            
            document.querySelectorAll(".PokemonMovesCardCont").forEach((card)=>{
                card.style.pointerEvents="none"
            })
            
            
            
            if(Moves1[key1][index].pp>0){

              resolve(["Fight",index])
            }
            else{

            CircleFight.style.pointerEvents="auto"
            CircleInput.style.pointerEvents="auto"
            MedicineBag.style.pointerEvents="auto"
            PokemonBag.style.pointerEvents="auto"

              TempGameInputCont.textContent=""
              TempGameInputCont.style.display="none"
              GameInputCont.style.display="block"
              resolve(["",index])
            }
           
            
           
          })
      })

    
  })
}

export async function DisplayBag(Purpose,Bag1) {
  return new Promise((resolve) => {
  

  let HealMove=""
  if(Purpose=="Heal"){
    GameInputCont.style.display="none"
    TempGameInputCont.style.display="flex"
    TempGameInputCont.textContent=""
    TempGameInputCont.style.backgroundColor="rgba(33, 33, 33, 0.756)"
    TempGameInputCont.style.opacity='1'
    TempGameInputCont.style.display="grid"

    TempGameInputCont.style.justifyContent="center"
    TempGameInputCont.style.gridTemplateRows = 'repeat(2, 30%)';
    TempGameInputCont.style.gridTemplateColumns = 'repeat(1, 50%)';
    TempGameInputCont.style.gap = '50px';
    TempGameInputCont.style.padding="20px"

    for (let i = 1; i <= 2; i++) {
      let SwapPokemonCard = document.createElement('div');
      SwapPokemonCard.classList.add('ClassHealCard');

      if(i==1){
        SwapPokemonCard.textContent=`Revive: ${Bag1.RevivePP} Left`
      }
      if(i==2){
        SwapPokemonCard.textContent=`Heal: ${Bag1.HealPP} Left`
      }

      TempGameInputCont.appendChild(SwapPokemonCard);
        
      SwapPokemonCard.addEventListener("click",()=>{
        
        if(i==1){
          HealMove="1_Revive"
        }
        if(i==2){
          HealMove="1_Heal"
        }

        resolve(HealMove)
        TempGameInputCont.textContent=""
        TempGameInputCont.style.display="none"
        GameInputCont.style.display="block"
      })
  
    }
  }
})
  
  
  
  
}

export async function DisplayParty(Purpose,PartyData,MovesData,ActivePokemonNumber,Bag1){
 

  return new Promise((resolve) => {
    
    
    Purpose=Purpose.split("_")[1]

    let SwappedPokemonNumber

    

    GameInputCont.style.display="none"
    TempGameInputCont.style.display="block"
    TempGameInputCont.textContent=""
    TempGameInputCont.style.backgroundColor="rgba(33, 33, 33, 0.756)"
    TempGameInputCont.style.opacity='1'
    TempGameInputCont.style.display="grid"

    TempGameInputCont.style.gridTemplateRows = 'repeat(2, 1fr)';
    TempGameInputCont.style.gridTemplateColumns = 'repeat(3, 1fr)';
    TempGameInputCont.style.gap = '20px';
    TempGameInputCont.style.padding="20px"
    
    for (let i = 0; i < 6; i++) {
        let SwapPokemonCard = document.createElement('div');
        SwapPokemonCard.classList.add('ClassPokemonCard');

        for(let j=0; j<4; j++){
            
            let PartOfCard= document.createElement('div');
           
            PartOfCard.classList.add('ClassPartOfCard');
            
            

            if(j==0){
              PartOfCard.textContent=""
             
              let DisplaySprite = document.createElement('img');
                
              
              if(PartyData[i]!=undefined){
                DisplaySprite.classList.add("DisplayCardSprite")
                 DisplaySprite.src = PartyData[i].SpriteFront;  // Initial image source
                DisplaySprite.alt = '';
              }
              else{
                PartOfCard.textContent = ""
                SwapPokemonCard.style.backgroundColor="grey"
                SwapPokemonCard.style.pointerEvents="none"
              }
              PartOfCard.appendChild(DisplaySprite);
              
            }
            if(j==1){
              let DisplayPokemonName = document.createElement('div');
              let DisplayHealth = document.createElement('div');
              if(PartyData[i]!=undefined){
                DisplayPokemonName.classList.add("DisplayPokemonName")
                DisplayPokemonName.textContent=(PartyData[i].Name)
                
                DisplayHealth.classList.add("DisplayHealthBar")
                //CreateClosePokemonInfo(PartyData[i].Name,PartyData[i].Hp,PartyData[i].MaxHp,DisplayHealth)
               
                
              }
              else{
                PartOfCard.textContent = ""
                DisplayHealth.textContent=""
               
              }
              PartOfCard.appendChild(DisplayPokemonName);
              PartOfCard.appendChild(DisplayHealth);
              
               
            }
            if(j==2){
              let DisplayLevel = document.createElement('div');
              if(PartyData[i]!=undefined){
                DisplayLevel.classList.add("DisplayLevel")
                //DisplayPokemonName.textContent=(PartyData[i].Level)
                if(window.innerWidth>778){
                  
                  DisplayLevel.textContent=`Level: ${PartyData[i].Level}`
                  DisplayLevel.style.fontSize="1rem"
                }
                else{
                  DisplayLevel.textContent=`Lvl: ${PartyData[i].Level}`
                  DisplayLevel.style.fontSize="0.9rem"
                }

                window.addEventListener('resize', ()=>{
                  if(window.innerWidth>778){
                    DisplayLevel.textContent=`Level: ${PartyData[i].Level}`
                    DisplayLevel.style.fontSize="1rem"
                  }
                  else{
                    DisplayLevel.textContent=`Lvl: ${PartyData[i].Level}`
                    DisplayLevel.style.fontSize="0.9rem"
                  }
                })
                
                
              }
              else{
                PartOfCard.textContent = ""
                DisplayLevel.textContent=""
               
              }
              PartOfCard.appendChild(DisplayLevel);
            }
            if(j==3){
              let DisplayHp = document.createElement('div');
              if(PartyData[i]!=undefined){
                DisplayHp.classList.add("DisplayHp")
                //DisplayPokemonName.textContent=(PartyData[i].Level)
                //console.log(PartyData[i])
                DisplayHp.textContent=`Hp: ${PartyData[i].Hp}/${PartyData[i].MaxHp}`
                
                if(window.innerWidth>778){
                  DisplayHp.style.fontSize="1rem"
                }
                else{
                  DisplayHp.style.fontSize="0.8rem"
                }

                window.addEventListener('resize', ()=>{
                  if(window.innerWidth>778){
                    DisplayHp.style.fontSize="1rem"
                  }
                  else{
                    DisplayHp.style.fontSize="0.8rem"
                  }
                })
                
              }
              else{
                PartOfCard.textContent = ""
                DisplayHp.textContent=""
               
              }
              PartOfCard.appendChild(DisplayHp);
            }
            SwapPokemonCard.appendChild(PartOfCard)
        }
     
      
       

        if(Purpose=="Switch"){
          function SwitchClick(){
            
            if(i!=ActivePokemonNumber){
              if(PartyData[i].Hp!=0){
                
              
                Purpose=`1_Switch_${i}`
                TempGameInputCont.textContent=""
                TempGameInputCont.style.display="none"
                GameInputCont.style.display="block"
                console.log("NewSwitch")
                console.log(Purpose)
                resolve(Purpose)
              }
              
            }
            else{
              if(PartyData[ActivePokemonNumber].Hp!=0){

                Purpose=""
                
                TempGameInputCont.textContent=""
                TempGameInputCont.style.display="none"
                GameInputCont.style.display="block"
                resolve([Purpose])
              }
            }
            
            SwapPokemonCard.removeEventListener("click", SwitchClick);

          }
            SwapPokemonCard.addEventListener("click",SwitchClick)
            TempGameInputCont.appendChild(SwapPokemonCard);
       
        }
      



        if(Purpose=="Revive"){
         
          function ReviveClick(){
            
            if(PartyData[i].Hp==0){
              Bag1.RevivePP-=1
              Purpose=`1_Revive_${i}`
              TempGameInputCont.textContent=""
              TempGameInputCont.style.display="none"
              GameInputCont.style.display="block"
              resolve([Purpose,Bag1])
            }
            else{
            
              Purpose=""
             
              TempGameInputCont.textContent=""
              TempGameInputCont.style.display="none"
              GameInputCont.style.display="block"
              resolve([Purpose,Bag1])
            }
            SwapPokemonCard.removeEventListener("click", ReviveClick);

          }
          if(Bag1.RevivePP>0){
           
            SwapPokemonCard.addEventListener("click",(ReviveClick))
          
      
          }
          else{
           
            Purpose=""
           
            TempGameInputCont.textContent=""
            TempGameInputCont.style.display="none"
            GameInputCont.style.display="block"
            resolve([Purpose,Bag1])

          }
          
          
          TempGameInputCont.appendChild(SwapPokemonCard);
        }


        function HealClick(){
          
          if(PartyData[i].Hp!=PartyData[i].MaxHp){
            if(PartyData[i].Hp!=0){
              Bag1.HealPP-=1
             
              Purpose=`1_Heal_${i}`
              TempGameInputCont.textContent=""
            TempGameInputCont.style.display="none"
            GameInputCont.style.display="block"
            }
            else{
              Purpose=""
             
              TempGameInputCont.textContent=""
              TempGameInputCont.style.display="none"
              GameInputCont.style.display="block"
              resolve([Purpose])
              
            }

          }
            
          else{
            Purpose=""
           
            TempGameInputCont.textContent=""
            TempGameInputCont.style.display="none"
            GameInputCont.style.display="block"
            resolve([Purpose])
            
            

          }
          SwapPokemonCard.removeEventListener("click",HealClick)
  
          resolve([Purpose,Bag1])
        }

        if(Purpose=="Heal"){
         
          if(Bag1.HealPP>0){
           
            SwapPokemonCard.addEventListener("click",(HealClick))
          
      
          }
          else{
           
            Purpose=""
            TempGameInputCont.textContent=""
            TempGameInputCont.style.display="none"
            GameInputCont.style.display="block"
            resolve([Purpose,Bag1])

          }
          
          
        
          
        TempGameInputCont.appendChild(SwapPokemonCard);
        
        

    }

  }
})

    


}

//PokemonBag.addEventListener("click",DisplayParty)

//DisplayParty("Switch")

//DisplayParty("Heal")

export function CreateClosePokemonInfo(Name,CurrentHp, MaxHp,HealthLocation){

  let PercentHp= CurrentHp/MaxHp*100
 
    //console.log(PercentHp)
    if(HealthLocation==undefined){
      HealthLocation=document.getElementById("PokemonCloseInfo")

    }
    //let HealthLocation=document.getElementById("PokemonCloseInfo")

    document.getElementById("PokemonCloseName").textContent=Name
    document.getElementById("PokemonCloseHealth").textContent=`${CurrentHp}/${MaxHp} Hp`

    
    let template = HealthBarClone
      // Import and clone the template content
    let clone = document.importNode(template.content, true);

      
      // Append the cloned content to the container
      //clone.querySelector(".HealthBarCont").style.height="10%"
      //clone.querySelector(".HealthBarCont").style.width="80%"
      
      clone.querySelector(".HealthBarCont").style.width="80%"
      //clone.querySelector(".HealthBarCont").style.height="30%"

      clone.querySelector(".HealthBar").style.width=`${PercentHp}%`
      clone.querySelector(".HealthBar").style.height="100%"
      clone.querySelector(".HealthOverlay").style.width=`${PercentHp}%`
      
      if(PercentHp>=50){
        clone.querySelector(".HealthBar").style.backgroundColor="green"
      }
      else if(PercentHp>=20){
        clone.querySelector(".HealthBar").style.backgroundColor="orange"
      }
      else{
        clone.querySelector(".HealthBar").style.backgroundColor="red"
    
      }
      //console.log("Added")
     // console.log(HealthLocation.offsetHeight)
     
      let ReferenceNode= HealthLocation.children[1]
      HealthLocation.insertBefore(clone,ReferenceNode);
     setTimeout(()=>{

     
        document.querySelector(".HealthBarCont").style.height="30%"
        ResizePokemonInfo()
      },0)
      
      //console.log("Resized")
      window.addEventListener('resize', ()=>{
       ResizePokemonInfo()
    })
    function ResizePokemonInfo(){
      document.getElementById("PokemonCloseName").style.transition="1s"
      document.getElementById("PokemonCloseHealth").style.transition="1s"
        let Heightpx= (HealthLocation.clientHeight)
        
        if(window.innerWidth>778){
           document.getElementById("PokemonCloseHealth").style.display="block"
           //document.querySelector(".HealthBarCont").style.height="50%"
            document.getElementById("PokemonCloseName").style.fontSize=`${Heightpx*0.45}px`
           document.getElementById("PokemonCloseHealth").style.fontSize=`${Heightpx*0.4}px`
           
           document.querySelectorAll(".HealthBarCont").forEach((HealthBar)=>{
            
            HealthBar.style.height="30%"
         
           })
          }
        else{
          document.getElementById("PokemonCloseName").style.fontSize=``
          document.getElementById("PokemonCloseHealth").style.fontSize=``
         
           document.getElementById("PokemonCloseHealth").style.display="block"
           
        }
          
           
            // document.getElementById("HealthBarCont").style.height=`${90}px`
           //console.log(window.innerWidth)
        
    }
    
}

export function RepeatClosePokemonInfo(Name,CurrentHp, MaxHp,HealthLocation){
  let PercentHp= CurrentHp/MaxHp*100
 
    //console.log(PercentHp)
    if(HealthLocation==undefined){
      HealthLocation=document.getElementById("PokemonCloseInfo")

    }
    //let HealthLocation=document.getElementById("PokemonCloseInfo")

    document.getElementById("PokemonCloseName").textContent=Name
    document.getElementById("PokemonCloseHealth").textContent=`${CurrentHp}/${MaxHp} Hp`


      
      document.querySelector(".HealthBarCont").style.width="80%"
      //clone.querySelector(".HealthBarCont").style.height="30%"

      document.querySelector(".HealthBar").style.width=`${PercentHp}%`
      document.querySelector(".HealthBar").style.height="100%"
      document.querySelector(".HealthOverlay").style.width=`${PercentHp}%`
      
      if(PercentHp>=50){
        document.querySelector(".HealthBar").style.backgroundColor="green"
      }
      else if(PercentHp>=20){
        document.querySelector(".HealthBar").style.backgroundColor="orange"
      }
      else{
        document.querySelector(".HealthBar").style.backgroundColor="red"
    
      }
      //console.log("Added")
     // console.log(HealthLocation.offsetHeight)
     
      
     setTimeout(()=>{

     
        document.querySelector(".HealthBarCont").style.height="30%"
        ResizePokemonInfo()
      },0)
      
      //console.log("Resized")
      window.addEventListener('resize', ()=>{
       ResizePokemonInfo()
    })
    function ResizePokemonInfo(){
        let Heightpx= (HealthLocation.clientHeight)
        
        if(window.innerWidth>778){
           document.getElementById("PokemonCloseHealth").style.display="block"
           document.querySelector(".HealthBarCont").style.height="30%"
        }
        else{
           document.getElementById("PokemonCloseHealth").style.display="none"
        }
            //document.getElementById("PokemonCloseName").style.fontSize=`${Heightpx*0.5}px`
           //document.getElementById("PokemonCloseHealth").style.fontSize=`${Heightpx*0.5}px`
           
           document.querySelectorAll(".HealthBarCont").forEach((HealthBar)=>{
            HealthBar.style.height="30%"
         
           })
            // document.getElementById("HealthBarCont").style.height=`${90}px`
           //console.log(window.innerWidth)
        
    }
    
}


export function RepeatFarPokemonInfo(Name,CurrentHp, MaxHp,HealthLocation){
  let PercentHp= CurrentHp/MaxHp*100
 
    //console.log(PercentHp)
    if(HealthLocation==undefined){
      HealthLocation=document.getElementById("PokemonFarInfo")

    }
    //let HealthLocation=document.getElementById("PokemonFarInfo")

    document.getElementById("PokemonFarName").textContent=Name
    document.getElementById("PokemonFarHealth").textContent=`${CurrentHp}/${MaxHp} Hp`


      
      document.querySelector(".HealthBarCont").style.width="80%"
      //clone.querySelector(".HealthBarCont").style.height="30%"

      document.querySelector(".HealthBar").style.width=`${PercentHp}%`
      document.querySelector(".HealthBar").style.height="100%"
      document.querySelector(".HealthOverlay").style.width=`${PercentHp}%`
      
      if(PercentHp>=50){
        document.querySelector(".HealthBar").style.backgroundColor="green"
      }
      else if(PercentHp>=20){
        document.querySelector(".HealthBar").style.backgroundColor="orange"
      }
      else{
        document.querySelector(".HealthBar").style.backgroundColor="red"
    
      }
      //console.log("Added")
     // console.log(HealthLocation.offsetHeight)
     
      
     setTimeout(()=>{

     
        document.querySelector(".HealthBarCont").style.height="30%"
        ResizePokemonInfo()
      },0)
      
      //console.log("Resized")
      window.addEventListener('resize', ()=>{
       ResizePokemonInfo()
    })
    function ResizePokemonInfo(){
        let Heightpx= (HealthLocation.clientHeight)
        
        if(window.innerWidth>778){
           document.getElementById("PokemonFarHealth").style.display="block"
           document.querySelector(".HealthBarCont").style.height="30%"
        }
        else{
           document.getElementById("PokemonFarHealth").style.display="none"
        }
            //document.getElementById("PokemonFarName").style.fontSize=`${Heightpx*0.5}px`
           //document.getElementById("PokemonFarHealth").style.fontSize=`${Heightpx*0.5}px`
           
           document.querySelectorAll(".HealthBarCont").forEach((HealthBar)=>{
            HealthBar.style.height="30%"
         
           })
            // document.getElementById("HealthBarCont").style.height=`${90}px`
           //console.log(window.innerWidth)
        
    }
    
}


export async function ChangeClosePokemonInfo(Name,FinalHp, PreviousHp, MaxHp,Message2){
  return new Promise((resolve)=>{  

    if(Message2==undefined){
      Message2=""
    }
  
  let CurrentHp=PreviousHp
    let HealthLocation=document.getElementById("PokemonCloseInfo")
    
    
  

    document.getElementById("PokemonCloseName").textContent=Name
       
      // Append the cloned content to the container
      //clone.querySelector(".HealthBarCont").style.height="10%"
      //clone.querySelector(".HealthBarCont").style.width="80%"
      
      
     
      HealthLocation.querySelector(".HealthOverlay").style.width=`${PreviousHp/MaxHp*100}%`
      HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`grey`
      let HealthDifference=PreviousHp-FinalHp 
      
      
     
      HealthDifference=Math.abs(HealthDifference)
      let Intervalspeed=10+500/HealthDifference
      let Time=0
      
     // let Intervalspeed=100
      let intervalId = setInterval(function() {
        //console.log("This will run every 1 second");
        Time+=Intervalspeed
       
        if(PreviousHp>FinalHp){
          CurrentHp=CurrentHp-1
        }
        if(PreviousHp<FinalHp){
          CurrentHp=CurrentHp+1
          
        }
        
        let PercentHp=CurrentHp/MaxHp*100
        document.getElementById("PokemonCloseHealth").textContent=`${CurrentHp}/${MaxHp} Hp`

        HealthLocation.querySelector(".HealthBar").style.width=`${CurrentHp/MaxHp*100}%`
        
        if(PercentHp>=50){
          HealthLocation.querySelector(".HealthBar").style.backgroundColor="green"
        }
        else if(PercentHp>=20){
          HealthLocation.querySelector(".HealthBar").style.backgroundColor="orange"
        }
        else{
          HealthLocation.querySelector(".HealthBar").style.backgroundColor="red"
      
        }
        if(CurrentHp<=0){
          if(FinalHp==0){
            clearInterval(intervalId)

            HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`rgb(243,243,243)`
            GameMessage2.innerHTML=Message2 

            resolve()
          }
          
        }

        if(CurrentHp==MaxHp){
          clearInterval(intervalId)
          HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`rgb(243,243,243)`
          GameMessage2.innerHTML=Message2 

          resolve()
          
        }
      
        if(CurrentHp==FinalHp){
          clearInterval(intervalId)

          HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`rgb(243,243,243)`
          GameMessage2.innerHTML=Message2 

          resolve()
        }
      
      
      
      }, Intervalspeed); // 1000 milliseconds = 1 second
      

        
      //console.log("Added")
     // console.log(HealthLocation.offsetHeight)
   
     
    })
}


export async function CreateFarPokemonInfo(Name,CurrentHp, MaxHp){
    let PercentHp= CurrentHp/MaxHp*100
   
    let HealthLocation=document.getElementById("PokemonFarInfo")
  
    document.getElementById("PokemonFarName").textContent=Name

    document.getElementById("PokemonFarHealth").textContent=`${CurrentHp}/${MaxHp} Hp`
    
    let template = HealthBarClone
      // Import and clone the template content
    let clone = document.importNode(template.content, true);

    
      // Append the cloned content to the container
      //clone.querySelector(".HealthBarCont").style.height="10%"
      //clone.querySelector(".HealthBarCont").style.width="80%"
      clone.querySelector(".HealthBarCont").style.height="30%"
      clone.querySelector(".HealthBarCont").style.width="80%"
      
      clone.querySelector(".HealthOverlay").style.width=`${PercentHp}%`
      
      clone.querySelector(".HealthBar").style.width=`${PercentHp}%`

      if(PercentHp>=50){
        clone.querySelector(".HealthBar").style.backgroundColor="green"
      }
      else if(PercentHp>=20){
        clone.querySelector(".HealthBar").style.backgroundColor="orange"
      }
      else{
        clone.querySelector(".HealthBar").style.backgroundColor="red"
    
      }
      //console.log("Added")
      //console.log(HealthLocation.offsetHeight)
      let ReferenceNode= HealthLocation.children[1]
      HealthLocation.insertBefore(clone,ReferenceNode);

      ResizePokemonInfo()
      //console.log("Resized")
      window.addEventListener('resize', ()=>{
       ResizePokemonInfo()
    })
    function ResizePokemonInfo(){
        let Heightpx= (HealthLocation.clientHeight)

        document.getElementById("PokemonFarName").style.transition="1s"
        document.getElementById("PokemonFarHealth").style.transition="1s"
          
          if(window.innerWidth>778){
             document.getElementById("PokemonFarHealth").style.display="block"
             document.querySelector(".HealthBarCont").style.height="30%"
              document.getElementById("PokemonFarName").style.fontSize=`${Heightpx*0.45}px`
             document.getElementById("PokemonFarHealth").style.fontSize=`${Heightpx*0.4}px`
             
            }
          else{
            document.getElementById("PokemonFarName").style.fontSize=``
            document.getElementById("PokemonFarHealth").style.fontSize=``
           
             document.getElementById("PokemonFarHealth").style.display="block"
             
          }
    }
    
}

export async function ChangeFarPokemonInfo(Name,FinalHp, PreviousHp, MaxHp, Message2){
  return new Promise((resolve)=>{

    if(Message2==undefined){
      Message2=""
    }
  let CurrentHp=PreviousHp
    let HealthLocation=document.getElementById("PokemonFarInfo")
    
    
  

    document.getElementById("PokemonFarName").textContent=Name
       
      // Append the cloned content to the container
      //clone.querySelector(".HealthBarCont").style.height="10%"
      //clone.querySelector(".HealthBarCont").style.width="80%"
      
      
     
      HealthLocation.querySelector(".HealthOverlay").style.width=`${PreviousHp/MaxHp*100}%`
      HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`grey`
      let HealthDifference=PreviousHp-FinalHp 
      
      
     
      HealthDifference=Math.abs(HealthDifference)
      let Intervalspeed=10+500/HealthDifference

      let Time=0
     // let Intervalspeed=100
      let intervalId = setInterval(function() {

        Time+=Intervalspeed
        
        //console.log("This will run every 1 second");
       
        if(PreviousHp>FinalHp){
          CurrentHp=CurrentHp-1
        }
        if(PreviousHp<FinalHp){
          CurrentHp=CurrentHp+1
          
        }

        
        let PercentHp=CurrentHp/MaxHp*100
        document.getElementById("PokemonFarHealth").textContent=`${CurrentHp}/${MaxHp} Hp`

        HealthLocation.querySelector(".HealthBar").style.width=`${CurrentHp/MaxHp*100}%`
        
        if(PercentHp>=50){
          HealthLocation.querySelector(".HealthBar").style.backgroundColor="green"
        }
        else if(PercentHp>=20){
          HealthLocation.querySelector(".HealthBar").style.backgroundColor="orange"
        }
        else{
          HealthLocation.querySelector(".HealthBar").style.backgroundColor="red"
      
        }
        if(CurrentHp==0){
          clearInterval(intervalId)

          HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`rgb(243,243,243)`
          GameMessage2.innerHTML=Message2 
     
          resolve()
        }

        if(CurrentHp==MaxHp){
          clearInterval(intervalId)
  
          HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`rgb(243,243,243)`
          GameMessage2.innerHTML=Message2 
       
          resolve()
        }
      
        if(CurrentHp==FinalHp){
          clearInterval(intervalId)

          
          HealthLocation.querySelector(".HealthOverlay").style.backgroundColor=`rgb(243,243,243)`
          GameMessage2.innerHTML=Message2 

          resolve()
        }
      
      
      
      }, Intervalspeed); // 1000 milliseconds = 1 second
      

        
      //console.log("Added")
     // console.log(HealthLocation.offsetHeight)
   
     
    })
}


