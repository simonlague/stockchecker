# Stockchecker

## Configuration

Ajuster les paramètres de l'app et des notifications dans le fichier `config.json`.

## Sites web à surveiller

Remplir le fichier `sites.json` avec les informations des items à surveiller. Récupérer le XPath du texte à surveiller avec l'inspecteur, clic-droit sur l'élément et *Copy full XPath*.

## En local

Pour tester l'app en local, installez le globablement et tapez `stockchecker`. Pour valider que le script fonctionne avant que l'item revienne en stock, mettez une valeur bidon dans le `expected` du fichier `sites.json`. Vous pourrez alors voir si des erreurs sont soulevées ou si le flow se fait correctement et que vous recevez les notifications.

## Crontab

Plusieurs solutions pour automatiser le tout existent, le plus simple est le crontab. Pour que ca s'exécute à tout les 5 mins :

`*/5 * * * * [FULL_PATH_TO]/stockchecker/run.sh`

Mettre le chemin complet vers le script `run.sh`.

### NB

Il est possible que les XPath changent légèrement de temps en temps, il faudra alors ajuster le fichier `sites.json`.
