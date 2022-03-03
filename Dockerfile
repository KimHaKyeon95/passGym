FROM openjdk:8
ARG JAR_FILE=target/passgymback-0.0.1-SNAPSHOT.war
COPY ${JAR_FILE} passgymback.war 
ENTRYPOINT ["java","-Xms1024m","-Xmx1024m","-jar","/passgymback.war"]