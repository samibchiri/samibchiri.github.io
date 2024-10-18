
let FilterBST=document.getElementById("BST")
let FilterHp=document.getElementById("PokemonHp")
let FilterAttack=document.getElementById("PokemonAtt")
let FilterDefense=document.getElementById("PokemonDef")
let FilterSp_Attack=document.getElementById("PokemonSp_Att")
let FilterSp_Defense=document.getElementById("PokemonSp_Def")
let FilterSpeed=document.getElementById("PokemonSpeed")
let ListPokemons= document.querySelector(".ListPokemons")

let ListMoves= document.querySelector(".ListMoves")

export function PokemonFilterBox(){
    
    FilterBST.addEventListener("click",()=>{
        let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        //console.log(divs)
        if(FilterBST.checked){
            divs.sort((a,b)=>{
                let BST1=a.querySelector(".Pokemon_BST")
                BST1= (BST1.textContent).split(" ")
                BST1= parseInt(BST1[1])
                let BST2=b.querySelector(".Pokemon_BST")
                BST2= (BST2.textContent).split(" ")
                BST2= parseInt(BST2[1])
                return (BST1-BST2).toFixed(0)
            })
        }
        else{
            divs.sort((a,b)=>{
                let BST1=a.querySelector(".Pokemon_BST")
                BST1= (BST1.textContent).split(" ")
                BST1= parseInt(BST1[1])
                
                let BST2=b.querySelector(".Pokemon_BST")
                BST2= (BST2.textContent).split(" ")
                BST2= parseInt(BST2[1])
                return BST2-BST1
            })
        }

        ListPokemons.innerHTML="";
        divs.forEach(div =>{
            ListPokemons.appendChild(div)
        })


    })

    FilterHp.addEventListener("click",()=>{
        let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        
        if(FilterHp.checked){
            divs.sort((a,b)=>{
                let Hp1=a.querySelector(".Pokemon_Stats")
                Hp1=Hp1.textContent.slice(6).split(",")
                Hp1= parseInt(Hp1[0])
                
                let Hp2=b.querySelector(".Pokemon_Stats")
                Hp2=Hp2.textContent.slice(6).split(",")
                Hp2= parseInt(Hp2[0])
                return (Hp1-Hp2)
            })
        }
        else{
            divs.sort((a,b)=>{
                let Hp1=a.querySelector(".Pokemon_Stats")
                Hp1=Hp1.textContent.slice(6).split(",")
                Hp1= parseInt(Hp1[0])
                
                let Hp2=b.querySelector(".Pokemon_Stats")
                Hp2=Hp2.textContent.slice(6).split(",")
                Hp2= parseInt(Hp2[0])
                return (Hp2-Hp1)
            })
        }

        ListPokemons.innerHTML="";
        divs.forEach(div =>{
            ListPokemons.appendChild(div)
        })


    })

    FilterAttack.addEventListener("click",()=>{
        
        let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
       
        if(FilterAttack.checked){
            divs.sort((a,b)=>{
                let Att1=a.querySelector(".Pokemon_Stats")
                Att1=Att1.textContent.slice(6).split(",")
                Att1= parseInt(Att1[1])
                
                let Att2=b.querySelector(".Pokemon_Stats")
                Att2=Att2.textContent.slice(6).split(",")
                Att2= parseInt(Att2[1])
                return (Att1-Att2)
            })
        }
        else{
            divs.sort((a,b)=>{
                let Att1=a.querySelector(".Pokemon_Stats")
                Att1=Att1.textContent.slice(6).split(",")
                Att1= parseInt(Att1[1])
                
                let Att2=b.querySelector(".Pokemon_Stats")
                Att2=Att2.textContent.slice(6).split(",")
                Att2= parseInt(Att2[1])
                return (Att2-Att1)
            })
        }

        ListPokemons.innerHTML="";
        divs.forEach(div =>{
            ListPokemons.appendChild(div)
        })


    })

    FilterDefense.addEventListener("click",()=>{
        let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        
        if(FilterDefense.checked){
            divs.sort((a,b)=>{
                
                let Def1=a.querySelector(".Pokemon_Stats")
                Def1=Def1.textContent.slice(6).split(",")
                Def1= parseInt(Def1[2])
                
                let Def2=b.querySelector(".Pokemon_Stats")
                Def2=Def2.textContent.slice(6).split(",")
                Def2= parseInt(Def2[2])
                return (Def1-Def2)
            })
        }
        else{
            divs.sort((a,b)=>{
                let Def1=a.querySelector(".Pokemon_Stats")
                Def1=Def1.textContent.slice(6).split(",")
                Def1= parseInt(Def1[2])
                
                let Def2=b.querySelector(".Pokemon_Stats")
                Def2=Def2.textContent.slice(6).split(",")
                Def2= parseInt(Def2[2])
                return (Def2-Def1)
            })
        }

        ListPokemons.innerHTML="";
        divs.forEach(div =>{
            ListPokemons.appendChild(div)
        })


    })

    FilterSp_Attack.addEventListener("click",()=>{
        let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        
        if(FilterSp_Attack.checked){
            divs.sort((a,b)=>{
                let Sp_Att1=a.querySelector(".Pokemon_Stats")
                Sp_Att1=Sp_Att1.textContent.slice(6).split(",")
                Sp_Att1= parseInt(Sp_Att1[3])
                
                let Sp_Att2=b.querySelector(".Pokemon_Stats")
                Sp_Att2=Sp_Att2.textContent.slice(6).split(",")
                Sp_Att2= parseInt(Sp_Att2[3])
                return (Sp_Att1-Sp_Att2)
            })
        }
        else{
            divs.sort((a,b)=>{
                let Sp_Att1=a.querySelector(".Pokemon_Stats")
                Sp_Att1=Sp_Att1.textContent.slice(6).split(",")
                Sp_Att1= parseInt(Sp_Att1[3])
                
                let Sp_Att2=b.querySelector(".Pokemon_Stats")
                Sp_Att2=Sp_Att2.textContent.slice(6).split(",")
                Sp_Att2= parseInt(Sp_Att2[3])
                return (Sp_Att2-Sp_Att1)
            })
        }

        ListPokemons.innerHTML="";
        divs.forEach(div =>{
            ListPokemons.appendChild(div)
        })


    })

    FilterSp_Defense.addEventListener("click",()=>{
        let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        
        if(FilterSp_Defense.checked){
            divs.sort((a,b)=>{
                let Sp_Def1=a.querySelector(".Pokemon_Stats")
                Sp_Def1=Sp_Def1.textContent.slice(6).split(",")
                Sp_Def1= parseInt(Sp_Def1[4])
                
                let Sp_Def2=b.querySelector(".Pokemon_Stats")
                Sp_Def2=Sp_Def2.textContent.slice(6).split(",")
                Sp_Def2= parseInt(Sp_Def2[4])
                return (Sp_Def1-Sp_Def2)
            })
        }
        else{
            divs.sort((a,b)=>{
                let Sp_Def1=a.querySelector(".Pokemon_Stats")
                Sp_Def1=Sp_Def1.textContent.slice(6).split(",")
                Sp_Def1= parseInt(Sp_Def1[4])
                
                let Sp_Def2=b.querySelector(".Pokemon_Stats")
                Sp_Def2=Sp_Def2.textContent.slice(6).split(",")
                Sp_Def2= parseInt(Sp_Def2[4])
                return (Sp_Def2-Sp_Def1)
            })
        }

        ListPokemons.innerHTML="";
        divs.forEach(div =>{
            ListPokemons.appendChild(div)
        })


    })

    FilterSpeed.addEventListener("click",()=>{
        let divs= Array.from(ListPokemons.querySelectorAll(".PokemonCard"))
        
        if(FilterSpeed.checked){
            divs.sort((a,b)=>{
                let Speed1=a.querySelector(".Pokemon_Stats")
                Speed1=Speed1.textContent.slice(6).split(",")
                Speed1= parseInt(Speed1[5])
                
                let Speed2=b.querySelector(".Pokemon_Stats")
                Speed2=Speed2.textContent.slice(6).split(",")
                Speed2= parseInt(Speed2[5])
                return (Speed1-Speed2)
            })
        }
        else{
            divs.sort((a,b)=>{
                let Speed1=a.querySelector(".Pokemon_Stats")
                Speed1=Speed1.textContent.slice(6).split(",")
                Speed1= parseInt(Speed1[5])
                
                let Speed2=b.querySelector(".Pokemon_Stats")
                Speed2=Speed2.textContent.slice(6).split(",")
                Speed2= parseInt(Speed2[5])
                return (Speed2-Speed1)
            })
        }
        ListPokemons.innerHTML="";
        divs.forEach(div =>{
            ListPokemons.appendChild(div)
    }) 

})
}

