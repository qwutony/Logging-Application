#!/bin/bash

time=$(date +"%T_%d%m%Y")

npm test --no-color 2>tests/test_$time.txt