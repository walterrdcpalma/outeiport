FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY ["Outeiport.Api/Outeiport.Api.csproj", "Outeiport.Api/"]
RUN dotnet restore "Outeiport.Api/Outeiport.Api.csproj"
COPY . .
WORKDIR "/src/Outeiport.Api"
RUN dotnet publish "Outeiport.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Outeiport.Api.dll"]
