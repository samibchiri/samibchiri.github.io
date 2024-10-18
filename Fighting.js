import {TypeEffectiveness,UserDmgCalc} from './dmg_calc.js'
import {ChangeClosePokemonInfo,ChangeFarPokemonInfo} from './PrepFight.js'

import {CloseAttack,FarAttack,ReturnClosePokemon,ReturnFarPokemon,ThrowClosePokemon,ThrowFarPokemon,ThrowCloseHeal,ThrowFarHeal,ThrowPartyCloseHeal,ThrowPartyFarHeal,ThrowPartyCloseRevive,ThrowPartyFarRevive,CloseAttackMiss,FarAttackMiss} from './AttackAnimations.js'

let PokemonClose=document.getElementById("PokemonClose")
let PokemonFar=document.getElementById("PokemonFar")

let GameMessage1= document.querySelector("#GameMessage1")
let GameMessage2= document.querySelector("#GameMessage2")


let Message2
export async function Attack(Move,Attacker,Defender,Location) {
    let attacked=false

   GameMessage1.textContent=`${Attacker.Name} Used ${Move.Name}`
    GameMessage2.textContent=""
    
    while(!attacked){
        if(Move.pp>0){
            Move.pp=Move.pp-1
            attacked=true
            if(Math.random()>1-Move.accuracy/100){
        
                let Result= await UserDmgCalc(Move,Attacker,Defender)
                
                let Damage_Dealt=Result[0]

                await new Promise((resolve) => {
                    if(Location=="Close"){
                        if(Damage_Dealt>0){
                            CloseAttack()
                        }
                        else{
                            CloseAttackMiss()
                        }
                        
                    }
                    else if (Location=="Far"){
                        if(Damage_Dealt>0){
                            FarAttack()
                        }
                        else{
                            FarAttackMiss()
                        }
                    }
                    else{
                    }
                    setTimeout(() => {
                        if(Damage_Dealt>0){
                            GameMessage2.textContent="But he Missed!"
                        }
                        resolve();
                    }, 1600);
                });

                Message2=Result[1]

                //console.log(Defender)
                
                //console.log(Damage_Dealt)
                Defender.Hp=Defender.Hp-Damage_Dealt
                //console.log(Defender)
                if(Defender.Hp<=0){
                    Defender.Hp=0
                    //console.log(`${Defender.Name} fainted`)
                }
            }
            
            else{
                await new Promise((resolve) => {
                if(Location=="Close"){
                    CloseAttackMiss()
                }
                else if (Location=="Far"){
                   FarAttackMiss()
                  
                }
                else{
                    console.log("No Location")
                }
                setTimeout(() => {
                    GameMessage2.textContent="But he Missed!"
                    resolve();
                }, 1600);
                
            });
            }
            
        }
        else{
           // console.log("No pp left, use other move")
        }
    }
    
    

    return [Move,Defender]
}

let ActivePokemon1
let ActivePokemon2

