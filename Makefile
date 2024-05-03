.PHONY: logs

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

start-front: ## Start the application
	cd ./packages/front/ && npm run dev

start-back: ## Start the application
	cd ./packages/back/ && npm start

build: ## Build the application for production
	cd ./packages/back/ && npm run build
	cd ./packages/front/ && npm run build

clean: ## Clean dependencies and builds
	rm -rf ./packages/front/node_modules
	rm -rf ./packages/back/node_modules
	rm -rf ./packages/front/dist
	rm -rf ./packages/back/dist
	rm -rf package-lock.json

lint: ## Lint the code
	npm run format && npm run lint

test: ## Run unit tests
	cd ./packages/front/ && npm run test:unit
