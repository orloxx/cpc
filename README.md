     ██████╗██████╗  ██████╗
    ██╔════╝██╔══██╗██╔════╝
    ██║     ██████╔╝██║
    ██║     ██╔═══╝ ██║
    ╚██████╗██║     ╚██████╗
     ╚═════╝╚═╝      ╚═════╝ v0.0.2

A program to easily change context between projects.

    npm install -g @orloxx/cpc

## Usage

    cpc [core action|context action]

Start by creating a new context

    cpc add

Activate the context by using it

    cpc use

Edit/Add custom actions for the current context

    cpc edit

Get context configuration information

    cpc info

Remove a whole context configuration

    cpc remove

## Running custom actions

Execute custom actions from the current context

    cpc run

Or, you can also execute the action directly if you know the name

    cpc <context action>

## Loading configuration

Load context. Make sure you're in the same directory as `cpcconfig.json`

    cpc load

Here is a sample configuration:

    {
        "name": "custom-context",
        "description": "Sample context with few actions",
        "actions": {
            "say-hi": {
                "name": "say-hi",
                "path": "",
                "command": "echo 'Hi there!'",
                "description": "Says hi"
            },
            "show-home": {
                "name": "show-home",
                "path": "~/",
                "command": "ls -la",
                "description": "Prints out all files in the home folder"
            }
        }
    }

After loading this example you can execute the `say-hi` action

    cpc say-hi

[<img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=orloxx&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff">](https://www.buymeacoffee.com/orloxx)
