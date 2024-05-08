Comment j'ai remplacé mon patron par une IA


Différentes vidéos sur youtube traitant des IA et des deepfakes m'ont récemment amener a me poser quelques questions : Quel est le niveau de complexité de la création de ce genre données. Comment les outils de génération disponibles 
fonctionnent t'ils et dans quelle mesure s'intègrent t'ils bien . Et surtout : Est-ce que c'est a ma portée.

Bon, aller, et si j'essayait de cloner Francois, oui Francois mon patron !


[ image virtual-francois]

Spoiler : Oui, c'est vraiment beaucoup trop à portée.

Il n'est d'une part pas nécéssaire d'être une grosse célébrité pour risquer d'être la victime de deepfakes, 
une petite présence dans quelques médias sur la toile suffisent.
Et nul besoin non plus d'être un ingénieur expert du domaine pour mettre en oeuvre le clone virtuel, 
les outils disponibles aujourd'hui rendent la tâche très accessible avec un minimum de technique.

Voyons ça ensemble, du point de vue d'un dévelppeur web, garanti humain. (je réussi les captcha haut la main)

## Première étape : Cloner la voix

Eleven labs est là
10 minutes d'enregistrement suffisent à obtenir un modèle assez bluffant.

Les modèles personnalisés necessites un compte payant.
Un euro par mois pour tester : qu'a celà ne tienne, le gag en vaut largement la chandelle

Et en l'occurance, j'ai disposé de plusieurs heures de conférences
Je vous conseille au passage si le sujet vous interesse l'excellente conférence de François sur PHP qui m'a servit 
pour l'entrainement du mèdle final.

[ image eleven TTS]

Au passage, j'ai pu constater que la langue d'origine d'entrainement joue un rôle non négligeable
La première source que j'avais choisie était la chapine youtube de react admin et les différentes vidéo de François en anglais sur ce sujet. 
Et le résultat ensuite pour s'exprimer en français était assez décevant.


[ extrait son english]


Je teste finalement avec un ou deux collègues dans la confidence : le dernier résultat est sans appel, bluffant.


[ extrait son nickel]

## Deuxième étape : Cloner l'image

J'ai regardé rapidement Pika qui ne m'a pas convaincu, puis je suis tombé sur https://gooey.ai/lipsync-maker/ 

Il dispose d'une interface assez pratique qui m'a permis de réaliser tous les tests de rendus manuelement, 
avant d'au réaliser l'automatisation via leur API, facile d'accès également.

Le site possède aussi l'avantage de permettre de connecter directement son compte ElevenLabs pour utiliser les modèles de voix personnalisé à la volée.


Par contre ici, la tarification est plus subtile. L'inscription gratuit offre 1000 token utilisables (qui décrémentent a chaque appel, globalement 5 pour une voix standard, et 50 pour une voix perso) Mais l'utilisation de mon modèle ElevenLabs intégré necessite lui un compte payant (compter 100 crédits par $).

A noter que Gooey est autorégulé pour éviter l'usage abusif, et banis les termes litigieux dans les phrases en input, ce qui n'était pas le cas sur le synthétiseur d'ElevenLabs


[ code du fetch]

J'ai trouvé une vidéo de François contenant une séquence de discours face caméra d'une dizaine de secondes, parfait pour y appliquer la synchro-labiale.

A nouveau, je teste avec un ou deux collègues dans la confidence : éclats de rire, c'est un succès


[extrait video]

## Troisième et dernière étape : L'appli-web

Une fois les différentes données prètes et calibrée, plus qu'a réaliser une interface pour les exploiter.
Un front en Vue3 pour saisie le texte à lire et afficher automatiquement la vidéo "pirate" comme si de rien n'était.

Rien de sorcier, on aurait obtenu le même résultat aussi vite avec React, mais ça avait l'avantage de me changer du quotidien.


[ code vue3 <video>]


J'ai choisi le ton de la dérision pour l'interface plutot que simuler un véritable chat type meet ou teams. Le but n'étand pas de tromper quelcun mais seulement d'explorer ces outils sur un thème qui m'amusait

