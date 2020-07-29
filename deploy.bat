dotnet publish -c Release
docker build -t keepr ./bin/Release/netcoreapp3.1/publish
docker tag keepr registry.heroku.com/musaic-keepr/web
docker push registry.heroku.com/musaic-keepr/web
heroku container:release web --app musaic-keepr