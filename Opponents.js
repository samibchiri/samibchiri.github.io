let Outcome
function checkPropertyName(variable, obj) {
    
    Object.keys(obj).forEach(key => {
        
        
        if(key==variable.Gymleader){
            
            if(!((Object.keys(obj[key])[0]==variable.Game))){
                Outcome=false;
                
            }
            else{
                Outcome=true;
                
            }
        }
        
        
    })
    return Outcome    
}

export async function TrainerData() {
    try {
    let response= await fetch("TrainerData.json")
    let data= await response.json()
    
    let Gen1={}
    let Gen2={}
    let Gen3={}
    let Gen4={}
    let Gen5={}
    let Gen6={}
    let Gen7={}
    let Gen8={}
    let Gen9={}
    
    let Gen1Trainers=[]
    let Gen2Trainers=[]
    let Gen3Trainers=[]
    let Gen4Trainers=[]
    let Gen5Trainers=[]
    let Gen6Trainers=[]
    let Gen7Trainers=[]
    let Gen8Trainers=[]
    let Gen9Trainers=[]

    let Gen1Champions=[]
    let Gen2Champions=[]
    let Gen3Champions=[]
    let Gen4Champions=[]
    let Gen5Champions=[]
    let Gen6Champions=[]
    let Gen7Champions=[]
    let Gen8Champions=[]
    let Gen9Champions=[]

    let Counter=0
    let Moveset;

    for(let i=0;i<data.length;i=i+1){
        
        let item= data[i]

        if (item.Game === "Red" || item.Game === "Blue" || item.Game === "Yellow") {
            
            item.Gymleader=item.Gymleader.split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ");

           
            if(Gen1[item.Gymleader]){
                if(!checkPropertyName(item,Gen1)){
                    continue
                }
               
            }
            if (!Gen1[item.Gymleader]) {
                 Gen1[item.Gymleader] = {};
                if (item.Gym.includes("Elite")||item.Gymleader.includes("Champ")){
                    Gen1Champions.push(item.Gymleader)
                }
                else{
                    Gen1Trainers.push(item.Gymleader)
                }
            }
            
            Moveset = [
                item.Move_1,
                item.Move_2,
                item.Move_3,
                item.Move_4,
                item.Level
            ];
            
            if(!Gen1[item.Gymleader][item.Game]){
                Gen1[item.Gymleader][item.Game]={};
            }

            if(!Gen1[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen1[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen1[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`] = Moveset;
            
          
        }
        

        if(item.Game=="Gold"||item.Game=="Silver"|| item.Game=="Crystal"){
            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")
        
            if(Gen2[item.Gymleader]){
                
                if(!checkPropertyName(item,Gen2)){
                    continue
                }
               
            }
            
            if (!Gen2[item.Gymleader]) {
                
            
                Gen2[item.Gymleader] = {};
                
                if (item.Gym.includes("Elite")||item.Gymleader.includes("Champ")){
                    Gen2Champions.push(item.Gymleader)
                }
                else{
                    Gen2Trainers.push(item.Gymleader)
                }
            }
            Moveset=[]
            Moveset.push(item.Move_1)
            Moveset.push(item.Move_2)
            Moveset.push(item.Move_3)
            Moveset.push(item.Move_4)
            Moveset.push(item.Level)

            if(!Gen2[item.Gymleader][item.Game]){
                Gen2[item.Gymleader][item.Game]={};
            }

            if(!Gen2[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen2[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen2[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]= Moveset;
        }
        if(item.Game=="Ruby"||item.Game=="Sapphire"||item.Game=="Emerald"){
            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")

            if(Gen3[item.Gymleader]){
                if(!checkPropertyName(item,Gen3)){
                    continue
                }
               
            }
            

            if (!Gen3[item.Gymleader]) {
                Gen3[item.Gymleader] = {};
                if (item.Gym.includes("Elite")||item.Gymleader.includes("Champ")){
                    Gen3Champions.push(item.Gymleader)
                }
                else{
                    Gen3Trainers.push(item.Gymleader)
                }
            }
            Moveset=[]
            Moveset.push(item.Move_1)
            Moveset.push(item.Move_2)
            Moveset.push(item.Move_3)
            Moveset.push(item.Move_4)
            Moveset.push(item.Level)

            if(!Gen3[item.Gymleader][item.Game]){
                Gen3[item.Gymleader][item.Game]={};
            }

            if(!Gen3[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen3[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen3[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`] = Moveset;
         }
        if(item.Game=="Diamond"||item.Game=="Pearl"||item.Game=="Platinum"){
            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")

            if(Gen4[item.Gymleader]){
                if(!checkPropertyName(item,Gen4)){
                    continue
                }
               
            }
            

            if (!Gen4[item.Gymleader]) {
                Gen4[item.Gymleader] = {};
                if (item.Gym.includes("Elite")||item.Gymleader.includes("Champ")){
                    Gen4Champions.push(item.Gymleader)
                }
                else{
                    Gen4Trainers.push(item.Gymleader)
                }
            }
            Moveset=[]
            Moveset.push(item.Move_1)
            Moveset.push(item.Move_2)
            Moveset.push(item.Move_3)
            Moveset.push(item.Move_4)
            Moveset.push(item.Level)

            if(!Gen4[item.Gymleader][item.Game]){
                Gen4[item.Gymleader][item.Game]={};
            }

            if(!Gen4[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen4[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen4[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`] = Moveset;
         }
        
        if(item.Game=="Black"||item.Game=="White"){
            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")


            if(Gen5[item.Gymleader]){
                if(!checkPropertyName(item,Gen5)){
                    continue
                }
               
            }
            
            if (!Gen5[item.Gymleader]) {
                Gen5[item.Gymleader] = {};
                if (item.Gym.includes("Elite")||item.Gymleader.includes("Champ")){
                    Gen5Champions.push(item.Gymleader)
                }
                else{
                    Gen5Trainers.push(item.Gymleader)
                }
            }
            Moveset=[]
            Moveset.push(item.Move_1)
            Moveset.push(item.Move_2)
            Moveset.push(item.Move_3)
            Moveset.push(item.Move_4)
            Moveset.push(item.Level)

            if(!Gen5[item.Gymleader][item.Game]){
                Gen5[item.Gymleader][item.Game]={};
            }

            if(!Gen5[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen5[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen5[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]= Moveset;
        }
        
        if(item.Game=="X"||item.Game=="Y"){
            

            if(Gen6[item.Gymleader]){
                if(!checkPropertyName(item,Gen6)){
                    continue
                }
               
            }

            item.Gymleader=item.Gymleader
            .split("_")
              .join(" ")

            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")

            
            if (!Gen6[item.Gymleader]) {
                
                Gen6[item.Gymleader] = {};
                if (item.Gymleader.includes("Champ")){
                    
                    Gen6Champions.push(item.Gymleader)
                }
                else if(item.Gym.includes("Elite")||item.Gym.includes("League") || item.Gym.includes("Champ")){
                    Gen6Champions.push(item.Gymleader)

                }
                else{
                    Gen6Trainers.push(item.Gymleader)
                    
                }
            }
            item.Gymleader=item.Gymleader.split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ");
           
            Moveset = [
                item.Move_1,
                item.Move_2,
                item.Move_3,
                item.Move_4,
                item.Level
            ];
            
            if(!Gen6[item.Gymleader][item.Game]){
                Gen6[item.Gymleader][item.Game]={};
            }

            if(!Gen6[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen6[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            
            Gen6[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]= Moveset;

    }

        if(item.Game=="Sun"||item.Game=="Moon"){
            item.Gymleader=item.Gymleader
            .split("_")
              .join(" ")

            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")

            if(Gen7[item.Gymleader]){
                if(!checkPropertyName(item,Gen7)){
                    continue
                }
               
            }
            

            if (!Gen7[item.Gymleader]) {
                
                Gen7[item.Gymleader] = {};
                if (item.Gymleader.includes("Champ")){
                    
                    Gen7Champions.push(item.Gymleader)
                }
                else if(item.Gym.includes("Elite")||item.Gym.includes("League") || item.Gym.includes("Champ")){
                    Gen7Champions.push(item.Gymleader)

                }
                else{
                    Gen7Trainers.push(item.Gymleader)
                }
            }
            Moveset=[]
            Moveset.push(item.Move_1)
            Moveset.push(item.Move_2)
            Moveset.push(item.Move_3)
            Moveset.push(item.Move_4)
            Moveset.push(item.Level)

            if(!Gen7[item.Gymleader][item.Game]){
                Gen7[item.Gymleader][item.Game]={};
            }

            if(!Gen7[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen7[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen7[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`] = Moveset;
        }
        if(item.Game=="Sword"||item.Game=="Shield"){
            item.Gymleader=item.Gymleader
            .split("_")
              .join(" ")

            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")

            if(Gen8[item.Gymleader]){
                if(!checkPropertyName(item,Gen8)){
                    continue
                }
               
            }
            

            if (!Gen8[item.Gymleader]) {
                
                Gen8[item.Gymleader] = {};
                if (item.Gymleader.includes("Champ")){
                    
                    Gen8Champions.push(item.Gymleader)
                }
                else if(item.Gym.includes("Elite")||item.Gym.includes("League") || item.Gym.includes("Champ")){
                    Gen8Champions.push(item.Gymleader)

                }
                else{
                    Gen8Trainers.push(item.Gymleader)
                }
            }
            Moveset=[]
            Moveset.push(item.Move_1)
            Moveset.push(item.Move_2)
            Moveset.push(item.Move_3)
            Moveset.push(item.Move_4)
            Moveset.push(item.Level)

            if(!Gen8[item.Gymleader][item.Game]){
                Gen8[item.Gymleader][item.Game]={};
            }

            if(!Gen8[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen8[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen8[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`] = Moveset;
        }
            
        if(item.Game=="Scarlet"||item.Game=="Violet"){
            
            item.Gymleader=item.Gymleader
            .split("_")
              .join(" ")

            item.Gymleader=item.Gymleader
            .split(" ")
            .map(word => word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
            .join(" ")
            
            if(Gen9[item.Gymleader]){
                if(!checkPropertyName(item,Gen9)){
                    continue
                }
               
            }
            

            if (!Gen9[item.Gymleader]) {
                Gen9[item.Gymleader] = {};
                if (item.Gymleader.includes("Champ")){
                    
                    Gen9Champions.push(item.Gymleader)
                }
                else if(item.Gym.includes("Elite")||item.Gym.includes("League") || item.Gym.includes("Champ")){
                    Gen9Champions.push(item.Gymleader)

                }
                else{
                    Gen9Trainers.push(item.Gymleader)
                }
            }
            Moveset=[]
            Moveset.push(item.Move_1)
            Moveset.push(item.Move_2)
            Moveset.push(item.Move_3)
            Moveset.push(item.Move_4)
            Moveset.push(item.Level)

            if(!Gen9[item.Gymleader][item.Game]){
                Gen9[item.Gymleader][item.Game]={};
            }

            if(!Gen9[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]){
                Gen9[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`]={};
            }
            Gen9[item.Gymleader][item.Game][`${item.Pokemon}_${Counter}`] = Moveset;
        }
        Counter=Counter+1
    }  
        let Alltrainers=[Gen1Trainers,Gen2Trainers,Gen3Trainers,Gen4Trainers,Gen5Trainers,Gen6Trainers,Gen7Trainers,Gen8Trainers,Gen9Trainers]
        let AllGyms=[Gen1,Gen2,Gen3,Gen4,Gen5,Gen6,Gen7,Gen8,Gen9]
        let AllChampions=[Gen1Champions,Gen2Champions,Gen3Champions,Gen4Champions,Gen5Champions,Gen6Champions,Gen7Champions,Gen8Champions,Gen9Champions]

        let Data=[AllGyms,Alltrainers,AllChampions]
        
       
        return Data
    }    
    

    
    catch(error){
        console.error(error)
    }
    
}