Sur ce genre de Projet/POC rapide, j'ai pris l'habitude de m'affranchir totalement du back-end et des API pour tout intégrer dans le front-end servi au navigateur.
Mais c'était inenvisageable ici. 
En effet, bien que le rôle de l'APi soit minimal (elle sert de passerelle entre le front et les services distants),


[ code route api]

 elle est indispensable pour des raisons de sécurité. 
 Elle permet de cacher les clés d'API et de ne pas exposer les services de deepfake directement au navigateur.
Sans quoi, n'importe qui pourra consommer mon crédit sur ces services en quelques minutes.

Donc, voila une petite API réalisée avec node.js/express.
On sécurise tout ça avec un middleware de cors pour qu'une cliet lambda ne puisse pas exploiter l'API directement, 
et le tour est joué.

## Travail terminé

Résultat des courses : en plus ou moins deux jours passés à chercher des outils, les tester et les intégrér dans un système utilisable, j'ai pu, sans connaissance approfondie du sujet, mener à bien mon projet.

J'utilise plus rarement VueJS que ReactJS dans mon travail, mais ce framework se manie avc beaucoup d'intuition et permet donc d'aller à peui pret aussi vite que sur du ReactJS


[ code builder vue]

L'API sous express n'a rien d'inovant tant ou l'utilise partout, mais j'ai tout de même eu un petit moment de déception en voyant que les commandes ne permettent pas de générer automatiquement une structure de base en Typescript et que je devais tout migrer manuellement. (Ou alors j'ai raté une ligne dans la doc :shrug )

[ code builder express]

J'ai désormais un patron virtuel qui accièsse a mes moindre requetes sans broncher.

Prochain objectif : Le connecter au système de paye.
Ca risque d'êtrte plus compliqué, d'autant que François, le vrai cette fois, risque de ne pas se laisser faire si facilement :D



## Quid de la vie privée ?

Le moins qu'on puisse dire, c'est que la technologie et la facilité de mise en oeuvre à la fois fascinent, et font dans le dos. Alors qu'est ce qui nous protège contre les utilisations malveillantes ?
En réalité, pas grand chose mais tout de même deux ou trois détails :

- La pluspart des plateformes telles que celles que j'ai utilisées signes leux médias générés afin qu'ils puissent être identifiés comme fake au besoin.

- Je pense que le cout, bien qu'accessible pour un test rigolo, reste assez dissuadant pour une arnaque à grande échelle

- Et enfin, en dernier recours, le droit est de notre coté. Car bien que j'ai utilisé pour mon projet, uniquement des videos publiques, globalement, toute utilisation de l'image et de la personnalité de quelcun sans son consentement explicite reste totalement illégal et puni pénalement.

## Bilan

Force est de constater à quel point les différentes technologies liées à l'AI sont devenues accèssibles en quelques années à travers de multiples outils de plus en plus performants.
C'est assez satisfaisant pour un développeur web comme moi de voir que ce sujet n'est pas hors de portée, mais bien au contraire, parfaitement intégré a mon domaine. Les outils sont désormais techniquement aboutis, disposent d'API bien documentées et de communautés actives.

A mon niveau, le travail consiste donc  à calibrer correctement les modèles, à concevoir l'appliweb et a interfacer les API entres elles. 

La porte est finalement grande ouverte pour inventer et mettre en oeuvre les nouveaux services de demain que les LLM, synthèses vocales et autres modèles de diffusion peuvent nous laisser entrevoir.



Ah, on me fait signe que mon véritable patron à eu vent de ma tentative de putch et voudrait s'exprimer ici :

[phrase de françois]

video [Je suis le commandant shepard et cette boutique est ma preferee de la citadelle]


### Et l'écologie dans tout ça ?




## Références

Les sources du projet sont ici
Ainsi que les différents outils utilisés :
ElevenLabs
Gooey
truc mp3
AVI Demux

Et enfin, quelque videos interessantes de vulgarisation sur le sujet des deepfakes qui m'avaient inspiré ce petit projet :
