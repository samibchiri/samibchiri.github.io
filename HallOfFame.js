
let HallOfFameCont= document.getElementById("HallOfFameCont")
let HallOfFameIntro= document.querySelector(".HallOfFameIntro")

let HallText =document.getElementById("HallText")
let OfText =document.getElementById("OfText")
let FameText =document.getElementById("FameText")

let Congratulations= document.getElementById("Congratulations")
let WelcomeFame= document.getElementById("WelcomeFame")


//HallOfFameAnimation()

export function HallOfFameAnimation(Party,Name,Winner){
    
    console.log(Party)
    console.log(Name)
    let NumPok=6

    //document.querySelector("h1").style.display = "none";
    document.documentElement.style.fontFamily = 'initial';  // For the <html> element
    document.body.style.fontFamily = 'initial';

    document.querySelector("h1").style.display="none"
    document.querySelector(".Centering").style.display="none"
    HallOfFameIntro.style.display="flex"

    document.body.style.background=" linear-gradient(rgb(35, 35, 35),rgb(17, 17, 17),black)"

     
    let TempFameCards=(Array.from(HallOfFameIntro.querySelectorAll(".FameCard")))
    let ListOfFameCards=[]
    
    let PartyLength=Party.length
    

    for(let i=0;i<TempFameCards.length;i++){
        if(i<PartyLength){
            TempFameCards[i].querySelector(".FameCardName").textContent=Party[i].Name
            TempFameCards[i].querySelector(".FameSprite").src=Party[i].SpriteBack
            TempFameCards[i].querySelector(".FameCardLevel").textContent=Party[i].Level
    
        }
    }
    setTimeout(()=>{

        HallOfFameAnimationCard(Party)
        
        setTimeout(()=>{
            ShowCongratzText(Name,Winner)

            setTimeout(()=>{
                ShowWelcomeText()
                HallOfFameTextShow()
            },3000)
            
        },NumPok*3000+500*NumPok+1000)
    },1000)
    
}

//ShowWelcomeText()
//HallOfFameTextShow()
//setInterval(HallOfFameAnimation, 60000);

//HallOfFameAnimation()

function HallOfFameAnimationCard(Party){
   
    let ShowDuration=3000
    
    let TempFameCards=(Array.from(HallOfFameIntro.querySelectorAll(".FameCard")))
    
    
    let ListOfFameCards=[]
    
    let PartyLength=Party.length
    
    for(let i=0;i<TempFameCards.length;i++){
        if(i<PartyLength){
            TempFameCards[i].querySelector(".FameCardName").textContent=Party[i].Name
            TempFameCards[i].querySelector(".FameSprite").src=Party[i].SpriteBack
            TempFameCards[i].querySelector(".FameCardLevel").textContent=Party[i].Level
    
        }
        else{
            TempFameCards[i].style.display="none"
        }
        if(TempFameCards[i].querySelector(".FameCardName").textContent!=""){
            ListOfFameCards.push(TempFameCards[i])
        }
        else{
            TempFameCards[i].style.display="none"
        }
    }

    console.log(ListOfFameCards)
    for(let i=0;i<ListOfFameCards.length;i++){
        
         ListOfFameCards[i].style.display="none"
    
    setTimeout(()=>{
        ListOfFameCards[i].style.animation=`ShowHallOfFameCard linear ${ShowDuration/1000}s forwards 0s`
        ListOfFameCards[i].style.display="flex"
        
        setTimeout(()=>{
            console.log("Change img")
            ListOfFameCards[i].querySelector(".FameSprite").src=Party[i].SpriteFront
        },ShowDuration*i/1000+900)

        let Length=ListOfFameCards.length
        Length= Math.floor(Length/2)
        console.log(ListOfFameCards.length)
        console.log(Length)
        let OffSet=0
        
        if(ListOfFameCards.length==4){
            if(i%2==0){
                OffSet=10
            }
            else{
                OffSet=20
            }
        }
        setTimeout(()=>{
        
        if(i<Length && ListOfFameCards.length>3){
        ListOfFameCards[i].style.top = "700px"
        ListOfFameCards[i].style.left = `${20+30*i+OffSet}%`
        
        }
        else{
            ListOfFameCards[i].style.top = "450px"
            if(i==ListOfFameCards.length-2){
                ListOfFameCards[i].style.left = `${20+30*(0)+OffSet}%`
            }
            else if(i==ListOfFameCards.length-1){
                console.log("LAst")
                ListOfFameCards[i].style.left = `${20+30*(1)+OffSet}%`
            }
            else{
                ListOfFameCards[i].style.left = `${20+30*(2)+OffSet}%`
            } 
            console.log((20+30*(i-Length)))
        }
        
         },ShowDuration/5*4)
        
        },ShowDuration*i)
    }
    
    

    setTimeout(()=>{
        console.log("RANNAN")
        GlowAlive()
    },ShowDuration*ListOfFameCards.length+1000)

}




