# Annexe approfondie — Machine Learning & Deep Learning
### Fondamentaux théoriques détaillés et exemples bancaires complets
### Complément à la formation Machine Learning & Deep Learning (TensorFlow/PyTorch)

Ce document reprend chaque concept clé de la formation ML/DL et l'approfondit : intuition mathématique simple, mécanique interne, et exemple bancaire chiffré ou concret à chaque étape — dans le même esprit que l'annexe Data Science (nettoyage, EDA, feature engineering).

---

## Sommaire

1. Le compromis biais-variance, en profondeur
2. Régularisation L1/L2/Elastic Net, en profondeur
3. Bagging vs Boosting, en profondeur
4. Fonctions d'activation, en profondeur
5. Rétropropagation et descente de gradient, en profondeur
6. Optimiseurs : SGD vs Adam, en profondeur
7. Fonctions de perte, en profondeur
8. Architectures de réseaux, en profondeur (CNN, RNN/LSTM, Transformers, Autoencodeurs)
9. Réglage des hyperparamètres, en profondeur
10. TensorFlow vs PyTorch, en profondeur

---

## 1. Le compromis biais-variance, en profondeur

### 1.1 Ce que "biais" et "variance" signifient réellement

Imaginez que vous entraînez votre modèle de scoring de crédit non pas une fois, mais des centaines de fois, chaque fois sur un échantillon différent de dossiers tirés de la même population de clients Equity BCDC. Pour un même nouveau client, vous obtiendriez des centaines de prédictions légèrement différentes.

- **Le biais** mesure à quel point la prédiction **moyenne** de toutes ces versions du modèle s'écarte de la vraie probabilité de défaut. Un biais élevé signifie que même en moyenne, le modèle se trompe systématiquement dans une direction.
- **La variance** mesure à quel point ces centaines de prédictions **varient entre elles** selon l'échantillon d'entraînement utilisé. Une variance élevée signifie que le modèle est instable : un léger changement dans les données d'entraînement change fortement ses prédictions.

### 1.2 Exemple bancaire concret : biais élevé (sous-apprentissage)

Vous entraînez une **régression linéaire simple** avec une seule variable, `revenu_declare`, pour prédire le risque de défaut. En réalité, le risque de défaut dépend d'une interaction complexe entre revenu, taux d'endettement et ancienneté — une relation non linéaire. Quel que soit l'échantillon d'entraînement utilisé, ce modèle **trop simple** produira systématiquement des scores mal calibrés (par exemple, il sous-estimera le risque des clients à revenu élevé mais fortement endettés). C'est un **biais élevé** : le modèle se trompe de façon cohérente et prévisible, peu importe les données vues.

**Symptôme observable** : l'erreur reste élevée à la fois sur l'échantillon d'entraînement **et** sur l'échantillon de test — le modèle n'apprend tout simplement pas assez de structure.

### 1.3 Exemple bancaire concret : variance élevée (sur-apprentissage)

Vous entraînez maintenant un arbre de décision **très profond** (sans limite de profondeur) sur 5 000 dossiers de crédit. L'arbre va créer des règles hyper-spécifiques, par exemple : *"si `id_client` se termine par un chiffre pair ET que le dossier a été signé un mardi ET que le taux d'endettement est exactement 0.317, alors défaut"*. Ce genre de règle n'a **aucun sens métier** — elle capture du bruit statistique propre à cet échantillon précis de 5 000 dossiers.

Si vous ré-entraînez ce même arbre sur un autre échantillon de 5 000 dossiers légèrement différent, les règles apprises seront radicalement différentes. C'est une **variance élevée**.

**Symptôme observable** : l'erreur est très faible sur l'échantillon d'entraînement (le modèle "récite" parfaitement ses exemples) mais beaucoup plus élevée sur l'échantillon de test — écart caractéristique du sur-apprentissage.

### 1.4 Le "sweet spot" et comment le trouver en pratique

```python
from sklearn.model_selection import validation_curve
import numpy as np

profondeurs = [2, 4, 6, 8, 10, 15, 20, None]
train_scores, val_scores = validation_curve(
    RandomForestClassifier(), X_train, y_train,
    param_name="max_depth", param_range=profondeurs,
    scoring="average_precision", cv=5
)
```
En traçant `train_scores` et `val_scores` en fonction de la profondeur de l'arbre, vous verrez typiquement : le score d'entraînement qui augmente continuellement avec la profondeur (le modèle mémorise de mieux en mieux), et le score de validation qui augmente puis **plafonne, voire redescend** au-delà d'une certaine profondeur — c'est exactement le "sweet spot" du graphique donné dans la formation.

**Conseil pratique bancaire** : ne jamais choisir un hyperparamètre uniquement sur la base de la performance d'entraînement. En scoring de crédit, un modèle avec 99,9% de précision sur l'entraînement mais 65% sur le test en production est **inutilisable et dangereux** — il donnera une fausse confiance aux équipes risque.

---

## 2. Régularisation L1/L2/Elastic Net, en profondeur

### 2.1 L'intuition derrière la régularisation

Une régression logistique classique cherche les coefficients (poids) qui minimisent l'erreur sur les données d'entraînement, sans aucune autre contrainte. Le problème : rien n'empêche le modèle d'attribuer un coefficient **énorme** à une variable qui, par hasard, sépare parfaitement les classes sur cet échantillon précis mais qui ne généralise pas. La régularisation ajoute une **pénalité sur la taille des coefficients** à la fonction que le modèle minimise, ce qui le force à rester "prudent".

