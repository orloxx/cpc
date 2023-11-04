     ██████╗██████╗  ██████╗
    ██╔════╝██╔══██╗██╔════╝
    ██║     ██████╔╝██║
    ██║     ██╔═══╝ ██║
    ╚██████╗██║     ╚██████╗
     ╚═════╝╚═╝      ╚═════╝ v1.0.2

A program that suggest scripts depending on the context.

    npm install -g @orloxx/cpc

## Usage

### Run

It looks for scripts in the current directory and suggests them to later run
them. It accepts a `command` to directly run it without suggestions. It also
accepts `arguments` to pass to the script.

```bash
$ cpc run [-s] [<script>] [-- <arguments>]
```

- `-s`, `--silent` (optional) - Will not print any hint from CPC.
- `<script>` (optional) - If you already know the script you want to run, you
  can directly pass it. It will run silently by default.
- `<arguments>` (optional) - Everything after `--` will be passed to the
  `<script>`.

#### Where does it take it the scripts from?

- From any global configuration in usage – see [Load](#load)
- From the `.cpcrc` file in the current directory – see [Configure](#configure)
- From the `package.json` file in the current directory

### Load

It loads a set of scripts to be used globally, no matter in which directory
they're executed

```bash
$ cpc load [<filepath>]
```

- `<filepath>` (optional) - The path to the script file. If not provided, it
  will look for a `.cpcrc` file in the current directory. It supports different
  file formats:
  - `.cpcrc` - JSON format
  - `.cpcrc.json`
  - `.cpcrc.js` - JavaScript format

:warning: If you load a script file with the same `name` property, scripts will
be overwritten.

## Configure

There's a sample `.cpcrc` file in the root directory of the project:

```json
{
  "name": "cpc-sample",
  "description": "Sample configuration file for cpc",
  "scripts": {
    "hello": "echo \"Hello world!\"",
    "list-home": {
      "path": "~/",
      "command": "ls -la",
      "description": "List home directory contents"
    }
  }
}
```

You can try running `cpc run` and you'll get a list of suggestions with 2
options: `hello` and `list-home`.

`list-home` is a script that runs `ls -la` in the home directory defined by
`path`. It also includes a description.
