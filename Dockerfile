FROM maven:3.8.7-openjdk-8-slim AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

FROM openjdk:8-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8070
ENV PORT=8070
CMD ["sh", "-c", "java -jar -Dserver.port=${PORT} app.jar"]