//HallOfFameAnimationCard()

//GlowAlive()
function GlowAlive(){
    let TempFameCards=(Array.from(HallOfFameIntro.querySelectorAll(".FameCard")))
    let ListOfFameCards=[]
    
    for(let i=0;i<TempFameCards.length;i++){

        if(TempFameCards[i].querySelector(".FameCardName").textContent!=""){
            ListOfFameCards.push(TempFameCards[i])
        }
    }
    
     
    let Length=ListOfFameCards.length
    Length= Math.floor(Length/2)
    
    for(let i=0;i<ListOfFameCards.length;i++){
        
        ListOfFameCards[i].style.animation=""
       
        ListOfFameCards[i].style.transform="translate(-50%,-50%)"
          /*  
        if(i<Length){
            ListOfFameCards[i].style.top = "700px"
            ListOfFameCards[i].style.left = `${20+30*i}%`
             }
        else{
            ListOfFameCards[i].style.top = "450px"
            if(i==ListOfFameCards.length-2){
              
                ListOfFameCards[i].style.left = `${20+30*(i-Length+1)}%`
            }
            else if(i==ListOfFameCards.length-1){
                console.log("LAst")
                ListOfFameCards[i].style.left = `${20+30*(1)}%`
            }
            else{
                ListOfFameCards[i].style.left = `${20+30*(i-Length)}%`
            } 
            console.log((20+30*(i-Length)))
        }
        */
        ListOfFameCards[i].style.transition="0.5s"
        
        let ElapsedTime=0
        let IntervalSpeed=100
        let ColorDuration=500
        
        let intervalID = setInterval(()=>{
            ElapsedTime+=IntervalSpeed
            if(ElapsedTime>ColorDuration)
            ListOfFameCards[i].style.boxShadow=`0px 0px 3px 2px rgb(255, 15, 15)`
            if(ElapsedTime>ColorDuration*2){
                ListOfFameCards[i].style.boxShadow=`0px 0px 15px 10px rgb(255, 15, 15)`
            }
            if(ElapsedTime>ColorDuration*3){
                //console.log(ElapsedTime)
                ListOfFameCards[i].style.boxShadow=`0px 0px 3px 2px rgb(21, 126, 255)`
            }
            if(ElapsedTime>ColorDuration*4){
                ListOfFameCards[i].style.boxShadow=`0px 0px 20px 12px  rgb(21, 126, 255)`
            }
            if(ElapsedTime>ColorDuration*5){
                //console.log(ElapsedTime)
                ListOfFameCards[i].style.boxShadow=`0px 0px 3px 2px  rgb(255, 237, 34)`
            }
            if(ElapsedTime>ColorDuration*6){
                ListOfFameCards[i].style.boxShadow=`0px 0px 20px 12px   rgb(255, 237, 34)`
            }
            if(ElapsedTime>ColorDuration*7){
                //console.log(ElapsedTime)
                ListOfFameCards[i].style.boxShadow=`0px 0px 3px 2px rgb(255, 255, 255)`
            }
            if(ElapsedTime>ColorDuration*9){
                ListOfFameCards[i].style.boxShadow=`0px 0px 25px 15px  rgb(255, 255, 255)`
            }
            if(ElapsedTime>ColorDuration*10){
                ListOfFameCards[i].style.boxShadow=`0px 0px 15px 10px  rgb(255, 255, 255)`
                clearInterval(intervalID);
            }
        },IntervalSpeed)

        //box-shadow: 0px 0px 10px 5px rgb(255, 15, 15);
        //box-shadow: 0px 0px 10px 5px rgb(21, 126, 255);
        //box-shadow: 0px 0px 10px 5px rgb(255, 237, 34);
        //box-shadow: 0px 0px 10px 5px rgb(255, 255, 255);
    }
    

}



