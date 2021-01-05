.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## install dependencies
	@yarn

run: run-web

run-web: ## run the integration demo
	@yarn -s run-web

run-web: ## run the integration demo
	@yarn -s run-web

build-module-core: ## build core
	@echo "Transpiling submodule core files...";
	@rm -rf node_modules && rm -rf yarn.lock && yarn
	@cd ./packages/ui-utils && yarn -s clear && yarn -s build
	@cd ./packages/ui-scl && yarn -s clear && yarn -s build
	@cd ./packages/ui-core && yarn -s clear && yarn -s build
	@cd ./packages/ui-core-components && yarn -s clear && yarn -s build
	@cd ./modules/ui-rc-layouts && yarn -s clear && yarn -s build
	@cd ./examples/ui-demo && yarn -s clear && yarn -s build
