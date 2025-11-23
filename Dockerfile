FROM maven:3.8.7-eclipse-temurin-8 AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:8-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8070
ENV PORT=8070
CMD ["sh", "-c", "java -jar -Dserver.port=${PORT} app.jar"]

