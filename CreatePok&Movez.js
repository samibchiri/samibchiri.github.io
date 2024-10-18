



export async function createPokemon(Pokemonster,Level){
    
    try{
        let Pokemon=Pokemonster
        //let Pokemon="deino"
        //console.log(Pokemon)
        let PokemonUrl=`https://pokeapi.co/api/v2/pokemon/${Pokemon}`

        let response= await fetch(PokemonUrl);
        let data= await response.json()
        
        let Name=data.name
        
        const[{base_stat:Hp},{base_stat:Att},{base_stat:Def},{base_stat:Sp_Att},{base_stat:Sp_Def},{base_stat:Speed}] = data.stats
        Pokemon ={
            "Name":Name[0].toUpperCase()+Name.slice(1),
            "Primary_Type":data.types[0].type.name,
            //"Secondary_Type":data.types[1].type.name,
            "Hp":Hp,
            "Attack":Att,
            "Defense":Def,
            "Sp_Attack":Sp_Att,
            "Sp_Defense":Sp_Def,
            "Speed":Speed,
            "Level":Level,
        }
        if(data.types[1]!=undefined){
            Pokemon["Secondary_Type"] =""
        }
        Pokemon= PokemonStatCalc(Pokemon)
        //console.log(Pokemon)
        return Pokemon
    }
    
    catch(error){
        console.error(error)
    }
}


export async function createMove(ChosenMove){
    try{

        //console.log(ChosenMove)
        let Move=ChosenMove
        //Move="explosion"
        let MoveUrl=`https://pokeapi.co/api/v2/move/${Move}/`
        
        let Answer= await fetch(MoveUrl);
        let MoveData= await Answer.json()
        //console.log(MoveData)
        //console.log(MoveData)
        let Move1 ={
            Name:MoveData.name,
            pp: MoveData.pp,
            Maxpp: MoveData.pp,
            power:MoveData.power,
            priority:MoveData.priority,
            type:MoveData.type.name,
            damage_type:MoveData.damage_class.name,
            accuracy:MoveData.accuracy,

        }
        if(Move1.power==null){
            Move1.power=40
        }
        if(Move1.accuracy==null ||Move1.accuracy==0){
            Move1.accuracy=100
        }

        if(MoveData.accuracy>80 && MoveData.power>110){
            Move1.accuracy=Math.round((100-Math.sqrt(MoveData.power-110)*6)/5)*5
            
        }
        if(MoveData.damage_class.name=="status"){
            MoveData.damage_class.name="physical"
        }
        

        return Move1
    }

    catch(error){
        console.error(error)
    }

}



export function PokemonStatCalc(Pokemon1){ 

   
    Pokemon1.BST= Pokemon1.Hp+Pokemon1.Attack+Pokemon1.Defense+Pokemon1.Sp_Attack+Pokemon1.Sp_Defense+Pokemon1.Speed

    Pokemon1.Hp=(((2.5*Pokemon1.Hp)*Pokemon1.Level)/100)+Pokemon1.Level+15
    Pokemon1.MaxHp=(((2.5*Pokemon1.MaxHp)*Pokemon1.Level)/100)+Pokemon1.Level+15
    Pokemon1.Attack=((2*Pokemon1.Attack)*Pokemon1.Level)/100+5
    Pokemon1.Defense=((2*Pokemon1.Defense)*Pokemon1.Level)/100+5
    Pokemon1.Sp_Attack=((2*Pokemon1.Sp_Attack)*Pokemon1.Level)/100+5
    Pokemon1.Sp_Defense=((2*Pokemon1.Sp_Defense)*Pokemon1.Level)/100+5
    Pokemon1.Speed=((2*Pokemon1.Speed)*Pokemon1.Level)/100+5

    Pokemon1.Hp=Math.round(Pokemon1.Hp)
    Pokemon1.MaxHp=Math.round(Pokemon1.MaxHp)
    Pokemon1.Attack=Math.round(Pokemon1.Attack)
    Pokemon1.Defense=Math.round(Pokemon1.Defense)
    Pokemon1.Sp_Attack=Math.round(Pokemon1.Sp_Attack)
    Pokemon1.Sp_Defense=Math.round(Pokemon1.Sp_Defense)
    Pokemon1.Speed=Math.round(Pokemon1.Speed)

    

    return Pokemon1
}