### 2.2 L1 (Lasso) — exemple bancaire détaillé

**Mécanique** : la pénalité L1 ajoute la somme des **valeurs absolues** des coefficients à la fonction de coût. Cette forme mathématique particulière a une propriété remarquable : elle pousse certains coefficients à devenir **exactement zéro**, pas juste petits.

**Exemple bancaire** : vous entraînez un modèle de scoring avec 40 variables candidates (revenu, âge, profession encodée en 15 catégories, agence encodée en 20 catégories, ancienneté, etc.). Avec une régularisation L1 suffisamment forte, le modèle va **automatiquement éliminer** (mettre à zéro) les variables les moins informatives — par exemple, il peut découvrir que 12 des 20 catégories d'agence n'apportent rien une fois le reste pris en compte, et les exclure complètement.

```python
from sklearn.linear_model import LogisticRegression
model_l1 = LogisticRegression(penalty="l1", solver="liblinear", C=0.1)
model_l1.fit(X_train, y_train)

variables_retenues = X_train.columns[model_l1.coef_[0] != 0]
print(f"{len(variables_retenues)} variables retenues sur {X_train.shape[1]}")
```
**Avantage métier direct** : un modèle plus simple, avec moins de variables, est **plus facile à documenter et à justifier auprès des équipes de conformité** — un point directement lié à l'exigence d'explicabilité bancaire vue dans la formation Data Science.

### 2.3 L2 (Ridge) — exemple bancaire détaillé

**Mécanique** : la pénalité L2 ajoute la somme des **carrés** des coefficients. Contrairement à L1, elle ne pousse jamais un coefficient à exactement zéro — elle **réduit l'amplitude** de tous les coefficients de façon proportionnelle, en particulier ceux des variables fortement corrélées entre elles.

