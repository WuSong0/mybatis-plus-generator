#!/bin/bash
version=3.5.1.4
mvn clean package -DskipTests
docker build -t mybatis-plus-code-generator:$version .
docker tag mybatis-plus-code-generator:$version mybatis-plus-code-generator:$version
docker push mybatis-plus-code-generator:$version
git tag -a $version -m "v$version"
git push origin $version