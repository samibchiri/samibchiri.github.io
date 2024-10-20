

let PokemonClose=document.getElementById("PokemonClose")
let PokemonFar=document.getElementById("PokemonFar")

let PokeBallClose=document.getElementById("PokeBallClose")
let GreatBallClose=document.getElementById("GreatBallClose")

let PokeBallFar=document.getElementById("PokeBallFar")
let GreatBallFar=document.getElementById("GreatBallFar")

let BoomClosePokeBall=document.getElementById("BoomClosePokeBall")
let BoomFarPokeBall=document.getElementById("BoomFarPokeBall")

let HealBallClose= document.getElementById("HealBallClose")
let HealBallFar= document.getElementById("HealBallFar")

let GameMessage1= document.querySelector("#GameMessage1")
let GameMessage2= document.querySelector("#GameMessage2")



PokeBallClose.style.opacity="0"
GreatBallClose.style.opacity="0"
PokeBallFar.style.opacity="0"
GreatBallFar.style.opacity="0"
HealBallClose.style.opacity="0"
HealBallFar.style.opacity="0"

let ReviveBallClose= document.getElementById("ReviveBallClose")
let ReviveBallFar= document.getElementById("ReviveBallFar")

export function ThrowClosePokemon(Pokeball,Sprite){
    return new Promise((resolve) => {
        PokemonClose.style.opacity="0"  
        Pokeball.style.animation = "none";
        BoomClosePokeBall.style.animation = "none";
        PokemonClose.style.animation = "none";

    
        PokemonClose.src=Sprite
    

        setTimeout(() => {
            Pokeball.style.display = "block";  
            Pokeball.style.opacity = "1";   
            PokemonClose.style.opacity="0"     

            Pokeball.style.animation = "ThrowCloseBall 0.75s linear 0s forwards, ReturnCloseBall 0.5s ease-in 1.75s forwards";
            BoomClosePokeBall.style.animation = "OpenBall 1s linear 0.75s forwards";
            PokemonClose.style.animation = "Fade 0.5s ease-in 1s reverse forwards";
        }, 10); 
        setTimeout(()=>{
            PokemonClose.opacity="1";
            resolve()
        },2500) 
    })
}


export function ThrowFarPokemon(Pokeball,Sprite){
    
    return new Promise((resolve) => {
    PokemonFar.style.opacity="0"  
    Pokeball.style.animation = "none";
    BoomFarPokeBall.style.animation = "none";
    PokemonFar.style.animation = "none";

   
    PokemonFar.src=Sprite


    setTimeout(() => {
        Pokeball.style.display = "block";  
        Pokeball.style.opacity = "1";   
        PokemonFar.style.opacity="0"     

        Pokeball.style.animation = "ThrowFarBall 0.75s linear 0s forwards, ReturnFarBall 0.5s ease-in 1.75s forwards";
        BoomFarPokeBall.style.animation = "OpenBall 1s linear 0.75s forwards";
        PokemonFar.style.animation = "Fade 0.5s ease-in 1s reverse forwards";
    }, 10); 
    setTimeout(()=>{
        PokemonFar.opacity="1";
        resolve()
        },2500) 
    })
}


export function ReturnClosePokemon(Pokeball){
    
    return new Promise((resolve) => {
        console.log("Thrown")
        PokemonClose.style.opacity="1"
        Pokeball.style.animation = "none";
        BoomClosePokeBall.style.animation = "none";
        PokemonClose.style.animation = "none";

        setTimeout(() => {
            Pokeball.style.display = "block";  
            Pokeball.style.opacity = "1";     

            Pokeball.style.animation = "ThrowCloseBall 0.75s linear 0s forwards, ReturnCloseBall 0.5s ease-in 1.75s forwards";
            BoomClosePokeBall.style.animation = "OpenBall 1s linear 0.75s forwards";
            PokemonClose.style.animation = "Fade 0.5s ease-in 0.75s forwards";
        }, 10);  // 
        setTimeout(() => {
            
        console.log("Resolve")
        resolve()
    }, 2500); 
    });

}


export function ReturnFarPokemon(Pokeball){
   
    return new Promise((resolve) => {
        console.log("Far Throw")
        PokemonFar.style.opacity="1"
        Pokeball.style.animation = "none";
        BoomFarPokeBall.style.animation = "none";
        PokemonFar.style.animation = "none";

        setTimeout(() => {
            Pokeball.style.display = "block";  
            Pokeball.style.opacity = "1";     

            Pokeball.style.animation = "ThrowFarBall 0.75s linear 0s forwards, ReturnFarBall 0.5s ease-in 1.75s forwards";
            BoomFarPokeBall.style.animation = "OpenBall 1s linear 0.75s forwards";
            PokemonFar.style.animation = "Fade 0.5s ease-in 0.75s forwards";
        }, 10);  // 
        setTimeout(() => {
            
        console.log("Resolve")
        resolve()
    }, 2500); 
    });

}


export function CloseAttack(){

    BoomClosePokeBall.style.animation = "none";
    BoomFarPokeBall.style.animation = "none";
    PokemonClose.style.animation = "none";

    PokemonClose.style.opacity="1"
    BoomFarPokeBall.style.opacity="1"
    
    setTimeout(() => {
        
        BoomFarPokeBall.style.animation = "AttackExplosion 0.5s linear 0.7s forwards";
        PokemonClose.style.animation = "PokemonCloseAttack 1.5s ease 0s forwards";
    }, 100); 
}