export function MoveFilterBox(){
    MovePower.addEventListener("click",()=>{
        let divs= Array.from(ListMoves.querySelectorAll(".MoveCard"))
        
        console.log(divs)

        if(MovePower.checked){
            divs.sort((a,b)=>{
                let Power1=a.querySelector(".Move_Power")
                Power1=Power1.textContent.split(" ")
                Power1= parseInt(Power1[1])
                
                let Power2=b.querySelector(".Move_Power")
                Power2=Power2.textContent.split(" ")
                Power2= parseInt(Power2[1])
                return (Power1-Power2)
            })
        }
        else{
            divs.sort((a,b)=>{
                let Power1=a.querySelector(".Move_Power")
                Power1=Power1.textContent.split(" ")
                Power1= parseInt(Power1[1])
                
                let Power2=b.querySelector(".Move_Power")
                Power2=Power2.textContent.split(" ")
                Power2= parseInt(Power2[1])
                
                return (Power2-Power1)
            })
        }
        divs.forEach(div =>{
            div.remove();
            }) 
        divs.forEach(div =>{
        ListMoves.appendChild(div)
        }) 

    })

MoveAccuracy.addEventListener("click",()=>{
    let divs= Array.from(ListMoves.querySelectorAll(".MoveCard"))

    if(MoveAccuracy.checked){
       
        divs.sort((a,b)=>{
            let Accuracy1=a.querySelector(".Move_Accuracy")
            Accuracy1=Accuracy1.textContent.split(" ")
            Accuracy1= parseInt(Accuracy1[1])
            
            let Accuracy2=b.querySelector(".Move_Accuracy")
            Accuracy2=Accuracy2.textContent.split(" ")
            Accuracy2= parseInt(Accuracy2[1])
            return (Accuracy1-Accuracy2)
        })
    }
    else{
        divs.sort((a,b)=>{
            
            let Accuracy1=a.querySelector(".Move_Accuracy")
            Accuracy1=Accuracy1.textContent.split(" ")
            Accuracy1= parseInt(Accuracy1[1])
            
            let Accuracy2=b.querySelector(".Move_Accuracy")
            Accuracy2=Accuracy2.textContent.split(" ")
            Accuracy2= parseInt(Accuracy2[1])
            return (Accuracy2-Accuracy1)
        })
    }
    divs.forEach(div =>{
        div.remove();
        }) 
    divs.forEach(div =>{
    ListMoves.appendChild(div)
    }) 

    })

MoveLength.addEventListener("click",()=>{
    let divs= Array.from(ListMoves.querySelectorAll(".MoveCard"))
   
    if(MoveLength.checked){
        divs.sort((a,b)=>{
            let Length1=a.querySelector(".Move_Name").textContent
            Length1=Length1.length
            Length1= parseInt(Length1)
            
            let Length2=b.querySelector(".Move_Name").textContent
            Length2=Length2.length
            
            Length2= parseInt(Length2)
            return (Length1-Length2)
        })
    }
    else{
        divs.sort((a,b)=>{
            let Length1=a.querySelector(".Move_Name").textContent
            Length1=Length1.length
            Length1= parseInt(Length1)
            
            let Length2=b.querySelector(".Move_Name").textContent
            Length2=Length2.length
            
            Length2= parseInt(Length2)
            return (Length2-Length1)
        })
    }
    divs.forEach(div =>{
        div.remove();
        }) 
            
    divs.forEach(div =>{
        ListMoves.appendChild(div)
}) 

    })
}