
var m=[0,0,0,0,0,0,0];

/* Calcul du syndrome */
function syndrome(v)
{ var s1;var s2;var s3;
s1=(v[0]+v[2]+v[4]+v[6])%2;
s2=(v[1]+v[2]+v[4]+v[5])%2;
s3=(v[3]+v[4]+v[5]+v[6])%2;
return([s1,s2,s3]);
}

/* renvoie le numéro de la réponse mensongère - 0 si pas de mensonge */
function erreur(v)
{ var e;var s=syndrome(v);var aux=s[0]+2*s[1]+4*s[2];
switch (aux){
case 0:
e=0; break;
case 1:
 e=1;break;
case 2:
 e=2;break;
case 3:
 e=3;break;
case 4:
 e=4;break;
case 7:
 e=5;break;
case 6:
 e=6;break;
case 5:
 e=7;break;
}
return(e);
}


/*correction*/
function bon_perso(v)
{
var e=erreur(v);var n=0;
if (e!=0) {v[e-1]=(v[e-1]+1)%2};
  for (i=0;i<4;i++)
  {
  n=n+v[3-i]*Math.pow(2,i);
  };
  return(n);
  }

/*affichage réponse */
function affiche(v)
{var a=erreur(v);
var b=bon_perso(v); 
var c=document.getElementById(String(b));
c.className ="suspect"; /* Encadre en rouge le bon personnage */
if (a==0) 
{document.getElementById("reponse").textContent="Vous n'avez pas menti. Vous avez choisi le personnage encadré en rouge."}
 else {document.getElementById("reponse").textContent="Vous avez menti à la question "+String(a)+
". Vous avez choisi le personnage encadré en rouge.";
document.getElementById("Q"+String(a)).className+="ment";}  /* colore en rouge la question à laquelle on a menti */
if (a!=0 && m[a-1]==0)
{document.getElementById("b"+String(a)+"N").className="boutonment"}
    else if (a!=0) {document.getElementById("b"+String(a)+"O").className="boutonment"};
}

/*Réinitialiser pour rejouer */
function rejouer(t) {
m=[0,0,0,0,0,0,0];
document.getElementById("reponse").textContent="";
  for (i=0;i<3;i++)
  {  for (j=0;j<5;j++)
      { if (i!=1 ||  (j!=0 && j!=5))
      {t.rows[i].cells[j].className="normal";}; }
  }
  for (k=1;k<8;k++)
  { document.getElementById("Q"+String(k)).className="";
document.getElementById("b"+String(k)+"O").className="";
document.getElementById("b"+String(k)+"N").className="";
  }
}



/*Construction du tableau de cartes */
var L=248; var l=141; //taille des images


function shuffle(array) {     //pour réordonner les éléments d'un tableau (battage des cartes)
  var currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var cartes=[]; 
  for (j=0;j<16;j++)
  {cartes.push(j)
  }
cartes=shuffle(cartes);


function construire(t)
{var i=0; //première ligne, 6 cartes
ligne=t.insertRow(-1);
  for (j=0;j<6;j++)
  {cellule=ligne.insertCell(j);
//  cellule.innerHTML += cartes[j];
  cellule.style.width=l;
  cellule.style.height=L;
cellule.className += "normal"; 
T.rows[i].cells[j].id=String(cartes[j]);
   cellule.style.backgroundImage='url(images/'+String(cartes[j])+'.jpg)';
   };
i+=1;
ligne=t.insertRow(-1);  //deuxième ligne : 4 cartes
  for (j=0;j<6;j++)
  {cellule=ligne.insertCell(j);
//  cellule.innerHTML += cartes[6*i+j-1];
  cellule.style.width=l;
  cellule.style.height=L;
    if (j!=0 && j!=5)
     {cellule.className += "normal"; 
T.rows[i].cells[j].id=String(cartes[6*i+j-1]);
   cellule.style.backgroundImage='url(images/'+String(cartes[6*i+j-1])+'.jpg)';
      };
  };
i+=1;
ligne=t.insertRow(-1);  //troisième ligne : 6 cartes
  for (j=0;j<6;j++)
  {cellule=ligne.insertCell(j);
//  cellule.innerHTML += cartes[6*i+j-2];
  cellule.style.width=l;
  cellule.style.height=L;
cellule.className += "normal"; 
T.rows[i].cells[j].id=String(cartes[6*i+j-2]);
   cellule.style.backgroundImage='url(images/'+String(cartes[6*i+j-2])+'.jpg)';
  };
//}
}

var T = document.getElementById("tableau");
construire(T);

function oui(k){
m[k]=1;
document.getElementById("b"+String(k+1)+"O").className="clic";
document.getElementById("b"+String(k+1)+"N").className="";
}

function non(k){
m[k]=0;
document.getElementById("b"+String(k+1)+"N").className="clic";
document.getElementById("b"+String(k+1)+"O").className="";
}

var intervalId = setInterval(function () { if (MtPopUpList) { LanguageMenu = new MtPopUpList(); var langMenu = document.getElementById(LanguageMenu_popupid); var origLangDiv = document.createElement("div"); origLangDiv.id = "OriginalLanguageDiv"; origLangDiv.innerHTML = "<span id='OriginalTextSpan'>ORIGINAL: </span><span id='OriginalLanguageSpan'></span>"; langMenu.appendChild(origLangDiv); LanguageMenu.Init('LanguageMenu', LanguageMenu_keys, LanguageMenu_values, LanguageMenu_callback, LanguageMenu_popupid); window["LanguageMenu"] = LanguageMenu; clearInterval(intervalId); } }, 1); </script>