var butColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClikedPattern = [];
var level = 0 ;
var started = 0 ;
var no_of_clicks = 0 ;

$(document).keypress(function()
{
	if(started === 0)
	{	
		$("h1").text("Level 0");
		nextSequence();
		started = 1 ;
	}
});

$(".btn").on( "click", function() 
{
	var userColorChosen = $(this).attr("id");
	playSound(userColorChosen);
	userClikedPattern.push(userColorChosen);
	animatePress(userColorChosen);
	// console.log(userClikedPattern);
	no_of_clicks ++ ;
	if( no_of_clicks <= level)
		chkAns(no_of_clicks);
});

function nextSequence()
{
	level++ ;
	$("h1").text("Level "+level);
	var ranNum = (Math.floor(Math.random()*4));
	var randColorChoosen = butColor[ranNum];  
	gamePattern.push(randColorChoosen);	
	playSound(randColorChoosen);
	var id_selector = "#" + randColorChoosen;
	$("#" + randColorChoosen).fadeOut(100).fadeIn(100);
	// console.log(gamePattern);
}

function playSound(name)
{
	var audio = new Audio("./sounds/"+name+".mp3");
	audio.play();
}

function animatePress(currColor)
{
	var selector = "." + currColor ;
	$(selector).addClass("pressed");
	setTimeout(function(){
		$(selector).removeClass("pressed");
	},100);
}

function chkAns(level_no)
{
	var flag = 1 ;
	for(var i = 0 ; i < level_no ; i++ )
	{
		if(gamePattern[i] !== userClikedPattern[i])
		{
			console.log("Wrong!!");
			playSound("wrong");
			$("body").addClass("game-over");
			setTimeout(function(){
				$("body").removeClass("game-over");
			},500);
			$("h1").text("Game Over, Press Any Key To Restart!");
			start_over();
			flag = 0 ;
		}
	}
	if( flag === 1 && level_no === level)
	{
		console.log("Win!!");
		setTimeout(nextSequence,1000);
		no_of_clicks = 0 ;
		userClikedPattern = [];
	}
}

function start_over()
{
	started = 0 ; 
	level = 0 ; 
	setTimeout(function()
	{
		console.log("Restart");	
	},1000);
	gamePattern = [] ;
	userClikedPattern = [];
	no_of_clicks = 0 ;
}