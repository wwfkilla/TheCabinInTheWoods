document.addEventListener('DOMContentLoaded', function() {
    const outputElement = document.getElementById('gameOutput');
    const inputElement = document.getElementById('commandInput');

    // Define game state
    let gameState = {
        currentNode: 'titleScreen',
        radioChanged: false,
        cigaretteLit: false,
        hasFlashlight: false,
        hasKnife: false,
        hasAmmo: false,
        hasShotgun: false   
    };

    document.addEventListener('focusCommandInput', function() {
        setTimeout(() => {
            const input = document.getElementById('commandInput');
            if (input) {
                input.focus();
                if (document.activeElement !== input) {
                    input.setSelectionRange(0, 0);
                }
            }
        }, 100); // Short delay to ensure the DOM is fully loaded and interactive
    });

    // Initial focus when the page loads
    window.onload = function() {
        document.getElementById('commandInput').focus();
    };

    function appendOutput(text) {
        if (text === undefined) {
            console.error("Error: text is undefined in appendOutput");
            return;
        }
        const outputElement = document.getElementById('output');
        const p = document.createElement('p');
        p.textContent = text;
        outputElement.appendChild(p);
    }

    function clearChat() {
        outputElement.innerHTML = ''; 
    }

    function showCommands(commands) {
        appendOutput("");
        appendOutput("");
        appendOutput(""); 
        appendOutput("Available commands: " + commands.join(", "));
    }

// Typewriter effect function
function typeWriter(text, callback) {
    console.log("TypeWriter text: ", text); // Add this line for debugging
    let i = 0;
    let output = '';
    let span = document.createElement('span');
    outputElement.appendChild(span);
    inputElement.disabled = true;

    const skipEffect = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            span.textContent = text; 
            clearInterval(interval); 
            document.removeEventListener('keypress', skipEffect);
            inputElement.disabled = false; 
            inputElement.focus();
            if (callback) callback();
        }
    };
    document.addEventListener('keypress', skipEffect);

    const interval = setInterval(() => {
        if (i < text.length) {
            output += text.charAt(i);
            span.textContent = output;
            i++;
        } else {
            clearInterval(interval);
            document.removeEventListener('keypress', skipEffect);
            inputElement.disabled = false; 
            inputElement.focus();
            if (callback) callback();
        }
    }, 50); // Speed of typing
}

    
    // Node-based game structure with line breaks in descriptions
    
    function appendOutput(text) {
    outputElement.innerHTML += text.replace(/\n/g, '<br>') + '<br>';
    outputElement.scrollTop = outputElement.scrollHeight;
}
    
    const nodes = {
        titleScreen: {
            description: "Welcome to\n\n" +
                         "██╗    ██╗██╗  ██╗██╗████████╗███████╗ ██████╗ ██╗   ██╗████████╗\n" +
                         "██║    ██║██║  ██║██║╚══██╔══╝██╔════╝██╔═══██╗██║   ██║╚══██╔══╝\n" +
                         "██║ █╗ ██║███████║██║   ██║   █████╗  ██║   ██║██║   ██║   ██║   \n" +
                         "██║███╗██║██╔══██║██║   ██║   ██╔══╝  ██║   ██║██║   ██║   ██║   \n" +
                         "╚███╔███╔╝██║  ██║██║   ██║   ███████╗╚██████╔╝╚██████╔╝   ██║   \n" +
                         " ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝    ╚═╝   \n" +

                         "\nA Text-Based Adventure Game Created by <a href='https://x.com/wwfkilla' target='_blank'>wwfkilla</a>" +
                         "\n\n=============================\n" +
                         "|      TYPE START GAME       |\n" +
                         "=============================",
                         commands: ['start game', 'about'],
                         onCommand: (command) => {
                             if (command === 'start game') {
                                 appendOutput("Loading game...");
                                 setTimeout(() => {
                                     changeScene('scene1');
                                 }, 2000); // 2-second delay
                                 return;
                             }
                             if (command === 'about') {
                                 appendOutput("WHITEOUT\n\n" +
                                              "Created by: wwfkilla\n" +
                                              "Follow me on X: https://x.com/wwfkilla\n\n" +
                                              "In this game, you will embark on a mysterious journey through a snowstorm. Make choices, solve puzzles, and uncover the secrets of the cabin in the woods.");
                                 showCommands(nodes['titleScreen'].commands);
                                 return;
                             }
                             return handleInvalidCommand();
                         }
                     },
        scene1: {
                    description: "It's late January 1994, and the world outside your car window is a blur of white. Snowflakes dance wildly in the beams of your headlights, obscuring the road ahead. The tires crunch over the fresh snow, each turn of the wheel a gamble against the slippery surface. Inside the car, a terrible song blares from the radio, its grating melody almost as unbearable as the blinding snowstorm outside.\n\nThe radio crackles with static, the song's lyrics barely discernible through the distortion, making the drive even more arduous. Your hands grip the steering wheel tightly, your focus split between the treacherous road and the torment of the music. The heater is on full blast, creating the only refuge from the harsh winter outside. The song's incessant beat seems determined to shatter this small semblance of peace.",
                    commands: ['change radio station', 'light a cigarette', 'check rearview mirror'],
                    onCommand: (command) => {
                        if (command === 'change radio station') {
                            gameState.radioChanged = true;
                            changeScene('scene2'); // Transition to Scene 2
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                        if (command === 'light a cigarette') {
                            gameState.cigaretteLit = true;
                            return "You fumble for your pack, light up, and take a drag. The smoke curls into the frosty air, offering a brief moment of calm.";
                        }
                        if (command === 'check rearview mirror') {
                            return "You glance in the rearview mirror. The road behind you is empty, but there's an eerie feeling you're not alone out here.";
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene2: {
                    description: "The moment you twist the radio dial, seeking refuge from the cacophony, your eyes flick back to the road just in time to catch a deer frozen in the headlights. Panic surges through you as you yank the steering wheel to avoid the animal. The car skids, tires losing their grip on the icy road, and you're propelled off the path into the dense, snowy woods.\n\nThe car comes to an abrupt halt amidst the trees, the engine silent, the only sound the soft hiss of settling snow and your own ragged breath. The darkness outside is overwhelming, with the snow still falling, creating a surreal, almost otherworldly scene. The car's interior offers a false sense of security, the chill of the outside seeping in, reminding you of your precarious situation. The deer, unharmed, bounds away, leaving you alone with the aftermath of your sudden detour.",
                    commands: ['go outside and inspect', 'open glovebox', 'try to start car'],
                    onCommand: (command) => {
                        if (command === 'go outside and inspect') {
                            changeScene('scene3'); // Transition to Scene 3
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                        if (command === 'open glovebox') {
                            gameState.hasFlashlight = true;
                            return "You open the glovebox and find a flashlight.";
                        }
                        if (command === 'try to start car') {
                            return "You turn the key and the engine start. You try to reverse, but the car is stuck in the snow.";
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene3: {
                    description: "The cold hits you like a wall the moment you step outside. The snow, now ankle-deep around the car, has trapped it securely in an icy embrace with no hope of escape by simple means. The wind has picked up, swirling the snow into a dizzying dance around you. Your breath forms clouds in the frigid air as you survey the damage. That's when you notice them - fresh tracks leading into the dense woods, a stark contrast against the otherwise untouched snow.\n\nThe car, though powerless, still holds the promise of shelter, a temporary reprieve from the relentless cold. However, the tracks beckon, suggesting another presence, perhaps help or at least answers. The main road, where your journey began, is now just a ghostly outline in the night, its continuation obscured by the storm. Yet, something about the quiet, the way the wind howls, or maybe just your intuition, makes you reconsider venturing further down that path alone.",
                    commands: ['go back in car', 'follow tracks', 'continue on main road'],
                    onCommand: (command) => {
                        if (command === 'go back in car') {
                            changeScene('scene4'); // Transition to Scene 4
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                        if (command === 'follow tracks') {
                            if (gameState.hasFlashlight) {
                                console.log("Player has flashlight, going to scene5a");
                                changeScene('scene5a'); // Player has flashlight, go to scene 5a
                                return; // Exit the function so invalid command handler isn't triggered
                            } else {
                                console.log("Player does not have flashlight, going to scene5b");
                                changeScene('scene5b'); // Player does not have flashlight, go to scene 5b
                                return; // Exit the function so invalid command handler isn't triggered
                            }
                        }
                        if (command === 'continue on main road') {
                            return "You start walking along the road, but an inexplicable feeling of unease or perhaps a sound lost in the storm makes you turn back to the car for safety.";
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene4: {
                    description: "You retreat back into the car, the door slamming shut against the howling wind, sealing you in a bubble of temporary warmth. The heater, still running off the car's dwindling battery, offers a brief respite from the freezing cold outside. You sit there, letting the heat seep into your chilled bones, watching the snowflakes continue their relentless dance in the beams of your headlights. But the reprieve is short-lived; a sudden, ominous silence falls as the engine dies, leaving only the faint glow of the headlights to pierce the darkness.\n\nNow, the silence is almost deafening, the only sounds your own breath and the distant whisper of the storm. With the engine out, the car becomes just another cold shell in the vast, snowy wilderness. Your options dwindle; the flashlight in the glovebox, which you hadn't noticed before in your haste, might be useful. Or perhaps the tracks you saw earlier, leading into the woods, weren't such a bad idea after all.",
                    commands: ['check glovebox', 'follow tracks'],
                    onCommand: (command) => {
                        if (command === 'check glovebox') {
                            if (!gameState.hasFlashlight) {
                                gameState.hasFlashlight = true;
                                return "You open the glovebox, and there it is - a flashlight. You add it to your inventory, hoping it'll light your way through whatever comes next.";
                            } else {
                                return "You check the glovebox again, but there's nothing of use in there.";
                            }
                        }
                        if (command === 'follow tracks') {
                            if (gameState.hasFlashlight) {
                                console.log("Player has flashlight, going to scene5a");
                                changeScene('scene5a'); // Player has flashlight, go to scene 5a
                                return; // Exit the function so invalid command handler isn't triggered
                            } else {
                                console.log("Player does not have flashlight, going to scene5b");
                                changeScene('scene5b'); // Player does not have flashlight, go to scene 5b
                                return; // Exit the function so invalid command handler isn't triggered
                            }
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene5a: {
                    description: "With the flashlight in hand, you venture into the woods, each step crunching through the snow beneath your boots. The beam of light pierces the darkness, casting long, eerie shadows across the snow-covered ground, making the forest seem alive with whispers and movements just out of sight. The path is treacherous, but the light guides you, offering a semblance of safety in this frozen wilderness. After what feels like an eternity of following the tracks, you come upon a cabin. It stands solitary against the backdrop of the dense woods, its windows dark but for a faint glow from within. There are no signs of vehicles, no tracks leading away, only the ones you followed here. The cabin, with its peeling paint and snow-laden roof, looks abandoned, yet the light inside suggests otherwise, a silent invitation or perhaps a warning.\n\nYou approach cautiously, your breath visible in the cold night air. The flashlight illuminates the door, which is slightly ajar, suggesting someone might have just passed through or left in haste. The silence around the cabin is profound, broken only by the occasional creak of wood expanding in the cold. The light from your flashlight reflects off the snow, creating a stark contrast that makes the cabin appear almost spectral. Your heart beats louder as you consider your next move, each option fraught with the potential for discovery or danger.",
                    commands: ['knock on door', 'check window', 'open door'],
                    onCommand: (command) => {
                        if (command === 'knock on door') {
                            return "You knock, but there's no answer. The silence is eerie.";
                        }
                        if (command === 'check window') {
                            return "You peer through the window. There's light inside, suggesting someone or something is home.";
                        }
                        if (command === 'open door') {
                            changeScene('scene6'); // Transition to Scene 6
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene5b: {
                    description: "Stepping out into the woods without the aid of light is like entering a world of shadows and uncertainty. The darkness is so complete that it feels tangible, pressing against you, making every step an act of faith. You move slowly, your hands extended before you to fend off unseen branches and to trace the faint outline of the tracks you're following. The cold is more biting here, without the warmth of the car, and the wind seems to carry a sinister whisper through the trees. Your eyes strain to make out shapes, and after countless stumbles and missteps, you finally discern the silhouette of a cabin, emerging like a ghost from the night. There's no sign of any vehicle, just the deep silence of the woods, the tracks ending at this lone structure.\n\nThe cabin, an old, weather-beaten structure, looks almost swallowed by the darkness, its windows barely visible against the night. Yet, as you draw closer, you see a dim light through one of the windows, a beacon in the vast, shadowy landscape. The absence of light in your hand makes every approach feel like a gamble, every sound amplified. Your fingers brush against the rough wood of the cabin's wall as you move toward the door, the cold seeping through your gloves. The stillness of the night is broken only by your own cautious movements and the distant howl of the wind, leaving you with a choice: to knock, to look, or to enter, each decision shadowed by the unknown.",
                    commands: ['knock on door', 'check window', 'open door'],
                    onCommand: (command) => {
                        if (command === 'knock on door') {
                            return "You knock, but there's no answer. The silence is eerie.";
                        }
                        if (command === 'check window') {
                            return "You peer through the window. There's light inside, suggesting someone or something is home.";
                        }
                        if (command === 'open door') {
                            changeScene('scene6'); // Transition to Scene 6
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene6: {
                    description: "Stepping into the cabin, the air is thick with the scent of age and neglect, the warmth from within a stark contrast to the icy grip of the storm outside. The interior is dimly lit by oil lamps, casting long shadows that dance across the wooden walls. Your eyes adjust to the light, revealing a rustic scene: a stone fireplace sits dormant, its hearth filled with ashes, beckoning for a fire to chase away the chill. To your right, an old desk is cluttered with artifacts, each one whispering tales of a time long past. Among them, a book catches your attention, not for its content but for its binding; it's wrapped in what appears, disturbingly, to be human flesh. The leather is worn, the pages yellowed with age, and the title is illegible from where you stand. On the floor, there's a trapdoor, partially hidden by a threadbare rug, suggesting a way down to a basement, its purpose and contents a mystery.\n\nAs you take a step further into the room, the cabin creaks under your weight, its wood groaning like it's protesting your intrusion. The silence here is different from the woods; it's heavy, almost oppressive, as if the cabin itself is holding its breath. The artifacts on the desk include old maps, a compass, and various trinkets that look like they could be from another era or culture. The book on the desk, with its grotesque cover, seems to pulse with an eerie energy, tempting you to delve deeper into its secrets. The trapdoor to the basement looms ominously, an invitation to uncover whatever is hidden beneath this isolated refuge. Each option before you feels like it could lead to salvation or to something far more sinister.",
                    commands: ['go to fireplace', 'go to basement', 'look around cabin', 'open book'],
                    onCommand: (command) => {
                        if (command === 'go to fireplace') {
                            return "You gather some of the wood piled beside the fireplace, light it up, and soon a warm fire crackles, offering some comfort.";
                        }
                        if (command === 'go to basement') {
                            if (gameState.hasFlashlight) {
                                changeScene('scene7a'); // Player has flashlight, go to scene 7a
                                return; // Exit the function so invalid command handler isn't triggered
                            } else {
                                changeScene('scene7b'); // Player does not have flashlight, go to scene 7b
                                return; // Exit the function so invalid command handler isn't triggered
                            }
                        }
                        if (command === 'look around cabin') {
                            return "You explore the cabin further, finding nothing but old furniture and dust. There's an eerie sense that you're not alone here.";
                        }
                        if (command === 'open book') {
                            changeScene('scene8'); // Transition to Scene 8
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene7a: {
                    description: "With your flashlight leading the way, you lift the trapdoor and descend into the basement. The beam of light cuts through the darkness, revealing stone walls and a dirt floor. The air is musty, filled with the smell of earth and something else, something metallic. There are shelves lined with jars, their contents obscured by age, but you can make out what appear to be preserved organs or perhaps just strange fruits. In one corner, there's an old workbench covered with tools, some of which look like they've been used for less savory pursuits than carpentry.",
                    commands: ['investigate jars', 'look at workbench', 'go back up'],
                    onCommand: (command) => {
                        if (command === 'investigate jars') {
                            gameState.hasAmmo = true; // Add ammo to inventory
                            return "You peer closer at the jars, expecting to find something gruesome, but instead, you see only canned soup and vegetables. However, tucked behind one of the jars, you find some shotgun ammo.";
                        }
                        if (command === 'look at workbench') {
                            gameState.hasKnife = true; // Add knife to inventory
                            return "The tools have stains on them, and there's an old, dried blood on the surface of the bench. You find a knife stuck in the wood, which you take.";
                        }
                        if (command === 'go back up') {
                            if (gameState.hasAmmo) {
                                changeScene('scene7c'); // Transition to Scene 7c if player has ammo
                            } else {
                                changeScene('scene6'); // Otherwise, go directly back to Scene 6
                            }
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                    }
                },
        scene7b: {
                    description: "Without a flashlight, descending into the basement is like stepping into the void. You fumble in the dark, feeling the trapdoor's edge as you lower yourself down. The darkness is absolute, your only guide the rough texture of the stone walls as you feel your way. Every sound echoes, your own breathing the loudest noise. You manage to find a spot that feels like a workbench, but what's on it is a mystery. The air carries a scent of decay and metal, suggesting this place has witnessed more than just storage.",
                    commands: ['feel around workbench', 'touch shelves', 'go back up'],
                    onCommand: (command) => {
                        if (command === 'feel around workbench') {
                            gameState.hasKnife = true; // Add knife to inventory
                            return "Your hands brush against cold metal, possibly tools. You feel something sharp and pull out a knife that was stuck in the bench top.";
                        }
                        if (command === 'touch shelves') {
                            return "You run your hands over the shelves, feeling various shapes of jars and cans, but nothing unusual or useful.";
                        }
                        if (command === 'go back up') {
                            if (gameState.hasAmmo) {
                                changeScene('scene7c'); // Transition to Scene 7c if player has ammo
                            } else {
                                changeScene('scene6'); // Otherwise, go directly back to Scene 6
                            }
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                    }
                },
        scene7c: {
                    description: "After your exploration in the basement, you make your way back up through the trapdoor, pulling yourself back into the cabin. As you stand, your eyes catch something new - a shotgun resting atop the fireplace. It seems like fate or perhaps someone's oversight left it there for you. You secure the shotgun, checking to see if it's loaded. It's not, but you've found ammo, so you load it up. It feels reassuring in your hands.",
                    commands: ['continue exploring'], // This should match what's checked in onCommand
                    onCommand: (command) => {
                        if (command === 'continue exploring') {
                            gameState.hasShotgun = true; // Add shotgun to inventory
                            changeScene('scene6'); // Transition back to Scene 6
                            return; // Exit the function so invalid command handler isn't triggered
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                }
        };
    


// Manage scene transitions
function changeScene(nodeKey) {
    console.log("Attempting to change to scene: ", nodeKey);
    const node = nodes[nodeKey];
    console.log("Node object: ", node); // Add this line for debugging
    if (node) {
        console.log("Scene found, changing...");
        console.log("Scene description: ", node.description); // Add this line for debugging
        clearChat();
        if (node.description) {
            if (nodeKey === 'titleScreen') {
                appendOutput(node.description); // Directly append description for titleScreen
                showCommands(node.commands);
                gameState.currentNode = nodeKey;
            } else {
                typeWriter(node.description, () => {
                    showCommands(node.commands);
                    gameState.currentNode = nodeKey;
                });
            }
        } else {
            console.error("Error: Scene description for '" + nodeKey + "' is undefined.");
            appendOutput("Error: Scene description is missing. Please choose another action.");
            showCommands(nodes[gameState.currentNode].commands); // Show commands of the current scene again
        }
    } else {
        console.error("Error: Scene '" + nodeKey + "' does not exist.");
        appendOutput("Error: This scene does not exist. Please choose another action.");
        showCommands(nodes[gameState.currentNode].commands); // Show commands of the current scene again
    }
}

// Function to handle invalid commands
function handleInvalidCommand() {
    return "Invalid command. Try one of the following:\n" + getAvailableCommands().join(", ");
}

// Function to get available commands based on the current scene
function getAvailableCommands() {
    const node = nodes[gameState.currentNode];
    return node ? node.commands : [];
}

    // Start the game
    changeScene('titleScreen');
    
    // Handle user input
    inputElement.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    let command = this.value.toLowerCase();
                    this.value = '';

                    const node = nodes[gameState.currentNode];
                    const result = node.onCommand(command);
                    appendOutput(result);
                    // Here you might want to decide if the scene changes based on the command, but for now, we'll keep it simple.
                }
            });
});
