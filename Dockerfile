FROM openjdk:17-jdk-alpine
COPY target/mybatis-plus-code-generator-*.jar app.jar
ENTRYPOINT ["sh", "-c", "java -jar app.jar"]