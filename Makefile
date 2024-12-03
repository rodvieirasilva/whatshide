ifeq ($(OS),Windows_NT)
	SHELL := "D:/Program Files/Git/bin/bash.exe"
	SEVENZIP := "C:/Program Files/7-Zip/7z.exe"
endif

.PHONY: build

build:
	$(SEVENZIP) a -tzip whatshide.zip * -x!Makefile -x!temp.txt -x!resources* -x!whatshide.zip