**Exemple bancaire** : rappelez-vous l'exemple de multi-colinéarité de l'annexe précédente — `montant_credit_demande` et `mensualite_dettes` corrélées à 0.85. Sans régularisation, le modèle pourrait attribuer un coefficient très positif à l'une et très négatif à l'autre (ils se "compensent" mathématiquement sur les données d'entraînement, un artefact instable). La régularisation L2 **partage la pénalité entre les deux variables corrélées**, produisant des coefficients plus stables et plus proches de ce qu'on obtiendrait avec une seule des deux variables.

```python
model_l2 = LogisticRegression(penalty="l2", C=0.5)   # C petit = pénalité forte, C grand = pénalité faible
```
**Point souvent mal compris** : le paramètre `C` en scikit-learn est l'**inverse** de la force de régularisation (`C = 1/λ`) — plus `C` est petit, plus la régularisation est forte. C'est un piège classique de question d'entretien technique.

### 2.4 Elastic Net — quand combiner les deux

**Mécanique** : combine L1 et L2 avec un paramètre de mélange (`l1_ratio`). Utile quand vous avez à la fois besoin de **sélection de variables** (L1) et de **stabilité face à la colinéarité** (L2) — typiquement le cas d'un jeu de données bancaire avec beaucoup de variables dérivées corrélées entre elles (plusieurs ratios calculés à partir des mêmes montants de base).

```python
from sklearn.linear_model import LogisticRegression
model_en = LogisticRegression(penalty="elasticnet", solver="saga", l1_ratio=0.5, C=0.3)
```

### 2.5 Comment choisir la force de régularisation en pratique

**Jamais au hasard — toujours par validation croisée** :
```python
from sklearn.model_selection import GridSearchCV
grid = GridSearchCV(
    LogisticRegression(penalty="l2", solver="lbfgs", max_iter=1000),
    param_grid={"C": [0.01, 0.05, 0.1, 0.5, 1, 5, 10]},
    scoring="average_precision", cv=5
)
grid.fit(X_train, y_train)
```
**Conseil métier** : en scoring de crédit réglementaire, on préfère souvent une régularisation **légèrement plus forte que l'optimum statistique pur**, quitte à perdre un peu de performance brute — un modèle plus simple et plus stable est plus facile à défendre devant un régulateur qu'un modèle marginalement plus précis mais avec des coefficients erratiques.

---

## 3. Bagging vs Boosting, en profondeur

### 3.1 Bagging (Bootstrap Aggregating) — mécanique complète

**Étape par étape** :
1. On tire, **avec remise**, N échantillons aléatoires de la même taille que le jeu d'entraînement original (chaque échantillon est appelé un *bootstrap*). Certains dossiers apparaissent plusieurs fois dans un échantillon donné, d'autres n'apparaissent pas du tout.
2. On entraîne un arbre de décision complet et indépendant sur chaque échantillon bootstrap.
3. À la prédiction, on **moyenne** (régression) ou on **vote majoritaire** (classification) les prédictions de tous les arbres.

**Pourquoi ça réduit la variance — intuition bancaire** : imaginez 300 analystes crédit juniors, chacun formé sur un sous-ensemble légèrement différent de dossiers historiques. Individuellement, chacun peut avoir des biais propres à son échantillon d'apprentissage (l'un a peut-être vu trop de dossiers d'une agence particulière). Mais en **moyennant leurs 300 avis indépendants**, les erreurs individuelles aléatoires ont tendance à s'annuler, et la décision collective est plus stable que celle d'un seul analyste. C'est exactement le principe du Random Forest.

**Random Forest ajoute une deuxième couche d'aléa** : à chaque split de chaque arbre, seul un sous-ensemble aléatoire des variables est considéré (pas toutes les 40 variables) — cela **décorrèle davantage** les arbres entre eux, ce qui améliore encore la réduction de variance par rapport à un bagging d'arbres classiques.

```python
rf = RandomForestClassifier(
    n_estimators=300,        # nombre d'arbres (300 "analystes")
    max_features="sqrt",     # nombre de variables considérées à chaque split
    max_depth=8,
    class_weight="balanced"
)
```

### 3.2 Boosting — mécanique complète

**Étape par étape (Gradient Boosting)** :
1. On entraîne un premier arbre **volontairement simple et faible** (souvent juste quelques niveaux de profondeur) sur les données.
2. On calcule les **erreurs résiduelles** de ce premier arbre — pour chaque dossier, l'écart entre la prédiction et la vraie étiquette.
3. On entraîne un **deuxième arbre dont la tâche est de prédire ces erreurs résiduelles**, pas la cible originale.
4. On additionne les prédictions du premier et du deuxième arbre (pondérées par le `learning_rate`).
5. On répète : chaque nouvel arbre se concentre sur les erreurs encore commises par l'ensemble des arbres précédents.

**Intuition bancaire** : imaginez un premier analyste crédit junior qui fait un premier passage rapide sur tous les dossiers, avec des règles simples (ex. juste le taux d'endettement). Un deuxième analyste, plus spécialisé, se concentre **uniquement sur les dossiers que le premier a mal classés** (les cas ambigus, souvent les défauts les plus difficiles à repérer). Un troisième analyste se concentre sur ce qui reste mal classé après les deux premiers, et ainsi de suite. Le score final combine l'avis de tous ces analystes successifs, chacun corrigeant les angles morts des précédents.

```python
xgb = XGBClassifier(
    n_estimators=300,
    max_depth=4,              # arbres volontairement peu profonds ("faibles")
    learning_rate=0.05,       # pondération de la contribution de chaque nouvel arbre
    scale_pos_weight=15.7
)
```

### 3.3 Pourquoi le Boosting réduit le biais (et pas la variance)

Contrairement au bagging où les arbres sont **indépendants**, en boosting chaque arbre dépend explicitement de la performance des précédents — l'ensemble devient de plus en plus **capable de capturer des relations complexes** que chaque arbre individuel, trop simple, ne pouvait pas capturer seul. C'est exactement la définition de la réduction de biais.

**Le revers de la médaille** : parce que chaque arbre corrige agressivement les erreurs précédentes, le boosting peut finir par "sur-corriger" sur du bruit si on l'entraîne trop longtemps (`n_estimators` trop élevé) ou avec un `learning_rate` trop élevé — d'où la sensibilité accrue au sur-apprentissage mentionnée dans la formation.

**Comment s'en protéger en pratique bancaire** :
```python
xgb = XGBClassifier(
    n_estimators=1000,          # budget large...
    learning_rate=0.03,         # ...mais petits pas
    early_stopping_rounds=30,   # ...et on s'arrête dès que la validation ne s'améliore plus
    eval_metric="aucpr"
)
xgb.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
print("Nombre d'arbres réellement utilisés :", xgb.best_iteration)
```

### 3.4 Tableau de synthèse à mémoriser pour l'entretien

| | Bagging (Random Forest) | Boosting (XGBoost) |
|---|---|---|
| Entraînement des arbres | Parallèle, indépendant | Séquentiel, dépendant |
| Objectif principal | Réduire la variance | Réduire le biais |
| Sensibilité au sur-apprentissage | Faible (robuste par nature) | Plus élevée (nécessite un réglage soigné) |
| Interprétation métier | "300 avis indépendants moyennés" | "Chaîne d'analystes qui corrigent les erreurs les uns des autres" |
| Performance typique sur données tabulaires bancaires | Très bonne, robuste par défaut | Généralement supérieure si bien réglé |

---

## 4. Fonctions d'activation, en profondeur

### 4.1 Pourquoi une fonction d'activation est indispensable

Sans fonction d'activation non linéaire, empiler des couches de neurones ne servirait à **rien** : une composition de transformations linéaires reste une transformation linéaire, quel que soit le nombre de couches. Le réseau entier se réduirait mathématiquement à une simple régression linéaire, incapable de capturer les relations complexes (ex. l'effet du taux d'endettement sur le risque n'est pas le même selon la tranche de revenu — une interaction non linéaire).

### 4.2 Sigmoid — mécanique et limite

**Formule (intuition)** : écrase n'importe quelle valeur d'entrée dans l'intervalle (0, 1), avec une forme en "S".

**Usage** : parfaite pour la couche de **sortie** d'un problème de classification binaire (défaut oui/non) — le résultat s'interprète directement comme une probabilité.

**Problème pour les couches cachées** : pour des valeurs d'entrée très grandes ou très petites, la courbe sigmoid devient quasiment plate — son gradient (sa pente) devient proche de zéro. Lors de la rétropropagation à travers de nombreuses couches, ces gradients proches de zéro se **multiplient entre eux**, et le gradient qui arrive aux premières couches du réseau devient microscopique : c'est le problème du **gradient qui disparaît (vanishing gradient)**, qui rend l'entraînement des réseaux profonds extrêmement lent, voire impossible.

### 4.3 ReLU — pourquoi c'est devenu le standard

**Formule (intuition)** : `ReLU(x) = max(0, x)` — laisse passer les valeurs positives telles quelles, met à zéro les valeurs négatives.

**Pourquoi ça résout le problème du gradient qui disparaît** : pour toute entrée positive, le gradient de ReLU est constant (égal à 1), il ne s'écrase jamais, quelle que soit la profondeur du réseau. Cela permet d'entraîner des réseaux beaucoup plus profonds efficacement.

**Limite (le "dying ReLU")** : si un neurone reçoit systématiquement des entrées négatives pendant l'entraînement, il reste "mort" (toujours à zéro) et son gradient devient nul en permanence — il n'apprend plus jamais. Des variantes comme **Leaky ReLU** (laisse passer une petite fraction des valeurs négatives) corrigent ce problème.

### 4.4 Softmax — exemple bancaire multi-classes

**Usage bancaire concret** : pour la classification automatique de réclamations clients en 5 catégories (carte bloquée, frais contestés, erreur de virement, problème application, autre), la couche de sortie utilise Softmax :
```python
keras.layers.Dense(5, activation="softmax")
```
Softmax transforme les 5 scores bruts de sortie en 5 probabilités qui **somment exactement à 1** — par exemple `[0.72, 0.15, 0.05, 0.05, 0.03]`, ce qui signifie 72% de confiance sur "carte bloquée". Contrairement à 5 sigmoids indépendantes (qui permettraient plusieurs catégories actives à la fois, utile pour du multi-label), Softmax impose que les catégories soient **mutuellement exclusives** — cohérent avec le cas où chaque réclamation appartient à une seule catégorie.

### 4.5 Tableau récapitulatif avec le "pourquoi" métier

| Fonction | Où l'utiliser | Pourquoi (banque) |
|---|---|---|
| ReLU | Couches cachées | Entraînement stable même sur réseaux profonds (ex. réseau profond sur images de chèques) |
| Sigmoid | Sortie, classification binaire | Score de défaut interprétable directement comme une probabilité |
| Softmax | Sortie, classification multi-classes exclusives | Catégorisation de réclamations, chaque dossier dans une seule catégorie |
| Linéaire (pas d'activation) | Sortie, régression ou reconstruction (autoencodeur) | Prévoir un montant, ou reconstruire une transaction sans borner la sortie |

---

## 5. Rétropropagation et descente de gradient, en profondeur

### 5.1 L'intuition sans les formules complexes

Imaginez que vous réglez les multiples boutons d'une chaîne hi-fi (chaque bouton = un poids du réseau) pour que le son produit (la prédiction) se rapproche le plus possible d'un son de référence (la vraie étiquette). Vous ne pouvez pas essayer toutes les combinaisons de réglages — il y en a des millions. La rétropropagation vous dit, pour **chaque bouton individuellement**, *"si tu tournes ce bouton légèrement dans un sens, l'erreur totale augmente ou diminue, et de combien"* — c'est le **gradient**. La descente de gradient consiste alors à tourner chaque bouton dans la direction qui **diminue** l'erreur, un tout petit peu à la fois.

### 5.2 Pourquoi "rétro"-propagation — le sens du calcul

Le réseau calcule d'abord sa prédiction en allant de l'entrée vers la sortie (*forward pass*). L'erreur se calcule à la toute fin, à la sortie. Mais pour savoir comment ajuster les poids des **premières** couches (proches de l'entrée), il faut comprendre leur contribution à l'erreur finale — et cette contribution ne peut se calculer qu'en **remontant** depuis la sortie vers l'entrée, couche par couche, en appliquant à chaque étape la règle de dérivation en chaîne (la contribution d'un poids à l'erreur finale = sa contribution à la couche suivante, multipliée par la contribution de cette couche suivante à l'erreur finale, et ainsi de suite). D'où le terme "rétro"-propagation : le calcul du gradient se propage à l'envers, de la sortie vers l'entrée.

