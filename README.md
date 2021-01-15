# POO-JS-Role-Play-Group2

Projet POO
RPG: Jeu de rôle
Les éléments du jeux (objets)
Le jeu comporte au minimum 4 classes:
1) Le joueur
Un joueur comporte:
● des points de vies (10 points de vie au départ)
● des points d’expériences (0 point d’expériences au départ)
● des points de force (1 point de force au départ)
● des points d’endurance (1 point d’endurance au départ)
● des armes (1 épée qui apport +1 de force au départ)
● des sous (20 pièces au départ)
Un joueur peut:
● combattre (S’il bat un monstre, il récupère les sous et armes du monstre et gagne 1
point d’expérience. S’il perd contre le monstre, il perd un point de vie)
● fuir (S’il fuit un monstre, il perd 1 point d’expérience sauf si déjà à 0)
● mourir (S’il perd tous ses points de vie, il meurt et la partie est terminée)
● équiper une arme (La force et/ou l’endurance de l’arme, s’ajoute à la force et/ou
l’endurance du joueur tant que l’arme est équipée. Une arme équipée ne peut pas
être vendue)
● déséquiper une arme (La force et/ou l’endurance de l’arme, s’enlève à la force et/ou
l’endurance du joueur une fois l’arme déséquipée. Une arme déséquipée peut être
vendue)
● acheter une arme (Il est possible d’acheter une arme à un PNJ qui a au moins le
même nombre de point d’expérience que le joueur et échanger le nombre de sous
contre le prix de l’arme)
● vendre une arme déséquipée (Il est possible de vendre une arme déséquipée à
n’importe quel PNJ et recevoir 50% du prix de l’arme)
● échanger 100 sous contre 1 point de force ou d’endurance (Cette action peut se
faire n’importe quand)
● Gagner la partie une fois 50 points d’expérience atteint
2) Personnage non joueur (PNJ)
Un PNJ:
● des points d’expériences (aléatoirement de 1 à 50)
● des armes (Les armes qu’il possède doivent avoir une force et/ou endurance
proportionnel à ses points d’expérience)
Un PNJ peut:
● acheter (il peut acheter n’importe quelle arme et donne 50% de la valeur de l’arme
au joueur)
● vendre (il cède une de ses armes contre la valeur de l’arme)
N.B: Il n’y a pas de notion de sous avec le PNJ et peut vendre les armes qu’il possède de
manière illimitée. Acheter une arme d’un joueur ne permet pas de l’ajouter aux armes qu’il
possède.
3) Monstre
Un monstre comporte:
● des points d’expériences (aléatoirement de 1 à 50)
● des points de force (aléatoirement de 1 au nombre de point d’expérience)
● des points d’endurance (aléatoirement de 1 au nombre de point d’expérience)
● 0 ou 1 arme (dont la force et/ou l’endurance est aléatoirement de 1 au nombre de
points d’expérience. Un monstre ne peut pas utiliser son arme, mais uniquement la
céder au joueur s’il meurt)
● des sous (aléatoirement de 0 à 50)
Un monstre peut:
● combattre (S’il meurt, le joueur récupère ses sous et l’arme du monstre et gagne 1
point d’expérience. S’il gagne contre le joueur, le joueur perd un point de vie)
4) Arme
Une arme comporte:
● des points de force
● des points d’endurance
● Un prix
Jeu
Le jeu va se dérouler sous forme d’un formulaire avec des boutons. Il est tout à fait possible
de mettre un couche un peu graphique en utilisant du canevas ou une librairie JS plus
élaborée, mais attention à ne pas rendre les choses trop complexes au départ. Mieux vaut
partir sur quelque chose de très simple au départ et fonctionnel, puis ensuite placer une
couche esthétique en plus.
Lorsque le joueur commence le jeu, il va à chaque fois soit rencontrer un monstre, soit un
PNJ. Vous pouvez créer autant de monstres, d’armes ou de PNJs (instancier des objets)
que vous désirez. Vous avez également la possibilité de faire une page d’intro, de fin, une
gestion de scores/crédits, etc. Laissez libre votre imagination, mais focalisez vous sur
l’essentiel avant tout.
Vous avez le choix de faire ceci en PHP ou en Javascript.
Si vous faites ce jeu en PHP:
Il faut utiliser une base de données à choix (SQL ou noSQL) pour stocker vos données
Utilisez un formulaire au niveau front-end (par exemple à l’aide de boutons) pour faire des
appels au serveur. N’oubliez pas que PHP va à chaque fois rafraichir votre page
Si vous faites ce jeu en Javascript:
Utilisez un service de base de données type “Firebase” ou “MongoDB atlas”.
Utilisez également un formulaire avec des boutons pour interagir avec javascript. Votre code
va mettre à jour automatiquement les informations sont devoir rafraîchir la page
Si vous souhaitez utiliser PHP et Javascript:
Un peu plus corsé, mais vous pouvez ;)
Créez la partie PHP avec la base de données et renvoyer une données au format JSON
(utilisez la fonction json_decode() ou json_encode()) pour retourner vos résultats
Créez la partie Javascript en reproduisant les mêmes modèles (classes) au niveau JS et
faites des appels à PHP en utilisant la librairie très pratique qui se nomme AXIOS:
https://github.com/axios/axios)
Consignes
● Intégrer obligatoire la notion d’encapsulation, d’héritage, méthodes statiques et
constante
● Utilisez si possible les interfaces et traits en PHP
● Ajoutez en bas de page des informations qui indiquent le nombre d’objets existants
(joueur, PNJs, monstres, armes). Lorsqu’un monstre meurt, l’objet “monstre” doit être
détruit.
● Les données doivent être stockées sur une base de données (mysql, mongodb
atlas, firebase) de sorte qu’on puisse arrêter la partie quand on le souhaite et la
continuer sur un autre navigateur. (Pas besoin de gérer le multijoueur, car c’est
complexe, mais vous pouvez).
Durée
● Vous avez jusqu'au mercredi soir 20 janvier pour réaliser le projet et le déposer sur
Git
● Jeudi matin: Présentation du projet à l'ensemble de la classe (Par groupe: 25' de
présentation, 5' de questions/réponses)