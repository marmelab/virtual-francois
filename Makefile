.PHONY: logs

help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

start: ## Start the application
	cd ./packages/front/ && npm run dev

build: ## Build the application for production
	cd ./packages/front/ && npm run build

lint: ## Lint the code
	npm run format && npm run lint

test: ## Run unit tests
	cd ./packages/front/ && npm run test:unit