### 5.3 Exemple bancaire complet, étape par étape

Pour un réseau simple de scoring (`revenu`, `taux_endettement` → probabilité de défaut) :

1. **Forward pass** : le réseau prend le dossier d'un client (`revenu = 700 000`, `taux_endettement = 0.4`), le fait passer à travers ses couches, et produit une probabilité de défaut prédite, ex. `0.15`.
2. **Calcul de la perte** : la vraie étiquette pour ce client est `1` (il a effectivement fait défaut). La fonction de perte (`binary_crossentropy`) calcule un score d'erreur élevé car la prédiction (0.15) est très éloignée de la vérité (1).
3. **Backward pass** : le réseau calcule, couche par couche en remontant, la contribution de **chaque poids individuel** à cette erreur — "si le poids reliant `taux_endettement` à ce neurone caché avait été légèrement plus élevé, l'erreur sur ce dossier aurait-elle été plus petite ou plus grande, et de combien ?"
4. **Mise à jour** : chaque poids est ajusté dans la direction qui réduit l'erreur, proportionnellement à son gradient et au taux d'apprentissage (`learning_rate`).
5. Ce processus se répète pour **chaque batch** de dossiers, des centaines/milliers de fois (*epochs*), jusqu'à convergence.

**Pourquoi on utilise des batches plutôt qu'un seul dossier ou tout le jeu d'entraînement à la fois** : calculer le gradient sur un seul dossier est très rapide mais très bruité (le réseau "zigzague" à chaque exemple individuel) ; le calculer sur l'ensemble complet (ex. 200 000 transactions) est très stable mais lent et coûteux en mémoire. Un batch intermédiaire (ex. 256 dossiers) offre un bon compromis — c'est exactement le paramètre `batch_size` vu dans le code Keras/PyTorch de la formation.

