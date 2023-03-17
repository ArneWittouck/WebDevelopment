const setup = () => {
	let btnValideer=document.getElementById("btnValideer");
	btnValideer.addEventListener("click", valideer);
};

const valideer = () => {
	valideerVoornaam();
	valideerNaam();
	valideerGeboortedatum();
	valideerEmail();
	valideerKinderen();
	let txtVoornaam = document.getElementById("txtVoornaam");
	let txtNaam = document.getElementById("txtNaam");
	let txtBirth = document.getElementById("dateBirth");
	let txtEmail = document.getElementById("txtEmail");
	let nrKids = document.getElementById("nrKids");
	let p = document.querySelector('#output');
	if (txtVoornaam.className === "" && txtNaam.className === "" && txtBirth.className === "" &&
		txtEmail.className === "" && nrKids.className !== "invalid") {
		p.innerHTML = 'proficiat!';
	} else {
		p.innerHTML = '';
	}
};

const valideerVoornaam = () => {
	let txtVoornaam = document.getElementById("txtVoornaam");
	let errVoornaam = document.getElementById("errVoornaam");
	let voornaam = txtVoornaam.value.trim();
	if (voornaam.length > 30) {
		txtVoornaam.className="invalid"; // invalid class instellen
		errVoornaam.innerHTML = "max. 30 karakters";
	} else {
		txtVoornaam.className=""; // alle classes verwijderen
		errVoornaam.innerHTML = "";
	}
};

const valideerNaam = () => {
	let txtNaam = document.getElementById("txtNaam");
	let errNaamLength = document.getElementById("errNaamLength");
	let errNaamEmpty = document.getElementById("errNaamEmpty");
	let naam = txtNaam.value.trim();
	if (naam.length > 50) {
		txtNaam.className="invalid";
		errNaamLength.innerHTML = "max. 50 karakters";
		errNaamEmpty.innerHTML = "";
	} else if (naam === "") {
		txtNaam.className="invalid";
		errNaamEmpty.innerHTML = "verplicht veld";
		errNaamLength.innerHTML = "";
	} else {
		txtNaam.className="";
		errNaamLength.innerHTML = "";
		errNaamEmpty.innerHTML = "";
	}
};

const valideerGeboortedatum = () => {
	let txtBirth = document.getElementById("dateBirth");
	let errBirthEmpty = document.getElementById("errBirthEmpty");
	let errBirthWrong = document.getElementById("errBirthWrong");
	let date = txtBirth.value.trim();
	if (date.length > 0) {
		date = date.substring(4,5) + date.substring(7,8) + date.length;
		console.log(date);
	}
	if (date === "") {
		txtBirth.className="invalid";
		errBirthEmpty.innerHTML = "verplicht veld";
		errBirthWrong.innerHTML = "";
	} else if (date !== "--10") {
		txtBirth.className="invalid";
		errBirthEmpty.innerHTML = "";
		errBirthWrong.innerHTML = "formaat is niet jjjj-mm-dd";
	} else {
		txtBirth.className="";
		errBirthEmpty.innerHTML = "";
		errBirthWrong.innerHTML = "";
	}
};

const valideerEmail = () => {
	let txtEmail = document.getElementById("txtEmail");
	let errEmailEmpty = document.getElementById("errEmailEmpty");
	let errEmailAt = document.getElementById("errEmailAt");
	let errEmailChar = document.getElementById("errEmailChar");
	let email = txtEmail.value.trim();
	if (email === "") {
		txtEmail.className="invalid";
		errEmailEmpty.innerHTML = "verplicht veld";
		errEmailAt.innerHTML = "";
		errEmailChar.innerHTML = "";
	} else if (countAt(email) !== 1) {
		txtEmail.className="invalid";
		errEmailEmpty.innerHTML = "";
		errEmailAt.innerHTML = "geen geldig email adres";
		errEmailChar.innerHTML = "";
	} else if (countBefore(email) < 1 || countAfter(email) < 1) {
		txtEmail.className="invalid";
		errEmailEmpty.innerHTML = "";
		errEmailAt.innerHTML = "";
		errEmailChar.innerHTML = "geen geldig email adres";
	} else {
		txtEmail.className="";
		errEmailEmpty.innerHTML = "";
		errEmailAt.innerHTML = "";
		errEmailChar.innerHTML = "";
	}
};

const countAt = (input) => {
	let end = false;
	let result = 0;
	while (!end) {
		if (input.indexOf("@") >= 0) {
			input = input.substring(input.indexOf("@")+1);
			result ++;
		} else {
			end = true;
		}
	}
	return result;
}

const countBefore = (input) => {
	let result = 0;
	if (input.indexOf("@") >= 0) {
		result = input.substring(0, input.indexOf("@")).length;
		console.log(input.substring(0, input.indexOf("@")));
	}
	return result;
}

const countAfter = (input) => {
	let result = 0;
	if (input.indexOf("@") >= 0) {
		result = input.substring(input.indexOf("@")+1).length;
		console.log(input.substring(input.indexOf("@")+1));
	}
	return result;
}

const valideerKinderen = () => {
	let nrKids = document.getElementById("nrKids").value;
	let errKinderenNeg = document.getElementById("errKinderenNeg");
	let errKinderenHigh = document.getElementById("errKinderenHigh");
	if (nrKids < 0) {
		nrKids.className="invalid";
		errKinderenNeg.innerHTML = "is geen positief getal";
		errKinderenHigh.innerHTML = "";
	} else if (nrKids >= 99) {
		nrKids.className="invalid";
		errKinderenNeg.innerHTML = "";
		errKinderenHigh.innerHTML = "is te vruchtbaar";
	} else {
		nrKids.className="";
		errKinderenNeg.innerHTML = "";
		errKinderenHigh.innerHTML = "";
	}
}

window.addEventListener("load", setup);