FROM openjdk:8
ARG JAR_FILE=target/qna-0.0.1-SNAPSHOT.war
COPY ${JAR_FILE} passgymqna.war 
ENTRYPOINT ["java","-Xms1024m","-Xmx1024m","-jar","/passgymqna.war"]