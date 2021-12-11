     ██████╗██████╗  ██████╗
    ██╔════╝██╔══██╗██╔════╝
    ██║     ██████╔╝██║
    ██║     ██╔═══╝ ██║
    ╚██████╗██║     ╚██████╗
     ╚═════╝╚═╝      ╚═════╝ v0.1.1

A program to easily change context between projects.

    npm install -g @orloxx/cpc

## Usage

    cpc [core action|context action]

Start by creating a new context

    cpc init

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

It loads the context configuration from `configPath` which accepts .js files,
if empty it will look for `./cpcconfig.json`

    cpc load [configPath]

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

## Post-use action

After using the `use` or `load` command, CPC will look for the `postuse` action,
if it exists, it will run that action after loading the new context.
