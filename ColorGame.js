var R,G,B,r,g,b;
var game_mode,ans,v; 
var colors = [];

var main_dsply = document.getElementsByTagName("h1")[0];
var msg_dsply = document.getElementById("msg");
var clr_dsply = document.getElementById("Ans_Color");

var reset_btn = document.getElementById("rset_btn"); 
var easy_btn = document.getElementById("easy_btn");
var hard_btn = document.getElementById("hard_btn");

var squares = document.querySelectorAll(".square");

function getRandom(l,r) {
	l = Math.ceil(l);
	r = Math.floor(r);
	return Math.floor(Math.random()*(r-l+1))+l;
}

function RGB_Randomize() {
	r=getRandom(0,255);
	g=getRandom(0,255);
	b=getRandom(0,255);
}

function Taken(x) {
	for (var i=x;i>=0;--i) {
		if ((r===colors[i].R)&&(g===colors[i].G)&&(b===colors[i].B)) {
			return true;
		}
	}
	return false;
}

function RGB_Check() {
	var x = Number(this.id[2])-1;
	if ((v)||((game_mode===1)&&(x>=3))) { return; }
	if ((R===colors[x].R)&&(G===colors[x].G)&&(B===colors[x].B)) {
		Correct_Scrn(this.style.backgroundColor);
		msg_dsply.textContent = "Correct!!";
		v = true;
	}
	else {
		this.style.backgroundColor = "#232323";
		msg_dsply.textContent = "Try again";
	}
}

function Correct_Scrn(clr) {
	main_dsply.style.backgroundColor = clr;
	reset_btn.textContent = "Play again?"
	for (var i=0;i<=2;++i) {
		squares[i].style.backgroundColor = clr;
	}
	if (game_mode===2) {
		for (var i=3;i<=5;++i) {
			squares[i].style.backgroundColor = clr;
		}
	}
}

function Switch_mode(x) {
	var tmp;
	if (x!==game_mode) {
		easy_btn.classList.toggle("selected");
		hard_btn.classList.toggle("selected");

		tmp = x;
		x = game_mode;
		game_mode = tmp;
		if (game_mode===1) {
			GenerateEasy();
		}
		else { GenerateHard(); }
	}
}

function Clear() {
	while (colors.length>0) { colors.pop(); }
	if (v) { main_dsply.style.backgroundColor = "steelblue" }
	v = false;
	reset_btn.textContent = "New Colors";
	msg_dsply.textContent = "";
}

function GenerateHard() {
	Clear();
	ans = getRandom(0,5);
	RGB_Randomize();

	for (var i=0;i<=5;++i) {
		while (Taken(i-1)) {
			RGB_Randomize();
		}	
		colors.push({R: r, G: g, B: b});
		if (i===ans) {
			R=r; G=g; B=b;
			clr_dsply.textContent = "RGB("+R.toString()+", "+G.toString()+", "+B.toString()+")";
		}
		squares[i].style.backgroundColor="rgb("+r.toString()+", "+g.toString()+", "+b.toString()+")";
	}
}

function GenerateEasy() {
	Clear();
	ans = getRandom(0,2);
	RGB_Randomize();
	
	for (var i=0;i<=2;++i) {
		while (Taken(i-1)) {
			RGB_Randomize();
		}	
		colors.push({R: r, G: g, B: b});
		if (i===ans) {
			R=r; G=g; B=b;
			clr_dsply.textContent = "RGB("+R.toString()+", "+G.toString()+", "+B.toString()+")";
		}
		squares[i].style.backgroundColor = "rgb("+r.toString()+", "+g.toString()+", "+b.toString()+")";
	}
	
	for (var i=3;i<=5;++i) {
		squares[i].style.backgroundColor = "#232323";
	}
}

function EventSet() {
	reset_btn.addEventListener("click", function() {
		if (game_mode===1) {
			GenerateEasy();
		}
		else { GenerateHard(); }
	},)

	easy_btn.addEventListener("click", function() { Switch_mode(1); });
	hard_btn.addEventListener("click", function() { Switch_mode(2); });

	for (var i=0;i<=5;++i) {
		squares[i].addEventListener("click", RGB_Check);
	} 
}


game_mode = 2;
GenerateHard();
EventSet();