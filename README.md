# Trainee Playground

## Installation Guide

1. Install [Visual Studio Community 2022 Edition](https://visualstudio.microsoft.com/de/vs/) for Backend development (with module ASP.NET and Web development)
2. Install [.NET Core 6.0 SDK](https://dotnet.microsoft.com/download/visual-studio-sdks) if not installed with Visual Studio
3. Install [Visual Studio Code](https://code.visualstudio.com/) for Frontend development
   1. Install remote container support extension for vs code: ms-vscode-remote.remote-containers

## Start the project

1. Go to backend folder -> open solution with Visual Studio
2. Start the TraineePlayground project by clicking on play button
3. Allow SSL certification messages
4. Open frontend folder with Visual Studio Code
5. Click on reopen in container on the bottom right corner if the message box pops up -> everything will be set up for the user
6. Navigate with the terminal into the app folder
7. Type: `yarn run dev`
8. Open localhost:8080 in the browser -> if under the header "Hello World site" the text "hello world" is shown everything works fine

## Your Task

### api usermanagment
- create user firstName, lastName, email
- get user details
- get user list
- delete user
- validate user data + unit test

user list in memory or filesystem is ok. db only when you want, maybe sqlite.
 
### vuejs (see https://vuejs.org/guide/introduction.html)
  - userlist: axios VDataTableServer
    - see https://vuetifyjs.com/en/components/data-tables/basics/#usage
    - see https://vuetifyjs.com/en/components/data-tables/server-side-tables/#server-side-paginate-and-sort
  - user detail
  - userlist: server side filter + sorting
  - user delete
  - user create