export async function PokemonTurn(Purpose,ChosenMove1,ActivePokemon1,ChosenMove2,ActivePokemon2,Party1,ActivePokemonNumber1,Bag1,Bag2,Party2){
    

    return new Promise(async (resolve) => {


    let PokemonCloseSprite=ActivePokemon1.SpriteBack
    PokemonClose.src=PokemonCloseSprite

    
    let PokemonFarSprite=ActivePokemon2.SpriteFront
    PokemonFar.src=PokemonFarSprite

    let Result=""
    let PreviousHp1=ActivePokemon1.Hp
    let PreviousHp2=ActivePokemon2.Hp
    
 
    async function ChooseMove2(Move,ActivePokemon2,ActivePokemon1,Party2,Bag2){
    //console.log(ActivePokemon1)
    
    let ActionUsed=false
    let Action
    let ChanceNumber=(2*(0.5-ActivePokemon2.Hp/ActivePokemon2.MaxHp))


    if(ActivePokemon2.Speed>ActivePokemon1.Speed){
        ChanceNumber=ChanceNumber-0.5
    }
    

    let Party2Length= Party2.length

    let DeathCount=0
    let HighestLevel=0
    let HighestLevelIndex=0
    for (let i in Party2){
       if(Party2[i].Hp<=0){
        DeathCount+=1
        if(Party2[i].Level>HighestLevel){
            HighestLevel=Party2[i].Level
            HighestLevelIndex=i
        }

       }
    }

    
    if(Bag2.RevivePP>0){
        

        if(DeathCount*2>=Party2Length){
            if(ActivePokemon2.Speed<ActivePokemon1.Speed){
                let Random=Math.random()
                if(Random>0.5){

                    Action="Revive2"
                    ActionUsed=true
                }
                
                
            }
            else{
      
                Action="Revive2"
                ActionUsed=true
            }
        }
    }

    if(ActionUsed==false){
        
        if(Bag2.HealPP>0){
        
            let Random= Math.random()
          

            if(ChanceNumber>Random){

                Action="Heal2"
                ActionUsed=true
            }      
        }
    }
       
    if(ActionUsed==false){
        Action=""
    }
  
   
    return Action
}
    let Action2= await ChooseMove2(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2)
    
 

    let PreviousPrio2=ChosenMove2.priority

    if(Action2!=""){
       
        ChosenMove2.priority=10
    }
    else{
      
      
    }
    
  
    if(Purpose!="Fight"){

        PreviousPrio2=ChosenMove2.priority

       
        let Aim = Purpose[1];
        
  

        if(Aim=="Heal"){
 
            Party1[Purpose[2]].Hp=Party1[Purpose[2]].Hp+(Party1[Purpose[2]].MaxHp- Party1[Purpose[2]].Hp)*0.75
            Party1[Purpose[2]].Hp=Math.ceil(Party1[Purpose[2]].Hp);
            
            if(ActivePokemonNumber1==Purpose[2]){

                await ThrowCloseHeal()

                await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
           
            }

            else{
                ThrowPartyCloseHeal()
            }

            PreviousHp1=ActivePokemon1.Hp;
            [ChosenMove2,ActivePokemon2,ActivePokemon1,Bag2]= await CompAttack(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2,Action2);
            (ActivePokemon1.Hp)=Math.floor(ActivePokemon1.Hp);
            await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
           
            if (ActivePokemon1.Hp<=0){
                Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
                
            }
    
            resolve([ChosenMove1,ActivePokemon1,ChosenMove2,ActivePokemon2,Result,Party1])
            
        }
        else if(Aim=="Revive"){

            Party1[Purpose[2]].Hp=Party1[Purpose[2]].Hp+(Party1[Purpose[2]].MaxHp- Party1[Purpose[2]].Hp)*0.5
            Party1[Purpose[2]].Hp=Math.ceil(Party1[Purpose[2]].Hp)
            await ThrowPartyCloseRevive()


            if(ActivePokemonNumber1==Purpose[2]){
                await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
           
            }

            PreviousHp1=ActivePokemon1.Hp;
            [ChosenMove2,ActivePokemon2,ActivePokemon1,Bag2]= await CompAttack(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2,Action2);
            (ActivePokemon1.Hp)=Math.floor(ActivePokemon1.Hp);
            
            await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
           
            if (ActivePokemon1.Hp<=0){
                Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
                
            }
            resolve([ChosenMove1,ActivePokemon1,ChosenMove2,ActivePokemon2,Result,Party1])
   
        }
        else if(Aim=="Switch"){
    
            ActivePokemon1=Party1[Purpose[2]]
           

            PreviousHp1=ActivePokemon1.Hp;
            [ChosenMove2,ActivePokemon2,ActivePokemon1,Bag2]= await CompAttack(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2,Action2);
            (ActivePokemon1.Hp)=Math.floor(ActivePokemon1.Hp);
            await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
           
            if (ActivePokemon1.Hp<=0){
                Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
                
            }

            resolve([ChosenMove1,ActivePokemon1,ChosenMove2,ActivePokemon2,Result,Party1])
   

        }
        else{
            console.log("What to Do?")
           
        }
    }
    
   else{
    
    
 
    if(ChosenMove1.priority>ChosenMove2.priority){
        
        
        if (ActivePokemon1.Hp>0){
            [ChosenMove1,ActivePokemon1,ActivePokemon2]= await YouAttack(ChosenMove1,ActivePokemon1,ActivePokemon2);
            (ActivePokemon2.Hp)=Math.floor(ActivePokemon2.Hp)

            if(ActivePokemon2.Hp!=PreviousHp2){
                await ChangeFarPokemonInfo(ActivePokemon2.Name,ActivePokemon2.Hp, PreviousHp2,ActivePokemon2.MaxHp,Message2);
                }

            if (ActivePokemon2.Hp>0){
                PreviousHp1=ActivePokemon1.Hp;
                [ChosenMove2,ActivePokemon2,ActivePokemon1,Bag2]= await CompAttack(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2,Action2,"Second");
                (ActivePokemon1.Hp)=Math.floor(ActivePokemon1.Hp);
            
                if(ActivePokemon1.Hp!=PreviousHp1){
                
                    await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
                
                }

                if(ActivePokemon1.Hp<=0){
                    Result="1_Dead"
                    Result= SwitchPokemon()
                }
            }
            else{
                Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
            }
        }
        else{
            Result="1_Dead"
            Result= SwitchPokemon()
            
        }

    

    }

    else if(ChosenMove1.priority<ChosenMove2.priority){

        ChosenMove2.priority=PreviousPrio2
        
        if(ActivePokemon2.Hp >0){
            PreviousHp1=ActivePokemon1.Hp;
            [ChosenMove2,ActivePokemon2,ActivePokemon1,Bag2]= await CompAttack(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2,Action2);
            (ActivePokemon1.Hp)=Math.floor(ActivePokemon1.Hp);
            
            if(ActivePokemon1.Hp!=PreviousHp1){
                
                await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
            
            }
            
            if (ActivePokemon1.Hp>0){
                PreviousHp2=ActivePokemon2.Hp;
                [ChosenMove1,ActivePokemon1,ActivePokemon2]= await YouAttack(ChosenMove1,ActivePokemon1,ActivePokemon2,"Second");
                (ActivePokemon2.Hp)=Math.floor(ActivePokemon2.Hp)

                if(ActivePokemon2.Hp!=PreviousHp2){
                    await ChangeFarPokemonInfo(ActivePokemon2.Name,ActivePokemon2.Hp, PreviousHp2,ActivePokemon2.MaxHp,Message2);
                    }
                if(ActivePokemon2.Hp<=0){
                    Result="2_Dead"
                    Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
                    
                }

            }
            else{
                Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
            }
    
            
        }
        else{
            Result= SwitchPokemon()
        }
    }

    else if(ActivePokemon1.Speed>=ActivePokemon2.Speed){

      
      
        if(ActivePokemon1.Hp>0){
            [ChosenMove1,ActivePokemon1,ActivePokemon2]= await YouAttack(ChosenMove1,ActivePokemon1,ActivePokemon2);
            (ActivePokemon2.Hp)=Math.floor(ActivePokemon2.Hp)
            
            if(ActivePokemon2.Hp!=PreviousHp2){
                
                await ChangeFarPokemonInfo(ActivePokemon2.Name,ActivePokemon2.Hp, PreviousHp2,ActivePokemon2.MaxHp,Message2);
            
            }
            

            if (ActivePokemon2.Hp>0){

                
                PreviousHp1=ActivePokemon1.Hp;
                [ChosenMove2,ActivePokemon2,ActivePokemon1,Bag2]= await CompAttack(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2,Action2,"Second");
                (ActivePokemon1.Hp)=Math.floor(ActivePokemon1.Hp);
            
                if(ActivePokemon1.Hp!=PreviousHp1){
                
                    await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
                
                }

                if(ActivePokemon1.Hp<=0){
                    Result="1_Dead"
                    Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
                    
                }
            }
            else{
         
                Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
            }
        }
        else{

            Result= SwitchPokemon()
        }
        
    }
    
    else if(ActivePokemon1.Speed<ActivePokemon2.Speed){
        //console.log("Here")
        //console.log(ActivePokemon1)
        
        
        if(ActivePokemon2.Hp>0){
            PreviousHp1=ActivePokemon1.Hp;
            [ChosenMove2,ActivePokemon2,ActivePokemon1,Bag2]= await CompAttack(ChosenMove2,ActivePokemon2,ActivePokemon1,Party2,Bag2,Action2);
            (ActivePokemon1.Hp)=Math.floor(ActivePokemon1.Hp);
            
            if(ActivePokemon1.Hp!=PreviousHp1){
                
                await ChangeClosePokemonInfo(ActivePokemon1.Name,ActivePokemon1.Hp, PreviousHp1,ActivePokemon1.MaxHp,Message2);
            
            }
          
            if (ActivePokemon1.Hp>0){
                [ChosenMove1,ActivePokemon1,ActivePokemon2]= await YouAttack(ChosenMove1,ActivePokemon1,ActivePokemon2,"Second");
                (ActivePokemon2.Hp)=Math.floor(ActivePokemon2.Hp)

                if(ActivePokemon2.Hp!=PreviousHp2){
                    await ChangeFarPokemonInfo(ActivePokemon2.Name,ActivePokemon2.Hp, PreviousHp2,ActivePokemon2.MaxHp,Message2);
                    }

                if(ActivePokemon2.Hp<=0){
                    Result="2_Dead"
                    
                    Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
                    
                }
                
            }
            else{
                Result="1_Dead"
                //console.log(Result)
                Result= SwitchPokemon( ActivePokemon1, ActivePokemon2)
                
               
            }

            
            
        }
        else{
            Result="2_Dead"
            Result= SwitchPokemon()
         
        }
        

        }

    else{
        throw new Error("No one can attack")
    }
   }

   function SwitchPokemon(P1,P2){
   
    let Result="DeadPokemon"
    ChosenMove2.priority=PreviousPrio2
    resolve([ChosenMove1,ActivePokemon1,ChosenMove2,ActivePokemon2,Result,Party1])
       
    }
    resolve([ChosenMove1,ActivePokemon1,ChosenMove2,ActivePokemon2,Result,Party1])
       
    });
}

