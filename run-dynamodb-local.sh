#!/bin/sh

java -Djava.library.path=./DynamoDBLocal_lib -jar ./ext/DynamoDBLocal.jar -sharedDb -inMemory

