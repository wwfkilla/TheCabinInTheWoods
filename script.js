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
        hasShotgun: false,
        hasBat: false,
        defenseChecked: false,
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
                            gameState.hasGarlic = true; // Add garlic to inventory
                            return "You peer closer at the jars, expecting to find something gruesome, but instead, you see only canned soup and vegetables. However, tucked behind one of the jars, you find a small jar of garlic cloves.";
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
                            gameState.hasGarlic = true; // Add garlic to inventory
                            return "You run your hands over the shelves, feeling various shapes of jars and cans. One jar feels familiar—it's a small jar of garlic cloves. You've added it to your inventory.";
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
                },
                scene8: {
                    description: "As you open the book, an uneasy chill runs down your spine, like icy fingers tracing the back of your neck. The pages are brittle, yellowed with age, and the ink is faded, as if the words themselves are reluctant to be read. What you can make out is unsettling: scrawled accounts of ancient creatures that rise from the darkness at night, their forms twisted and grotesque, feasting on the blood of the living. Their hunger is insatiable, their cruelty knows no bounds, and the descriptions are vivid enough to make your skin crawl—claws raking through flesh, eyes glowing like embers in the void, and whispers that echo in the silence before they strike. The air in the cabin grows heavier, the flickering light from the oil lamps casting shadows that seem to writhe across the walls, as if the book itself is summoning something from the edges of your vision.\n\nYou hesitate, your fingers trembling as they hover over the pages, but the book's pull is undeniable, like a siren's call laced with dread. The silence in the cabin is suffocating, broken only by the faint creak of the floorboards and the distant howl of the wind outside. Each word you read feels like a step deeper into a nightmare, and the book's grotesque binding—leather that looks disturbingly like human flesh—seems to pulse faintly under your touch.",
                    commands: ['read more', 'put the book down', 'look for clues in the cabin'],
                    onCommand: (command) => {
                        if (command === 'read more') {
                            return "You read of things that can kill them—garlic, silver, and a strange dark ritual—each described in detail, with an air of dread woven between the lines. One page describes a symbol that matches a carving you saw earlier on the cabin walls. Your eyes snap to it in a flash of realization: this place, this book, it's all connected to something ancient and terrifying.";
                        }
                        if (command === 'put the book down') {
                            return "You drop the book, its weight hitting the floor with a dull thud, but the unease lingers, as if its words have already burrowed into your mind.";
                        }
                        if (command === 'look for clues in the cabin') {
                            if (gameState.hasKnife && gameState.hasGarlic) {
                                gameState.defenseChecked = true; // Set defenseChecked to true
                                changeScene('scene9'); // Transition to scene 9 if the player has both the knife and garlic
                            } else {
                                changeScene('scene9'); // Go to scene 9 without setting defenseChecked if the player has only garlic
                            }
                            return; // Prevent further command processing after scene transition
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
                
        scene9: {
                    description: "The book's revelations linger in your mind, each word a splinter burrowing deeper into your thoughts. If you hadn't already let the book slip from your grasp in the dim light of the cabin, you clutch it tightly now, its grotesque cover cold against your palms, before setting it down with a shudder. As you try to shake off the unease, a shape moves outside the cabin window, its silhouette stark against the swirling snow. It's large, its movements swift and unnatural, like something not quite human—limbs too long, a gait too fluid, as if it defies the laws of flesh and bone. Your heart races, but the darkness and the storm make it hard to discern details, leaving only the impression of something wrong, something watching. You step closer to the window, your breath fogging the glass, and the cold seeps through, mingling with the dread pooling in your gut.\n\nThere's something out there, something that knows you're here, its presence pressing against the fragile barrier of the cabin walls. The hairs on the back of your neck stand up, a primal fear gripping you, whispering that you're trapped, caged in this decaying refuge. The silence inside is suffocating, broken only by the faint creak of the floorboards under your weight and the howling wind outside, which now sounds like a chorus of distant, mocking voices. The shape outside shifts again, a shadow among shadows, and you can't tell if it's circling the cabin or drawing closer, its intentions shrouded in the storm. Every instinct screams to act, to flee, to fight, but the cabin feels like a trap snapping shut, and the weight of its isolation presses down, leaving you to face whatever lurks beyond—or within—these walls.",
                    commands: ['try to leave through the door', 'investigate the window', 'look for something to defend myself'],
                    onCommand: (command) => {
                        console.log(`Current scene: ${gameState.currentNode}`);
                        console.log(`Received command: ${command}`);
                        if (command === 'try to leave through the door') {
                            if (gameState.defenseChecked) {
                                if (gameState.hasGarlic && gameState.hasKnife) {
                                    changeScene('scene10a'); // Transition to Scene 10a if player has garlic and knife
                                } else if (gameState.hasGarlic && gameState.hasBat) {
                                    changeScene('scene10b'); // Transition to Scene 10b if player has garlic and bat
                                } else if (gameState.hasBat) {
                                    changeScene('scene10c'); // Transition to Scene 10c if player has bat
                                } else {
                                    return "You need something to defend yourself before leaving the cabin.";
                                }
                            } else {
                                return "You must first look around for something to defend yourself with.";
                            }
                        }
                        if (command === 'investigate the window') {
                            return "The window seems blocked, the frame warped and frozen shut, as if the cabin itself is conspiring to keep you inside.";
                        }
                        if (command === 'look for something to defend myself') {
                            if (gameState.defenseChecked) {
                                return "You are well equipped and feel ready to try your luck outside.";
                            }
                            if (gameState.hasGarlic) {
                                gameState.hasBat = true; // Add bat to inventory
                                gameState.defenseChecked = true; // Set defenseChecked to true
                                return "You scramble through the cabin, desperation guiding your hands, and find a weathered baseball bat leaning against the wall. It's heavy, solid, and might just keep you alive.";
                            }
                            gameState.hasBat = true; // Add bat to inventory if no knife or garlic
                            gameState.defenseChecked = true;
                            return "You scramble through the cabin, desperation guiding your hands, and find a weathered baseball bat leaning against the wall. It's heavy, solid, and might just keep you alive.";
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
                

        scene10a: {
                    description: "As you're about to open the door, the door bursts open, and a dark figure lunges at you. Its eyes glow with a predatory hunger, its fangs bared. You barely manage to step back as it reaches for your throat. Panic surges through your veins. In a panic, you grab the knife and stab at the creature, but the blade slides off its leathery skin, ineffective against its unnatural form. The creature hisses in anger, its eyes narrowing as it lunges again. Then, in the chaos, your eyes lock on the jar of garlic on the floor. Without hesitation, you hurl it at the creature. It recoils with a deafening hiss, its skin blistering as the scent burns it. With a final shriek, the creature collapses to the floor, its body disintegrating into ash.",
                    commands: ['close the door', 'look around the cabin for more clues', 'go back to the basement'],
                    onCommand: (command) => {
                        if (command === 'close the door') {
                            return "You slam the door shut, making sure the threat is over.";
                        }
                        if (command === 'look around the cabin for more clues') {
                            changeScene('scene11');
                            return;
                        }
                        if (command === 'go back to the basement') {
                            return "The basement has nothing left for you; you might want to look around the cabin for more clues.";
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene10b: {
                    description: "The door bursts open, and a dark figure lunges at you. Its eyes glow with a predatory hunger, its fangs bared. You stumble back as the creature reaches for your throat. Panic surges through your veins. In the chaos, you scramble to grab something to defend yourself. Your hands land on the weathered baseball bat you found earlier, and you swing it at the creature. It deflects the blow, but you don't give up. Desperation grips you, and you hurl a jar of garlic at it. The creature recoils with a deafening hiss, its skin blistering as the scent burns it. With a final shriek, the creature collapses to the floor, its body disintegrating into ash.",
                    commands: ['close the door', 'look around the cabin for more clues', 'go back to the basement'],
                    onCommand: (command) => {
                        if (command === 'close the door') {
                            return "You slam the door shut, making sure the threat is over.";
                        }
                        if (command === 'look around the cabin for more clues') {
                            changeScene('scene11');
                            return;
                        }
                        if (command === 'go back to the basement') {
                            return "The basement has nothing left for you; you might want to look around the cabin for more clues.";
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
        scene10c: {
                    description: "The door bursts open, and a dark figure lunges at you. Its eyes glow with a predatory hunger, its fangs bared. You barely manage to step back as it reaches for your throat. Panic surges through your veins. With no other option, you grab the weathered baseball bat that you found earlier and swing it with all your might. The blow connects, sending the creature staggering back. But the creature is relentless, and it charges again. As a final act of desperation, you take one more swing, hitting it squarely in the head. With a sickening crunch, the vampire's body disintegrates into ash, its monstrous form collapsing to the floor.",
                    commands: ['close the door', 'look around the cabin for more clues', 'go back to the basement'],
                    onCommand: (command) => {
                        if (command === 'close the door') {
                            return "You slam the door shut, making sure the threat is over.";
                        }
                        if (command === 'look around the cabin for more clues') {
                            changeScene('scene11');
                            return;
                        }
                        if (command === 'go back to the basement') {
                            return "The basement has nothing left for you; you might want to look around the cabin for more clues.";
                        }
                        return handleInvalidCommand(); // Handle invalid commands
                    }
                },
                    
                

        };
    


// Manage scene transitions
function changeScene(nodeKey) {
    console.log("Attempting to change to scene: ", nodeKey);
    const node = nodes[nodeKey];
    console.log("Node object: ", node); // Add this line for debugging
    if (node) {
        console.log("Scene found, changing...");
        console.log("Scene description: ", node.description); // Add this line for debugging
        clearChat(); // Clear previous output
        if (node.description) {
            if (nodeKey === 'titleScreen') {
                appendOutput(node.description); // Directly append description for titleScreen
                showCommands(node.commands); // Show titleScreen commands
                gameState.currentNode = nodeKey;
            } else {
                typeWriter(node.description, () => {
                    showCommands(node.commands); // Update commands for the new scene
                    gameState.currentNode = nodeKey; // Update the current scene
                });
            }
        } else {
            console.error("Error: Scene description for '" + nodeKey + "' is undefined.");
            appendOutput("Error: Scene description is missing. Please choose another action.");
            showCommands(nodes[gameState.currentNode].commands); // Show previous scene commands
        }
    } else {
        console.error("Error: Scene '" + nodeKey + "' does not exist.");
        appendOutput("Error: This scene does not exist. Please choose another action.");
        showCommands(nodes[gameState.currentNode].commands); // Show previous scene commands
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