---

## 6. Optimiseurs : SGD vs Adam, en profondeur

### 6.1 SGD (descente de gradient stochastique) — mécanique et limite

**Mécanique** : met à jour chaque poids en le déplaçant d'un pas proportionnel au gradient, avec un `learning_rate` **fixe et identique pour tous les poids**.

**Limite bancaire concrète** : dans un réseau qui traite à la fois des variables très différentes en échelle (ex. `revenu_declare` en centaines de milliers, `taux_endettement` entre 0 et 1), un même taux d'apprentissage global peut être **trop grand** pour certains poids (l'entraînement devient instable, "rebondit" sans converger) et **trop petit** pour d'autres (l'apprentissage stagne). Le SGD "pur" est donc sensible à ce déséquilibre — d'où l'importance, déjà mentionnée dans la formation, de **standardiser les variables d'entrée** avant l'entraînement.

**Variante utile — SGD avec momentum** : ajoute une "inertie" qui accumule la direction des gradients précédents, ce qui aide à traverser les zones plates de la fonction de perte et amortit les oscillations — un peu comme une bille qui roule dans une vallée et garde de la vitesse plutôt que de s'arrêter à chaque petite bosse.

### 6.2 Adam — pourquoi il est devenu le choix par défaut

**Mécanique (intuition, sans formule complète)** : Adam combine deux idées :
1. **Momentum** (comme le SGD+momentum ci-dessus) : garde une mémoire de la direction moyenne des gradients récents.
2. **Taux d'apprentissage adaptatif par poids** : chaque poids individuel reçoit son **propre** taux d'apprentissage, ajusté automatiquement selon l'historique de la variance de son gradient. Un poids dont le gradient a été historiquement grand et instable reçoit un pas plus petit ; un poids dont le gradient a été petit et stable reçoit un pas plus grand.

**Pourquoi c'est particulièrement adapté à un cas bancaire typique** : dans le réseau de scoring de crédit, les poids connectés à `revenu_declare` (grande échelle, forte variance après standardisation imparfaite) et ceux connectés à un indicateur binaire rare comme `a_eu_un_incident_grave` (rarement actif, gradient rare mais informatif quand il l'est) n'ont pas du tout le même comportement d'apprentissage. Adam gère cette hétérogénéité automatiquement, alors qu'un SGD simple demanderait un réglage manuel beaucoup plus fin.

```python
optimizer = keras.optimizers.Adam(learning_rate=1e-3, beta_1=0.9, beta_2=0.999)
```
- `beta_1` : force du momentum (mémoire de la direction moyenne).
- `beta_2` : force de l'adaptation du taux d'apprentissage par poids.
- Les valeurs par défaut (0.9 / 0.999) fonctionnent bien dans la grande majorité des cas — inutile de les régler finement sauf cas particulier.

### 6.3 Quand revenir à SGD malgré tout

Dans certains contextes de recherche, SGD (avec momentum et un bon *learning rate schedule*) peut finir par mieux **généraliser** qu'Adam, qui converge plus vite mais peut se stabiliser sur un minimum légèrement moins bon en généralisation. En pratique bancaire, pour un projet standard, **Adam reste le choix par défaut recommandé** — sa robustesse et sa vitesse de convergence l'emportent largement sur ce gain marginal et incertain de SGD dans un contexte de production où le temps d'itération compte.

---

## 7. Fonctions de perte, en profondeur

### 7.1 Binary Crossentropy — pourquoi cette formule précisément

**Intuition** : la perte pénalise **beaucoup plus fortement** une prédiction confiante et fausse qu'une prédiction prudente et fausse.

**Exemple bancaire chiffré** :
- Client A, vrai défaut (étiquette = 1), le modèle prédit `0.9` (confiant, correct) → perte très faible.
- Client B, vrai défaut (étiquette = 1), le modèle prédit `0.5` (incertain) → perte modérée.
- Client C, vrai défaut (étiquette = 1), le modèle prédit `0.05` (confiant, **et faux**) → perte **très élevée**, disproportionnellement plus grande que pour le client B.

Cette asymétrie pousse le modèle, pendant l'entraînement, à **éviter les erreurs confiantes** plutôt que de simplement minimiser le nombre d'erreurs — un comportement souhaitable en scoring de crédit, où une confiance mal placée sur un dossier réellement à risque est particulièrement coûteuse.

### 7.2 MSE (Mean Squared Error) — pourquoi le carré

**Usage bancaire** : prévision d'un montant continu, par exemple la prévision du flux de trésorerie attendu en agence le lendemain.

