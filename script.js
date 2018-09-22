const field = document.querySelector("#field");
const arrowone = document.querySelector("#arrow1");
const arrowtwo = document.querySelector("#arrow2");

arrowone.classList.add("hidden");

let vscomp = false;
var end = false;
var tie = false;

let gameboard = (function(){
	let board = [" "," "," "," "," "," "," "," "," "];
	return {board};
})();

function Player(name,mark,isTurn,counter=0) {
	return {name,mark,isTurn,counter};
}

let p1 = Player("Player one","X",true);
let p2 = Player("Player two","O",false);
let pc = Player("Computer", "O",false);
const patterns = [[0,1,2],[3,4,5],[6,7,8],
				  [0,3,6],[1,4,7],[2,5,8],
				  [0,4,8],[2,4,6]];

function render() {
	for (key in gameboard.board) {
		field.innerHTML += '<div class="block" data-attribute="'+ key +'" onclick="markspot(event);">'
								+ gameboard.board[key] + '</div>'; 
	}
	const blocks = document.querySelectorAll(".block");
	blocks.forEach (function(el){
		if  (p1.isTurn){
			el.classList.add("blockone");
		}
		else{
			el.classList.add("blocktwo");
		}
	});
	arrowtwo.classList.toggle("hidden");
	arrowone.classList.toggle("hidden");
}

function checkpatterns(player) {
	for (key in patterns){
		let win = true;
		for (j in patterns[key]) {	
			if (player.mark != gameboard.board[patterns[key][j]]) {
				win = false;
			}
		}
		if (win){
			document.querySelector("#msg").innerText = player.name + " wins !";
			console.log("end");
			end = true;
			break;
		}
		else{
			win=true;
		}
	}
	player.counter++;
	if (!end && player.counter == 5){
		tie = true;
		end = true;
		document.querySelector("#msg").innerText = "It's a tie !"
		console.log("tie");
	}
}

function markspot(e) {
	if (!end){
		let el = e.target;
		if (el.innerText == "" ){
			if (p1.isTurn) {
				gameboard.board[el.getAttribute('data-attribute')] = p1.mark;
				checkpatterns(p1);
			}
			else {
				gameboard.board[el.getAttribute('data-attribute')] = p2.mark;
				checkpatterns(p2);
			}
			//switch player or let cpu play
			if (!vscomp){
				p1.isTurn = !p1.isTurn;
				p2.isTurn = !p2.isTurn;
			}
			else if (!end){
				computerplay();
				checkpatterns(pc);
			}
			//update board
			while (field.firstChild) {
				field.removeChild(field.firstChild);
			}
			render();
		}
		else {
			console.log(el.innerText);
		}
	}
}

function computerplay () {
	let ix = Math.floor(Math.random()*9);
	while (gameboard.board[ix] != " "){
		ix = Math.floor(Math.random()*9);
	}
	gameboard.board[ix] = pc.mark;
}

function reset() {
	gameboard.board.forEach(function(el,ix,arr){
		arr[ix] = " ";
	});
	end=false;
	tie=false;
	p1.counter = 0;
	p2.counter = 0;
	pc.counter = 0;
	while (field.firstChild) {
		field.removeChild(field.firstChild);
	}
	render();
	document.querySelector("#msg").innerText = "";
}

function twoplayer(e){
	e.target.parentNode.classList.add("hidden");
	document.querySelector("#turns").classList.remove("hidden");
	vscomp = false;
}

function vscpu(e){
	e.target.parentNode.classList.add("hidden");
	document.querySelector("#turns").classList.add("hidden");
	vscomp = true;
}

render();