export async function YouAttack(Move,Attacker,Defender,Order){
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    if(Order=="Second")
    await delay(1000);


    if(Move.Name=="Bag1"){
       
    }
    else{
        let result= await Attack(Move,Attacker,Defender,"Close")
        Move=result[0]
        Defender=result[1]
    }
   
    
   
    return[Move,Attacker,Defender]
}


export async function CompAttack(Move,Attacker,Defender,Party2,Bag2,Action2,Order){
    //console.log(Defender)
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    if(Order=="Second"){
        await delay(1000);
    }
   
    let DeathCount=0
    let HighestLevel=0
    let HighestLevelIndex=0
    for (let i in Party2){
       if(Party2[i].Hp<=0){
        DeathCount+=1
        if(Party2[i].Level>HighestLevel){
            HighestLevel=Party2[i].Level
            HighestLevelIndex=i
        }

       }
    }

    let PreviousHp2=Attacker.Hp;
    
    if(Action2=="Revive2"){
        Party2[HighestLevelIndex].Hp= Party2[HighestLevelIndex].MaxHp
        await ThrowPartyFarRevive()
        await ChangeFarPokemonInfo(Attacker.Name,Attacker.Hp, PreviousHp2,Attacker.MaxHp);
        Bag2.RevivePP-=1
    }

    else if(Action2=="Heal2"){
        Attacker.Hp=Attacker.MaxHp

        await ThrowFarHeal()

        await ChangeFarPokemonInfo(Attacker.Name,Attacker.Hp, PreviousHp2,Attacker.MaxHp);
        Bag2.HealPP-=1
    }

    else if (Action2==""){
       
        let result= await Attack(Move,Attacker,Defender,"Far")
        //console.log(Defender)
        Move=result[0]
        Defender=result[1]

    
    }
    else{
        console.log("No COmp Attack")
    }

    /*
    let ActionUsed=false
    let ChanceNumber=(2*(0.5-Attacker.Hp/Attacker.MaxHp))

    if(Attacker.Speed>Defender.Speed){
        ChanceNumber=ChanceNumber-0.5
    }
    
    console.log("CHANG")
    console.log(ChanceNumber)
    let Party2Length= Party2.length

    let DeathCount=0
    let HighestLevel=0
    let HighestLevelIndex=0
    for (let i in Party2){
       if(Party2[i].Hp<=0){
        DeathCount+=1
        if(Party2[i].Level>HighestLevel){
            HighestLevel=Party2[i].Level
            HighestLevelIndex=i
        }

       }
    }

    
    if(Bag2.RevivePP>0){
        console.log("HERE`1")

        if(DeathCount*2>=Party2Length){
            if(Attacker.Speed<Defender.Speed){
                console.log("REVIVE2")
                Party2[HighestLevelIndex].Hp= Party2[HighestLevelIndex].MaxHp
                ActionUsed=true
                Bag2.RevivePP-=1
            }
        }
    }

    if(ActionUsed==false){
        console.log("HERE`2")
        if(Bag2.HealPP>0){
            let Random= Math.random()
            console.log(Random)
            if(ChanceNumber>Random){

                console.log("Heal")
                let PreviousHp2=Attacker.Hp;
                Attacker.Hp=Attacker.MaxHp
                await ChangeFarPokemonInfo(Attacker.Name,Attacker.Hp, PreviousHp2,Attacker.MaxHp);
                Bag2.HealPP-=1
                ActionUsed=true
            }      
        }
    }
       
    if(ActionUsed==false){
        console.log("HERE`3")
        let result= await Attack(Move,Attacker,Defender)
        //console.log(Defender)
        Move=result[0]
        Defender=result[1]
    }
        */

    return[Move,Attacker,Defender,Bag2]
}