**Pourquoi élever au carré plutôt que prendre la valeur absolue** : le carré pénalise **disproportionnellement plus** les grosses erreurs que les petites. Une erreur de prévision de 10 000 CDF compte pour 100 000 000 (10 000²), une erreur de 100 000 CDF compte pour 10 000 000 000 (100 000²) — 100 fois plus, alors que l'erreur n'est que 10 fois plus grande. Ce choix reflète une préférence métier réelle : pour la gestion de trésorerie d'une agence, une grosse erreur isolée de prévision (risque de rupture de liquidités) est bien plus dangereuse que plusieurs petites erreurs régulières.

### 7.3 Categorical Crossentropy vs Binary Crossentropy — piège de code fréquent

Pour la classification de réclamations en 5 catégories, une erreur fréquente de débutant est d'utiliser `binary_crossentropy` avec une sortie Softmax à 5 neurones — cela ne calcule pas la bonne quantité mathématique. Il faut aligner activation de sortie et fonction de perte :
```python
# Classification binaire (défaut oui/non)
model.compile(loss="binary_crossentropy", ...)   # avec activation="sigmoid" en sortie

# Classification multi-classes (catégorie de réclamation)
model.compile(loss="categorical_crossentropy", ...)   # avec activation="softmax" en sortie, étiquettes one-hot
# ou
model.compile(loss="sparse_categorical_crossentropy", ...)   # étiquettes en entiers (0,1,2,3,4), pas one-hot
```

---

## 8. Architectures de réseaux, en profondeur

### 8.1 CNN — mécanique détaillée avec exemple bancaire (lecture de chèque)

**Le problème que la convolution résout** : sur une image d'un chèque manuscrit, un chiffre "7" peut apparaître n'importe où dans la zone du montant. Un réseau dense classique (`Dense`) devrait apprendre séparément à reconnaître un "7" en haut à gauche, un "7" en bas à droite, etc. — un gaspillage énorme de paramètres et de données d'entraînement.

**La solution convolutive** : un **filtre** (petite grille de poids, ex. 3×3 pixels) glisse sur toute l'image et applique la **même** transformation à chaque position. Ce filtre apprend à détecter un motif local précis (ex. un bord courbe caractéristique d'un chiffre) **où qu'il apparaisse** dans l'image — c'est la propriété d'**invariance par translation**, cruciale pour la reconnaissance de caractères manuscrits à une position imprévisible sur un chèque scanné.

**Empilement de couches convolutives** : la première couche détecte des motifs très simples (bords, contours). Les couches suivantes combinent ces motifs simples en motifs de plus en plus complexes (courbes, boucles, puis finalement des chiffres entiers) — une hiérarchie de représentations, du plus concret au plus abstrait.

**Le rôle du pooling** (`MaxPooling2D`) : réduit la taille spatiale de la représentation en ne gardant que la valeur maximale d'une petite zone, ce qui rend le réseau **plus robuste** aux petites variations de position ou d'inclinaison du chiffre (utile pour une écriture manuscrite jamais parfaitement droite).

### 8.2 RNN/LSTM — mécanique détaillée avec exemple bancaire (détection de fraude séquentielle)

**Le problème** : une transaction isolée de 50 000 CDF n'est pas suspecte en soi. Mais **la séquence** "retrait de 50 000 à Kinshasa à 14h, puis retrait de 45 000 à Lubumbashi à 14h15" est hautement suspecte (déplacement physiquement impossible en 15 minutes). Un modèle qui analyse chaque transaction indépendamment (comme un XGBoost classique sur des features agrégées) peut capturer une partie de ce signal via des features construites à la main (ex. `nb_agences_distinctes_1h`), mais un LSTM peut apprendre directement la structure séquentielle **sans qu'on ait à deviner à l'avance quelles statistiques résumer**.

**Pourquoi LSTM plutôt qu'un RNN simple** : un RNN simple garde une "mémoire" de l'historique en la faisant passer d'une étape à l'autre, mais cette mémoire s'estompe rapidement sur les séquences longues (le fameux vanishing gradient, section 4.2, s'applique aussi dans la dimension temporelle). Le LSTM introduit des **portes** (*gates*) — porte d'oubli, porte d'entrée, porte de sortie — qui contrôlent explicitement quelle information de l'historique garder, oublier, ou utiliser à chaque étape. Concrètement pour la fraude : le LSTM peut apprendre à "se souvenir" qu'un client vient de faire un gros retrait il y a 10 transactions, même si beaucoup de petites transactions normales sont intervenues entre-temps — une mémoire à plus long terme qu'un RNN simple.

```python
# Forme des données d'entrée pour un LSTM de fraude :
# (nombre de clients, longueur_de_sequence=20 dernières transactions, nb_features_par_transaction=5)
```

### 8.3 Transformers et attention — mécanique détaillée avec exemple bancaire (réclamations clients)

**Le problème que l'attention résout** : dans la phrase *"Ma carte a été bloquée après un virement vers l'étranger, ce qui m'empêche de payer mes factures"*, comprendre que le mot "bloquée" se rapporte à "carte" (et pas à "virement" ou "factures") nécessite de relier des mots **potentiellement éloignés** dans la phrase. Un RNN/LSTM traite les mots dans l'ordre, un par un, et sa "mémoire" du début de la phrase peut s'être diluée en arrivant à la fin sur des phrases longues.

