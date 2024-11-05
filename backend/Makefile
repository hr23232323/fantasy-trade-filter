# Variables
GCP_PROJECT=fantasy-trade-targets
APP_NAME=backend


# Make commands to deploy app to GCP Cloud Run

# Build for Cloud Run
.PHONY: build-cloud
build-cloud:
	docker buildx build --platform linux/amd64 -t gcr.io/$(GCP_PROJECT)/$(APP_NAME) .

# Build for Local
.PHONY: build-local
build-local:
	docker build -t gcr.io/$(GCP_PROJECT)/$(APP_NAME) .

.PHONY: push
push:
	docker push gcr.io/$(GCP_PROJECT)/$(APP_NAME)

.PHONY: run
run:
	docker run -p 8080:8080 gcr.io/$(GCP_PROJECT)/$(APP_NAME)


.PHONY: deploy
deploy:
	$(MAKE) build-cloud && $(MAKE) push && gcloud run deploy $(APP_NAME) \
	--image gcr.io/$(GCP_PROJECT)/$(APP_NAME) \
	--platform managed \
	--region us-central1 \
	--allow-unauthenticated
