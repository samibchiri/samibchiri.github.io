const person = {
    name: "John",
    age: 30,
    address: {
        city:"Amsterdam",
        street:"Street",
        clotches:["pants","shirt","shoes"],
        
        
    }
};


console.log(person)

CountProp(person)

function CountProp(obj){
    let Count=0
    Count=Count+Recursive(obj,Count)
    
    console.log(Count)
}
function Recursive(obj,Count){
    Count=0
    for (let key in obj){
        //console.log(key)
        if(typeof(obj[key])=="object"){
            console.log(obj[key])
            Count=Count+(Recursive(obj[key],Count))
        }
        else{
            Count=Count+1
        }
    }
    //console.log(Count)
    return Count
}