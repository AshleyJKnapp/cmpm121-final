# Devlog Entry - 11/15/2024
## Introducing the team

### Tools Lead: Nathaniel-Berl Valdenor 
This person will research alternative tools, identify good ones, and help every other team member set them up on their own machine in the best configuration for your project. This person might also establish your team’s coding style guidelines and help peers setup auto-formatting systems. This person should provide support for systems like source control and automated deployment (if appropriate to your team’s approach).

### Engine Lead: Kevin Gallegos
This person will research alternative engines, get buy-in from teammates on the choice, and teach peers how to use it if it is new to them. 
The Engine Lead should also establish standards for which kinds of code should be organized into which folders of the project. They should try to propose software designs that insulate the rest of the team from many details of the underlying engine.

## Prototyping Lead: Trish Nguyen
This person will make quick proof of concepts mechanics that will convey the idea of the final product. This might involve making small code examples outside of the main game project to teach others. This person should lead the discussion of scope and stop the team from over-reaching on aspects of the product that cannot be completed before the deadline.

### Design Lead: Ashley Knapp
This person will be responsible for setting the creative direction of the project, and establishing the look and feel of the game. They might make small art or code samples for others to help them contribute and maintain game content. Where the project might involve a domain-specific language, the Design Lead (who is still an engineer in this class) will lead the discussion as to what primitive elements the language needs to provide.

## Tools and materials

We intend to use Javscript with the Phaser library to create our game. We have decided on starting with Javascript as that is what every member has the most experience with, and from which the Phaser library has been built on. We have settled on Phaser as well because of our experience with the framework before and hope that experience will guide us when we make the transition to Typescript.

We will be using Javascript, JSON, and HTML during our development. Our game will be ran through a web browser through HTML and supported through Javascript and JSON. We decided on strating with Javascript while we have more experience in the past with Javascript and this will be a learning experience in transitioning a Javascript framework to a Javascript adjacent language(Typescript). 


We will be using Clip Studio Paint and Krita for our visual assets as they both are able to work with PSD files. We have chosen these programs as our Design Lead and Prototyping lead have expertise with each respectively and can collaborate on the work. We will all be using Visual Studio Code for writing code as well as testing through local hosting.

Our alternate platform choice will be transitioning from Javascript to Typescript. As stated before this will be an experience transitioning a Javascript framework into Typescript, a Javascript adjacent language. We have also chosen Typescript as the alternate platform choice to keep on building upon the foundation that we have started since the beginning of the school quarter.

## Outlook

We anticipate the transition between Javascript to Typescript being the hardest part of this project. This is because Phaser has been build on the Javascript language and even if we are merely moving to an adjacent language there are going to be many conflicts that we cannot overlook in order for our game to function. There will be a lot of refactoring and revision of the previously working code, perhaps even some deletions if it seems we cannot transition a mechanic in an appropiate amount of time due to the deadline.

---

# Devlog Entry - F0
## How we satisfied the software requirements
- F0.a: The player controls a character (WASD) that moves in specified increments that match the size of tiles in the game, to accentuate the grid based movement and grid/tile based planting system. On game initialization, transparent tiles are created all over the ground in the game, forming a grid. Plants are to be placed in these tiles, so they are forced to be in the grid.
- F0.b: Every time the player moves, a turn passes in the game. A function is called to update all of the tiles in the game, essentially signifying a turn. When every tile updates, it checks if the attached plant (if the tile has a plant) grows, and sets the correct sun and water values for the tile.
- F0.c: The player is able to plant on the tile in front of the character by pressing Enter. The player is not intended to harvest these plants as the game is designed to have the player grow them in the right spots.
- F0.d: All tiles/Grid cells have sun and water levels. Every turn, a function will generate and replace the sun level, while the water function generates a number and adds that to the water level. The water level of a tile is decreased when a plant grows on it.
- F0.e: There are three plants: Chair, Table, and Wall. The player can choose which of these plants they want to plant by selecting 1, 2, and 3 to plant a Chair, Table, or Wall respectively. Each of these "plants" have three growth stages: the egg stage, middle stage, and fully grown stage.
- F0.f: Tables are only able to grow if there are at least two fully grown chairs directly adjacent to it. Its checking logic parses an array of all current plants and searches the matching x,y tiles that also have the right fully grown plant type (Chair). Walls are only able to grow if there is at least one Wall plant (any growth stage) in the same column or row as it. Its checking logic also parses an array of all current plants and searches for the matching x,y tiles that also have the right plant type (Wall).
- F0.g: Currently, the tutorial is marked as complete when the player grows at least one table, two chairs, and 4 walls to the fully grown status.

## Reflection
Our group had considered using Godot GDScript while switching to C# later, but after some discussion we decided to go with our original choice of Phaser. Our whole group was already experienced with phaser so our Engine lead did not have to teach us how to use it. As for team role adjustments, while discussing the project as a team, we came to realize that Nathaniel seems to fit the role of designer better, as he proposed the creative direction we eventually went with. Ashley seemed to better fit the role of Engine lead as she would figure out how to connect our different class files together. She would also explain how the different parts of the code are supposed to work together.

---

# Devlog Entry - F1
## How we satisfied the software requirements
- F1.a: Our team was able to back our game’s grid using a Contiguous byte array(AoS) referenced in our code as the ByteStructure  class saved in its own file, ByteStructure.js.  Using the Uint8Array we allow 11 bytes per tile which  all have roles such as Tile attributes, tile positions and some bytes for the plant system. For this system we also made sure we had a method to retrieve a tile’s attributes by Index called getTiledAttributes.
- F1.b:  We created two buttons at the top of the game outside the canvas that allow for multiple save states. These buttons save each to a different local storage item as respectively, “KEY1” or “KEY2”. Then from here if the player reloads they can go to the main menu and look for their save, upon pressing the key is passed to the next scene and local storage would be able to recognize it and load the save file.
- F1.c: The game automatically saves when moving around to the local storage item “LOCAL” and loads this in the main menu by pressing the autosave file button to load the save file containing the previously saved items
- F1.d: The player as of now can press new game to start a fresh save that undos all previous work

![F1_diagram](https://github.com/AshleyJKnapp/cmpm121-final/blob/main/ArrayOfStructs%20Diagram.png)

## Reflection
Although difficult and a noticably in need of same changes and fixes, we were able to implement the the games grid as a Contiguous Byte array and implement a save system similar to one done in an earlier project this quarter. With this knowledge, creating a save file system wasn't as challenging as it would be without previous work on javascript and its localstorage. Although Intuitive, there is room for improvement especially to make sure everything works fully as intended when it comes to the sav file system implemented, regardless functionality is present and adding on top of it such as saving more data to a specific item in local storage shouldn't pose much as challenge compared to getting the base functionality off the ground.
