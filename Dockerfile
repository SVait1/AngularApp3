# -----------------------------
# Stage 1: Build Angular (Node)
# -----------------------------
FROM node:20 AS client

WORKDIR /client
COPY angularapp3.client/ .

RUN npm ci
RUN npm run build -- --configuration production

# -----------------------------
# Stage 2: Build .NET
# -----------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src
COPY AngularApp3.Server/ AngularApp3.Server/

# Копируем Angular dist в wwwroot
COPY --from=client /client/dist/angularapp3.client/browser /src/AngularApp3.Server/wwwroot

WORKDIR /src/AngularApp3.Server
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# -----------------------------
# Stage 3: Runtime
# -----------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "AngularApp3.Server.dll"]
