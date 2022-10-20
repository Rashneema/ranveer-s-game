var backgroundImage
//PC
var player, playerImage
//NPC
var zombie, zombieImage, zombiesGroup
//to fire
var bullet1, bullet2, bulletGroup
//life count
var heart, brokenHeart

var comic, comicImage

var score=0

var gameState=0

//collect items
var bullets, bulletsImage, bomb, bombImage

function preload(){
    backgroundImage=loadImage("assets/background.png")

    playerImage=loadImage("assets/Player.png")

    zombieImage=loadImage("assets/Zombie.png")

    heart=loadImage("assets/Heart.png")

    brokenHeart=loadImage("assets/Heartbroken.png")

    bulletsImage=loadImage("assets/ammo.png")

    bombImage=loadImage("assets/dynamite.png")

    comicImage=loadImage("assets/comic.jpeg")
}

function setup(){
    //To size canvas as window dimensions
    createCanvas(windowWidth, windowHeight)

    player=createSprite(width/2, height/2)
    player.addImage(playerImage)
    player.scale=0.25

    player.visible=false

    comic=createSprite(width/2, height/2)
    comic.addImage(comicImage)
    comic.scale=0.6
    comic.visible=true

    bulletGroup=createGroup()

    zombiesGroup=createGroup()
}

function draw(){
    //loading image as background
    background(backgroundImage)

    //place holder text
    if(gameState===0){
        

        if(keyDown("space")){
            gameState=1
        }
    }

    if(gameState===1){
        //show player
        player.visible=true

        //hide the comic
        comic.visible=false
       

        //movement of the players
        if(keyDown("w")){
        player.y-=5
    }

        if(keyDown("s")){
        player.y+=5
    }

        if(keyDown("a")){
        player.x-=5
    }

        if(keyDown("d")){
        player.x+=5
    }

    //Aiming for the player
        if(keyDown(RIGHT_ARROW)){
            player.rotation=90
        }

        if(keyDown(LEFT_ARROW)){
            player.rotation=270
        }

        if(keyDown(UP_ARROW)){
            player.rotation=0
        }

        if(keyDown(DOWN_ARROW)){
            player.rotation=180
        }

        //To make player shoot bullets
        if(keyDown("space")){
            //To create a frequency of bullets
            if(frameCount % 10 ===0){


                //Depending on which side the player is facing
                if(player.rotation===0){
                    bullet1=createSprite(player.x+30, player.y, 5, 10)
                    bullet1.velocityY=-20
                    bullet1.depth=player.depth-1
                    bullet1.shapeColor="yellow"

                    bullet2=createSprite(player.x-30, player.y, 5, 10)
                    bullet2.velocityY=-20
                    bullet2.depth=player.depth-1
                    bullet2.shapeColor="yellow"

                    bulletGroup.add(bullet1)
                    bulletGroup.add(bullet2)
            }

                if(player.rotation===90){
                    bullet1=createSprite(player.x, player.y+30, 10, 5)
                    bullet1.velocityX=+20
                    bullet1.depth=player.depth-1
                    bullet1.shapeColor="yellow"

                    bullet2=createSprite(player.x, player.y-30, 10, 5)
                    bullet2.velocityX=+20
                    bullet2.depth=player.depth-1
                    bullet2.shapeColor="yellow"

                    bulletGroup.add(bullet1)
                    bulletGroup.add(bullet2)
                }

                if(player.rotation===180){
                    bullet1=createSprite(player.x-30, player.y, 5, 10)
                    bullet1.velocityY=+20
                    bullet1.depth=player.depth-1
                    bullet1.shapeColor="yellow"

                    bullet2=createSprite(player.x+30, player.y, 5, 10)
                    bullet2.velocityY=+20
                    bullet2.depth=player.depth-1
                    bullet2.shapeColor="yellow"

                    bulletGroup.add(bullet1)
                    bulletGroup.add(bullet2)
                }

                if(player.rotation===270){
                 bullet1=createSprite(player.x, player.y-30, 10, 5)
                 bullet1.velocityX=-20
                 bullet1.depth=player.depth-1
                 bullet1.shapeColor="yellow"

                 bullet2=createSprite(player.x, player.y+30, 10, 5)
                 bullet2.velocityX=-20
                 bullet2.depth=player.depth-1
                 bullet2.shapeColor="yellow"

                 bulletGroup.add(bullet1)
                 bulletGroup.add(bullet2)
                }
        }

    }

    bulletGroup.overlap(zombiesGroup,(bullet1, zombie1)=>{
        bullet1.destroy()
        zombie1.destroy()

        score+=1
    })

    //spawning zombies
    spawnZombies()

    textSize(20)
    fill("white")
    text("score="+score,width-150, 20)
    }

    drawSprites()
}

function spawnZombies(){
//to maintain frequency
    if(frameCount % 100 === 0){
        zombie=createSprite(random([0,width]),Math.round(random(0, height)))
        zombie.addImage(zombieImage)
        zombie.scale=0.25

        zombiesGroup.add(zombie)
        
        if(zombie.position.x<=width/2){
            zombie.velocityX +=2
            zombie.rotation=90
        }  
        else{
            zombie.velocityX -=2
            zombie.rotation=270
        }
    }
}