


//Testing()

let ListPokemonMoves=[]


let ListOfMoves=[]

let PokemonSpriteFront
let PokemonSpriteBack

let PokemonHpStat
let PokemonAttStat
let PokemonDefStat
let PokemonSpAttStat
let PokemonSpDefStat
let PokemonSpeedStat

let Primary_Type
let Secondary_Type
let Speed
let Att
let Def
let Hp
let Sp_Att
let Sp_Def

let PokemonPrimaryType
let PokemonSecondaryType

let GoodPokemonName={}

let ListOfPokemon=[]

let Parsed = await fetch("PokMovesIndex.json")
let TypeEffect= await Parsed.json()
console.log(TypeEffect)

let Res = await fetch("PokemonInfo.json")
let PokData= await Res.json()

console.log(PokData)

//await Testing()
export async function Testing(){
    PokemonCards()
    async function PokemonCards(){

        let response= await fetch("PokemonData.json")
        let data= await response.json()
    
    
        for(let i=0;i<data.length;i++){
            console.log(data[i])

            Test(data[i].Name,data[i].Base_Name,data[i].Dex_Num)
        }
    }
}

let PokeBaseName
async function Test(Name,BaseName,DexNum){
    //console.log(card)
    
     TextBox.style.display="none"

    let PokemonUrl
    let response
    let data
    let PokemonNumber=DexNum;

    //console.log(PokemonNumber)
    PokemonNumber=parseInt(PokemonNumber)
    PokemonNumber= PokemonNumber.toString()
    //console.log(PokemonNumber)
    //console.log(typeof PokemonNumber)

    
    try{
        
        let NameSegment=""
        let PartOfName=""
    PokeName= Name
    PokeName=PokeName.toLowerCase().trim()
    PokeBaseName=BaseName
    
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

    PokeBaseName= BaseName
    
    try{
        PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`
        
        response= await fetch(PokemonUrl);
        data= await response.json()
        
        AdaptedMoveSetMaker(BaseName,PokemonApi)
        
    }
    catch(error){
        try{
            console.error(error)
            
            //console.log(PokemonNumber)
            PokemonApi=PokemonNumber
            PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`  
            response= await fetch(PokemonUrl);
            data= await response.json()
           //console.log(PokemonApi)

            AdaptedMoveSetMaker(BaseName,PokemonApi)
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


let AllPokMoveIndices=[]



async function AdaptedMoveSetMaker(BaseName,PokemonApi){
    let PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`
    let response= await fetch(PokemonUrl);
    let data= await response.json()

    


    let NumMoves= data.moves.length

    let MovesOfPokCont=[BaseName,PokemonApi]
   
    //console.log(data.moves)
    data.moves.forEach(async move=>{
        let MoveId=(move.move.url.split("/")["6"])
        //let CreatedMove= createMove(Move)
       
        //console.log(MoveData.power)
        

        MovesOfPokCont.push(parseInt(MoveId))
        
       

    })
    console.log(BaseName)
    AllPokMoveIndices.push(MovesOfPokCont)
    
}


//await AdaptedMoveSetMaker("kyurem")
//await AdaptedMoveSetMaker("kyurem-white")

console.log(AllPokMoveIndices)
console.log(JSON.stringify(AllPokMoveIndices))


for(let i=900; i<1500;i++){
    //let MoveUrl=`https://pokeapi.co/api/v2/move/${i}/`
    //let Answer= await fetch(MoveUrl);
    //let MoveData= await Answer.json()

    //920
    //console.log(i)
}

//let Parsed = await fetch("PokMovesIndex.json")
//let TypeEffect= await Parsed.json()

//console.log(TypeEffect)

//await GetPokemonInfo()
export async function GetPokemonInfo(){
    PokemonCards()
    async function PokemonCards(){

        let response= await fetch("PokemonData.json")
        let data= await response.json()
    
    
        for(let i=0;i<data.length;i++){
            console.log(data[i])

            console.log(data[i].Name)
            await PokInfo(data[i].Name,data[i].Base_Name,data[i].Dex_Num)
        }
    }
}

//let PokeBaseName
let PokeName

async function PokInfo(Name,BaseName,DexNum){
    //console.log(card)
    
     TextBox.style.display="none"

    let PokemonUrl
    let response
    let data
    let PokemonNumber=DexNum;

    let PokemonStatData
    //console.log(PokemonNumber)
    PokemonNumber=parseInt(PokemonNumber)
    PokemonNumber= PokemonNumber.toString()
    //console.log(PokemonNumber)
    //console.log(typeof PokemonNumber)

    
    try{
        
        let NameSegment=""
        let PartOfName=""
    PokeName= Name
    PokeName=PokeName.toLowerCase().trim()
    PokeBaseName=BaseName
    
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

    PokeBaseName= BaseName
    
    try{
        PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`

        //await AdaptedMoveSetMaker(BaseName,PokemonApi)
       
        response= await fetch(PokemonUrl);
        data= await response.json()
        //console.log(data)

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
        //PokemonStatData=[PokemonSpriteFront,PokemonSpriteBack,PokemonHpStat,PokemonAttStat,PokemonDefStat,PokemonSpAttStat,PokemonSpDefStat,PokemonSpeedStat,PokemonPrimaryType,PokemonSecondaryType]
        
        GoodPokemonName={}
        
        GoodPokemonName.Level=null
        //console.log(CopyPokemonApi)
       
        if(GoodPokemonName!=undefined){
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
            GoodPokemonName.Name=Name
            GoodPokemonName.BaseName=BaseName
        }
        console.log(GoodPokemonName)
        ListOfPokemon.push(GoodPokemonName)
        //MoveSet=[]
        //AdaptedMoveSetMaker(PokemonApi)
        
    }
    catch(error){
        try{
            
            //console.log(PokemonNumber)
            PokemonApi=PokemonNumber
            PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${PokemonApi}`  
            response= await fetch(PokemonUrl);
            data= await response.json()
            //console.log(data)
           //console.log(PokemonApi)

           //await AdaptedMoveSetMaker(BaseName,PokemonApi)
       

            //await AdaptedMoveSetMaker(PokemonApi)
            //console.log([PokeBaseName,data.stats])
            //PokemonStatData=[PokemonSpriteFront,PokemonSpriteBack,PokemonHpStat,PokemonAttStat,PokemonDefStat,PokemonSpAttStat,PokemonSpDefStat,PokemonSpeedStat,PokemonPrimaryType,PokemonSecondaryType]
   
            GoodPokemonName={}
        
            GoodPokemonName.Level=null
            //console.log(CopyPokemonApi)
           
            if(GoodPokemonName!=undefined){
                 //[PokemonSpriteFront,PokemonSpriteBack,Hp,Att,Def,Sp_Att,Sp_Def,Speed,PokemonPrimaryType,PokemonSecondaryType]= PokemonStatData
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
                GoodPokemonName.Name=Name
                GoodPokemonName.BaseName=BaseName
       
            }
            ListOfPokemon.push(GoodPokemonName)
        }
        catch(error){
            console.error(error)
        }
    
    }
    //console.log(PokemonStatData)
}
        catch(error){
            console.log(error)
        }

    

}


//let AllPokMoveIndices=[]

//await AdaptedMoveSetMaker("kyurem")
//await AdaptedMoveSetMaker("kyurem-white")
setTimeout(()=>{
    console.log(ListOfPokemon)
console.log(JSON.stringify(ListOfPokemon))

},200000)
/*
setTimeout(()=>{
    console.log(AllPokMoveIndices)
    console.log(JSON.stringify(AllPokMoveIndices))

},200000)
*/


for(let i=900; i<1500;i++){
    //let MoveUrl=`https://pokeapi.co/api/v2/move/${i}/`
    //let Answer= await fetch(MoveUrl);
    //let MoveData= await Answer.json()

    //920
    //console.log(i)
}

/*
let Parsed = await fetch("PokMovesIndex.json")
let TypeEffect= await Parsed.json()

console.log(TypeEffect)

let Max=0
for (let i in TypeEffect){
    if(Max<(TypeEffect[i].length)){
        Max=TypeEffect[i].length
    }
}
console.log(Max)

*/

