# -----------------------------
# Stage 1: Build .NET + Angular
# -----------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

# Копируем проекты
COPY AngularApp3.Server/ AngularApp3.Server/
COPY angularapp3.client/ angularapp3.client/

# Angular собирается внутри .csproj автоматически
WORKDIR /src/AngularApp3.Server
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# -----------------------------
# Stage 2: Runtime
# -----------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 80
ENTRYPOINT ["dotnet", "AngularApp3.Server.dll"]