export function CloseAttackMiss(){

    BoomClosePokeBall.style.animation = "none";
    BoomFarPokeBall.style.animation = "none";
    PokemonClose.style.animation = "none";

    PokemonClose.style.opacity="1"
    BoomFarPokeBall.style.opacity="1"
    
    setTimeout(() => {
        
        PokemonClose.style.animation = "PokemonCloseAttack 1.5s ease 0s forwards";
    }, 100); 
    setTimeout(()=>{
        GameMessage2.textContent="But he Missed!"
    },1600)
}


export function FarAttack(){

     PokemonFar.style.opacity="1"
     BoomClosePokeBall.style.opacity="1"

     BoomFarPokeBall.style.animation = "none";
     BoomClosePokeBall.style.animation = "none";
    PokemonFar.style.animation = "none";

    const computedStyle = window.getComputedStyle(BoomFarPokeBall);
    console.log(computedStyle.display);
    

    setTimeout(() => {
        
        BoomClosePokeBall.style.animation = "AttackExplosion 0.5s linear 0.7s forwards";
        PokemonFar.style.animation = "PokemonFarAttack 1.5s ease 0s forwards";
    }, 100); 
    
}

export function FarAttackMiss(){

    PokemonFar.style.opacity="1"
    BoomClosePokeBall.style.opacity="1"

    BoomFarPokeBall.style.animation = "none";
    BoomClosePokeBall.style.animation = "none";
   PokemonFar.style.animation = "none";

   const computedStyle = window.getComputedStyle(BoomFarPokeBall);
   console.log(computedStyle.display);
   

   setTimeout(() => {
       
        PokemonFar.style.animation = "PokemonFarAttack 1.5s ease 0s forwards";
   }, 100); 

   setTimeout(()=>{
        GameMessage2.textContent="But he Missed!"
    },1600)

   
}


export async function ThrowCloseHeal(){
    
    return new Promise((resolve) => {
        
        HealBallClose.style.animation = "none";
        BoomClosePokeBall.style.animation = "none";

        setTimeout(() => {
            HealBallClose.style.display = "block";  
            HealBallClose.style.opacity = "1";      

            HealBallClose.style.animation = "ThrowCloseBall 0.75s linear 0s forwards, Fade 0.5s ease-in 1s forwards";
            BoomClosePokeBall.style.animation = "OpenHealBall 1s linear 0.75s forwards";
                   
        }, 10); 
        setTimeout(()=>{
           
            resolve()
        },1800) 
    })

}

export async function ThrowFarHeal(){
    
    return new Promise((resolve) => {
        
        HealBallFar.style.animation = "none";
        BoomFarPokeBall.style.animation = "none";

        setTimeout(() => {

            HealBallFar.style.display = "block";  
            HealBallFar.style.opacity = "1"; 

            HealBallFar.style.animation = "ThrowFarBall 0.75s linear 0s forwards, Fade 0.5s ease-in 1s forwards";
            BoomFarPokeBall.style.animation = "OpenHealBall 1s linear 0.75s forwards";
                   
        }, 10); 
        setTimeout(()=>{
           
            resolve()
        },1000 ) 
    })

}



export async function ThrowPartyCloseHeal(){
    
    console.log("CloseHeal")
    return new Promise((resolve) => {
        
        HealBallClose.style.animation = "none";
        BoomClosePokeBall.style.animation = "none";

        setTimeout(() => {
            HealBallClose.style.animation = "OpenHealBall 1s linear 0s forwards";
                   
        }, 10); 
        setTimeout(()=>{
           
            resolve()
        },1000 ) 
    })

}

export async function ThrowPartyFarHeal(){
    
    console.log("FarHeal")
    return new Promise((resolve) => {
        
        HealBallFar.style.animation = "none";
        BoomFarPokeBall.style.animation = "none";

        setTimeout(() => {
            HealBallFar.style.animation = "OpenHealBall 1s linear 0s forwards";
                   
        }, 10); 
        setTimeout(()=>{
           
            resolve()
        },1000 ) 
    })

}


export async function ThrowPartyCloseRevive(){
    
    console.log("CloseHeal")
    return new Promise((resolve) => {
        
        ReviveBallClose.style.animation = "none";
        BoomClosePokeBall.style.animation = "none";

        setTimeout(() => {
            ReviveBallClose.style.animation = "OpenReviveBall 1s linear 0s forwards";
                   
        }, 10); 
        setTimeout(()=>{
           
            resolve()
        },1000 ) 
    })

}


export async function ThrowPartyFarRevive(){
    
    console.log("FarHeal")
    return new Promise((resolve) => {
        
        ReviveBallFar.style.animation = "none";
        BoomFarPokeBall.style.animation = "none";

        setTimeout(() => {
            ReviveBallFar.style.animation = "OpenReviveBall 1s linear 0s forwards";
                   
        }, 10); 
        setTimeout(()=>{
           
            resolve()
        },1000 ) 
    })

}


//FarAttack()

//CloseAttack()

//ReturnFarPokemon(PokeBallFar)

//ReturnClosePokemon(PokeBallClose)