DEPLOY_HOST = tga@space55.xyz
DEPLOY_DIR = /home/tga/coilsprite.com
DEPLOY_SERVICE = coilsprite.com
QR = $(wildcard static/img/qr/*.txt)
QR_TARGET = $(patsubst %.txt, %.png, $(wildcard static/img/qr/*.txt))

.PHONY: dev
dev:
	DEV=1 bun run --watch main.ts

.PHONY: deploy
deploy:
	rsync \
		-av --delete \
		--exclude .DS_Store \
		--exclude .git \
		--exclude data \
		--exclude node_modules \
		. $(DEPLOY_HOST):$(DEPLOY_DIR)
	ssh -t $(DEPLOY_HOST) "sudo systemctl restart $(DEPLOY_SERVICE)"

.PHONY: assets
assets: qr compress

.PHONY: qr
qr: $(QR_TARGET)

static/img/qr/%.png: static/img/qr/%.txt
	qrencode "$(shell cat "$<")" -s 16 -o qr.png
	magick qr.png -transparent white -trim "$@"
	rm qr.png

.PHONY: compress
compress:
	minimg -r static/

.PHONY: status
status:
	ssh -t $(DEPLOY_HOST) "sudo systemctl status $(DEPLOY_SERVICE)"