**La solution attention** : pour chaque mot, le mécanisme d'attention calcule directement un **score de pertinence avec tous les autres mots de la phrase simultanément**, sans devoir passer par une chaîne séquentielle. Le modèle peut ainsi apprendre que "bloquée" doit porter une attention forte sur "carte", peu importe la distance entre les deux mots dans la phrase.

**Pourquoi c'est aussi plus rapide à entraîner** : parce que l'attention traite tous les mots **en parallèle** (pas séquentiellement comme un RNN/LSTM qui doit attendre l'étape précédente pour calculer la suivante), l'entraînement peut massivement exploiter le calcul parallèle des GPU — c'est une des raisons pratiques, en plus de la qualité des résultats, qui explique la domination des Transformers.

**Application bancaire concrète** : un modèle comme CamemBERT (pré-entraîné sur un immense corpus de français général), une fois **affiné (fine-tuné)** sur quelques milliers de réclamations clients Equity BCDC étiquetées, peut apprendre à catégoriser correctement de nouvelles réclamations en s'appuyant sur sa compréhension générale du français déjà acquise — beaucoup plus efficace que d'entraîner un modèle de langage from scratch sur un petit jeu de données bancaires (voir section 9 sur le transfer learning).

### 8.4 Autoencodeurs — mécanique détaillée avec exemple bancaire (fraude sans étiquettes)

**Le principe reformulé simplement** : le réseau a deux parties. **L'encodeur** compresse une transaction (représentée par ex. par 10 variables) en une représentation beaucoup plus petite (ex. 3 valeurs) — le **goulot d'étranglement**. **Le décodeur** essaie de reconstruire les 10 variables originales **uniquement à partir de ces 3 valeurs compressées**.

**Pourquoi ça détecte les anomalies** : si l'autoencodeur est entraîné **uniquement** sur des transactions normales, il devient très bon pour compresser et reconstruire les schémas typiques d'une transaction normale (ex. les combinaisons habituelles de montant/heure/type/agence). Face à une transaction frauduleuse, dont la combinaison de caractéristiques est **atypique**, le goulot d'étranglement de 3 valeurs ne parvient pas à capturer correctement cette combinaison inhabituelle — la reconstruction produite par le décodeur sera donc **significativement différente** de la transaction originale. Cet écart (l'erreur de reconstruction) devient le signal d'anomalie.

**Analogie bancaire** : c'est comme un employé formé pendant des années à ne traiter que des dossiers de crédit standards — face à un dossier structuré de façon totalement atypique (montages financiers inhabituels), il "bute" et a du mal à le traiter de façon fluide, ce qui en soi révèle que le dossier sort de la norme, sans qu'il ait besoin d'avoir vu un exemple de fraude identique auparavant.

**Pourquoi c'est complémentaire à une approche supervisée (XGBoost)** : XGBoost a besoin d'exemples étiquetés de fraudes **déjà connues** pour apprendre à les reconnaître — il est donc aveugle aux **nouveaux types de fraude** jamais observés. L'autoencodeur, lui, ne cherche pas à reconnaître un type de fraude spécifique, mais **tout ce qui s'écarte du comportement normal** — il peut donc détecter des schémas de fraude inédits, au prix d'un taux de faux positifs généralement plus élevé qu'une approche supervisée bien entraînée sur des fraudes connues.

---

## 9. Réglage des hyperparamètres, en profondeur

### 9.1 Pourquoi Grid Search devient vite impraticable

Avec 4 hyperparamètres et seulement 5 valeurs testées chacun, Grid Search doit entraîner `5⁴ = 625` modèles. Pour un réseau de neurones dont un seul entraînement prend 20 minutes, cela représente plus de 8 jours de calcul continu — impraticable pour la plupart des équipes.

### 9.2 Pourquoi Random Search fonctionne étonnamment bien

**Intuition contre-intuitive mais démontrée** : dans la pratique, seuls quelques hyperparamètres ont un impact **réellement important** sur la performance finale (souvent le `learning_rate` et la profondeur/complexité du modèle comptent beaucoup plus que les autres réglages fins). Grid Search "gaspille" une grande partie de son budget de calcul à tester systématiquement toutes les combinaisons des hyperparamètres peu importants avec les mêmes valeurs des hyperparamètres importants. Random Search, en échantillonnant **aléatoirement** dans tout l'espace, explore mécaniquement une plus grande diversité de valeurs pour **chaque** hyperparamètre individuellement, pour le même budget de calcul total — il a donc statistiquement plus de chances de "tomber" sur une bonne valeur pour les hyperparamètres qui comptent vraiment.

### 9.3 Optimisation bayésienne — pourquoi c'est plus intelligent encore

**Mécanique (intuition)** : après chaque essai, l'algorithme construit un **modèle probabiliste** de la relation entre les hyperparamètres testés et la performance obtenue, puis choisit le **prochain** point à tester en équilibrant deux objectifs : explorer des zones encore incertaines de l'espace des hyperparamètres, et exploiter les zones déjà connues comme prometteuses.

**Exemple bancaire concret** : après avoir testé `max_depth=4` (AUC-PR = 0.35) et `max_depth=10` (AUC-PR = 0.31, signe de sur-apprentissage), un algorithme bayésien "devine" intelligemment qu'il vaut mieux essayer ensuite `max_depth=6` ou `7` plutôt que de retester `max_depth=2` ou `15` au hasard comme le ferait Random Search — il apprend de l'historique de ses propres essais.

