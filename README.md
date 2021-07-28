# Trainee Playground

## Installation Guide

1. Install [Visual Studio Community 2019 Edition](https://visualstudio.microsoft.com/de/vs/) for Backend development
2. Install [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/visual-studio-sdks) if not installed with Visual Studio
3. Install [Visual Studio Code](https://code.visualstudio.com/) for Frontend development
   1. Install remote container support extension for vs code: ms-vscode-remote.remote-containers
4. Install [Docker](https://docs.docker.com/docker-for-windows/install/) for devcontainer support

## Start the project

1. Go to backend folder -> open solution with Visual Studio
2. Start the TraineePlayground project by clicking on play button
3. Allow SSL certification messages
4. Open frontend folder with Visual Studio Code
5. Click on reopen in container on the bottom right corner if the message box pops up -> everything will be set up for the user
6. Navigate with the terminal into the app folder
7. Type: `npm install`
8. Type: `npm run serve`
9. Open localhost:8080 in the browser -> if under the header "Hello World site" the text "hello world" is shown everything works fine