setTimeout(()=>{
    //HallOfFameTextShow()
},500)


function HallOfFameTextShow(){
    console.log(document.querySelector(".UnderLine").clientWidth)
     
    
    setTimeout(()=>{
        document.querySelector(".HallUnderLine").classList.add("wider")

        HallText.querySelector(".text").style.animation="FlipCard 1s 1s ease forwards"
        document.querySelector(".HallUnderLine").style.transition="0s"

        setTimeout(()=>{
            document.getElementById("HallShow").style.opacity="1"
        
            document.querySelector(".HallUnderLine").classList.add("remove")
           
        },1300)

    },2000)

    setTimeout(()=>{
        document.querySelector(".SmallUnderLine").classList.add("wider")
   
        setTimeout(()=>{
            document.getElementById("SmallerOF").style.opacity="1"
        
            document.querySelector(".SmallUnderLine").classList.add("remove")
           
        },1300)
        
        OfText.querySelector(".text").style.animation="FlipSmallCard 1s 1s ease forwards"
       
    },4300)

    setTimeout(()=>{
        document.querySelector(".UnderLine").classList.add("wider")
        FameText.querySelector(".text").style.animation="FlipCard 1s 1s  ease forwards"
        
        setTimeout(()=>{
            document.getElementById("FameShow").style.opacity="1"
        
            document.querySelector(".UnderLine").classList.add("remove")
            
        },1300)
        
    },6600)
   
   
}


setTimeout(()=>{
    //ShowCongratzText("Champion Blue")
},1000)


function ShowCongratzText(Name,Winner ){
    console.log(Name)
    if(Winner=="Player2"){
        Congratulations.textContent=`Congratulations ${Name}! (not you)`
    }
    else{
        Congratulations.textContent=`Congratulations ${Name}!`

    }
    
    let NameWordNum= (Name.split(" ").length)

    let CongratzText=Congratulations.textContent.split(" ")

    Congratulations.textContent=""
    setTimeout(()=>{

        
        for(let i in CongratzText){
            console.log(CongratzText[i])
            
            Congratulations.style.opacity="1"

            let span = document.createElement("span"); 
            span.className = "CongratzText";
            span.innerHTML = CongratzText[i]+ "&nbsp;";
            Congratulations.appendChild(span)

            if(i==0){
                
            }
            else if(i>0 && i-1<NameWordNum){
                span.style.fontSize="2.7rem"
                if(i==1){
                    span.style.marginLeft="10px"
                    
                }
                
            }
            else{
                span.style.fontSize="1.5rem"
            }

            if (i==0){
                span.style.animation= "FadeHallTextIn 1s forwards";
        
            }
            else if(i>0 && i-1<NameWordNum){
                setTimeout(()=>{
                    span.style.animation= "FadeHallTextIn 1s forwards";
                    
                },600)
            }
            else{
                setTimeout(()=>{
                    
                    span.style.animation= "FadeHallTextIn 1s forwards";
                 },2000)

            }
        }
    },100)
}

//ShowWelcomeText()

setTimeout(()=>{
    //ShowWelcomeText()
},3000)
function ShowWelcomeText(){

    console.log(WelcomeFame.textContent)
    
    let WelcomeText=WelcomeFame.textContent.split(" ")
    WelcomeFame.textContent=""
    
    for(let i in WelcomeText){
        let span = document.createElement("span"); 
        span.className = "WelcomeFameTextClass";
        span.innerHTML = WelcomeText[i]+ "&nbsp;";
        WelcomeFame.appendChild(span)

        if(i==0){
            span.style.fontSize="3rem"
        }

        if(i==0){
            span.style.animation= "FadeWelcomeLeftIn 1s forwards";
        }
        else{
            setTimeout(()=>{
                span.style.animation= "FadeWelcomeRightIn 1s forwards";
            },500)
        }
        
    }
    WelcomeFame.style.opacity="1"

}