```python
import optuna

def objectif(trial):
    max_depth = trial.suggest_int("max_depth", 3, 10)
    learning_rate = trial.suggest_float("learning_rate", 0.01, 0.3, log=True)
    n_estimators = trial.suggest_int("n_estimators", 100, 500)

    modele = XGBClassifier(max_depth=max_depth, learning_rate=learning_rate, n_estimators=n_estimators)
    score = cross_val_score(modele, X_train, y_train, scoring="average_precision", cv=5).mean()
    return score

etude = optuna.create_study(direction="maximize")
etude.optimize(objectif, n_trials=50)
print(etude.best_params)
```
**Avantage pratique en contexte bancaire** : pour un budget de calcul limité (typique dans des environnements IT contraints), l'optimisation bayésienne atteint souvent une performance équivalente à un Grid Search exhaustif avec 5 à 10 fois moins d'essais.

---

## 10. TensorFlow vs PyTorch, en profondeur

### 10.1 Ce que signifie concrètement "graphe statique" vs "graphe dynamique"

**TensorFlow 1.x (historique, graphe statique)** : on définissait d'abord l'**intégralité** de l'architecture du réseau comme un graphe de calcul figé, puis on l'exécutait ensuite sur des données. Avantage : le graphe complet pouvait être optimisé globalement avant exécution (fusion d'opérations, meilleure allocation mémoire). Inconvénient majeur : déboguer était pénible, car on ne pouvait pas simplement inspecter une valeur intermédiaire avec un `print()` classique — il fallait des outils spécifiques.

**PyTorch (et TensorFlow 2.x en mode eager, aujourd'hui par défaut)** : le graphe de calcul se construit **au fur et à mesure** que le code s'exécute, ligne par ligne, exactement comme du code Python normal. On peut mettre un point d'arrêt (`breakpoint()`), inspecter n'importe quel tenseur intermédiaire, utiliser des boucles et conditions Python natives dans l'architecture elle-même. C'est ce qu'on appelle un **graphe dynamique**, et c'est devenu le standard de facto dans les deux frameworks aujourd'hui.

**Conséquence pratique pour vous en entretien** : la distinction historique entre les deux frameworks s'est beaucoup estompée depuis TensorFlow 2 — les deux offrent un mode de débogage naturel aujourd'hui. La différence qui reste la plus tangible est **l'écosystème de déploiement** (section 10.2) et les habitudes de la communauté (recherche académique très majoritairement sur PyTorch aujourd'hui).

### 10.2 Écosystème de déploiement — pourquoi ça compte concrètement pour une banque

**TensorFlow Serving** : un serveur dédié, hautement optimisé, conçu spécifiquement pour exposer des modèles TensorFlow en production à très grande échelle, avec gestion native du versionnement de modèles et du A/B testing entre versions.

**TFLite** : permet de convertir un modèle TensorFlow pour qu'il tourne directement sur un téléphone ou un appareil embarqué avec des ressources très limitées — pertinent si Equity BCDC envisageait un jour d'embarquer un modèle de scoring léger **directement dans l'application mobile** (ex. pour une pré-évaluation instantanée avant même l'envoi de la demande au serveur).

**TorchServe / ONNX (PyTorch)** : TorchServe est l'équivalent PyTorch de TensorFlow Serving, plus récent et moins mature historiquement, mais activement développé. **ONNX (Open Neural Network Exchange)** est un format d'échange qui permet d'exporter un modèle entraîné dans **n'importe quel** framework (PyTorch, TensorFlow, Scikit-learn, XGBoost) vers un format commun, exécutable ensuite avec un moteur d'inférence unifié — une solution pragmatique pour une équipe qui utilise plusieurs frameworks et veut standardiser son infrastructure de déploiement sans se lier à un seul écosystème.

### 10.3 Recommandation pragmatique à formuler en entretien

*"Pour ce poste, je m'adapterais à l'écosystème déjà en place chez Equity BCDC plutôt que d'imposer ma préférence personnelle. S'il n'y a pas d'existant, je recommanderais de standardiser sur un seul framework pour limiter la dette technique de maintenance de deux stacks différentes — PyTorch si l'équipe privilégie l'agilité et le prototypage rapide, TensorFlow si l'objectif inclut un déploiement mobile/edge à moyen terme. Dans tous les cas, j'utiliserais ONNX comme filet de sécurité pour ne jamais être bloqué par ce choix initial."* — cette réponse montre à la fois la maîtrise technique et la maturité de raisonnement en environnement d'entreprise.

---

## Synthèse — le fil conducteur de cette annexe

Chaque concept de la formation ML/DL répond en réalité à une seule question récurrente : **comment un modèle peut-il apprendre une relation complexe à partir de données limitées, sans se tromper de façon systématique (biais) ni devenir instable face au bruit (variance) ?** La régularisation, le choix entre bagging/boosting, les fonctions d'activation, les optimiseurs, et même le choix d'architecture (CNN/RNN/Transformer/Autoencodeur) sont tous, in fine, des réponses différentes et complémentaires à ce même problème fondamental, appliquées à des types de données différents (tabulaires, images, séquences, texte). C'est cette lecture unifiée que vous devez pouvoir dérouler en entretien plutôt qu'une liste de techniques apprises séparément.
