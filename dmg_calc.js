
let GameMessage2= document.querySelector("#GameMessage2")

export async function UserDmgCalc(Move1,Attacker,Defender){
    

    return new Promise(async (resolve)=>{

   
   
   // console.log(ActivePokemon1)
    
   let Attack_stat
   let Defense_stat
    
   //console.log("Move:")
   //console.log(Move1)
    //console.log(Move1)
    try{
        
        if("physical"==Move1.damage_type){
            Attack_stat= Attacker.Attack
            Defense_stat= Defender.Defense
        }
        else {
            Attack_stat= Attacker.Sp_Attack
            Defense_stat= Defender.Sp_Defense
        }
        
        let Crit_Mult=1
        
        if(Math.random()<0.05){
            Crit_Mult=2
            
        }
        
        let Type_Mult= await TypeEffectiveness(Move1,Attacker,Defender)
       
        let Damage= (((2*Attacker.Level*Crit_Mult/5+2)*Move1.power*Attack_stat/Defense_stat/50)+2)*Type_Mult
       
        Damage=Math.ceil(Damage)

        let Message=""


          
            if(Type_Mult>1.5){
                Message=Message+"It is Super Effective!"
            }
            else if(Type_Mult==0){
                Message=Message+"It is has No Effect!"
            }
            else if(Type_Mult<=0.8){
                Message=Message+"It is Not Very Effective!"
            }
            else{
                
            }


            if(Crit_Mult==2){
                
                if(Message!=""){
                    Message = Message + "        It is a Crit!";
                    f
                    Message= Message.replace( / /g, "&nbsp;" );
                }
                else{
                    Message="It is a Crit!"
                }
                
            }
               
            
       
        

        //console.log(Move1)
        //console.log(Damage)
        

        resolve([Damage,Message])
    
       
        
        }

        catch(error){
            console.error(error)
        }
    })
}

export async function TypeEffectiveness(Move1,Attacker,Defender) {
    try {
        let resp= await fetch("dmg_mult.json")
        let TypeEffect= await resp.json()
        let Attacker_types
        let Defender_types
        //console.log(Attacker)
        
        let Move_type= Move1.type

       
        //console.log(Attacker)
        if(Attacker.Secondary_Type==undefined ||Attacker.Secondary_Type==""){
            Attacker_types=[Attacker.Primary_Type]
       
        }
        else{
            Attacker_types= [Attacker.Primary_Type,Attacker.Secondary_Type]
        }

        if(Defender.Secondary_Type==undefined || Defender.Secondary_Type==""){
            Defender_types=[Defender.Primary_Type]
       
        }
        else{
            Defender_types=[Defender.Primary_Type, Defender.Secondary_Type]
        }
        //console.log(Defender_types)

        for(let i in Attacker_types){
            Attacker_types[i]=Attacker_types[i].trim()
        }
        for(let i in Defender_types){
            Defender_types[i]=Defender_types[i].trim()
        }
        let Multiplier=1;
    
        for (let i=0; i<Defender_types.length; i++){
            //console.log(Multiplier)
            //console.log(Defender_types[i])
            Multiplier=Multiplier*TypeEffect[Move_type][Defender_types[i]]
        }
        
        for (let j=0;j<Attacker_types.length;j++){
            if (Move_type==Attacker_types[j]){
                Multiplier=Multiplier*1.5
                }
            }

            let RandomNumber= Math.random()
            RandomNumber= RandomNumber*0.15+0.85
            RandomNumber= RandomNumber
            Multiplier=Multiplier*RandomNumber
        
        return Multiplier.toFixed(2);

        }
    catch(error){
        console.error(error)
        }
}