## Il2cppHook

### frida-based libil2cpp.so runtime parsing script

[![npm license](https://img.shields.io/npm/l/il2cpp-hooker.svg)](https://www.npmjs.com/package/il2cpp-hooker)
![Build Status](https://github.com/axhlzy/Il2CppHookScripts/actions/workflows/Auto-build.yml/badge.svg)
[![Open in Dev Containers](https://img.shields.io/static/v1?label=Dev%20Containers&message=Open&color=blue&logo=visualstudiocode)](https://vscode.dev/redirect?url=vscode://ms-vscode-remote.remote-containers/cloneInVolume?url=https://github.com/axhlzy/Il2CppHookScripts)
[![npm version](https://img.shields.io/npm/v/il2cpp-hooker.svg)](https://www.npmjs.com/package/il2cpp-hooker)
[![npm downloads](https://img.shields.io/npm/dm/il2cpp-hooker.svg)](https://www.npmjs.com/package/il2cpp-hooker)

#### Features 

- Parse Unity's method `m` / class `c` / field `f` / instance `lfs`
- parse runtime method argument `b`
- (Batch) Hook `B/BF` for commonly used functions, modify function return value `setFunctionXXX`
- More convenient to find function `findMethods` and call function `callFunction`
- Object hierarchy `PrintHierarchy` / type hierarchy `showTypeParent`
- Disassemble `showAsm` with frida and method information
- Commonly used Hook package `HookOnPointerClick/HookSetActive/B_Button...`
- Parse mount script `showComponents alias s` `HookOnPointerClick/PrintHierarchyWithComponents` is also introduced <--- testing
- JNI RegisterNatives Hook (impl in JNIHelper, default off [not stable]), using JNIHelper.cacheRegisterNativeItem to get info
- Using QBDI to simulate the execution of the function, using t(methoinfo) or traceFunction(mPtr) to enable replacement hook
- :confused: :confused: :confused:

-------

#### Install
```sh
$ npm install il2cpp-hooker -g
```

then you can use like this :point_down:

1. frida attch current app
```sh
$ fat

```
2. frida spawn app of ${PackageName}
```sh
$ fat ${PackageName}
```

3. Command line options
```sh
$ fat -h

        _ _  ______                        _                 _
        | | |(_____ \                      | |               | |
        | | |  ____) )____ ____  ____ _____| |__   ___   ___ | |  _ _____  ____
        | | | / ____// ___)  _ \|  _ (_____)  _ \ / _ \ / _ \| |_/ ) ___ |/ ___)
        | | || (____( (___| |_| | |_| |    | | | | |_| | |_| |  _ (| ____| |
        |_|_|\______)____)  __/|  __/     |_| |_|\___/ \___/|_| \_)_____)_|
                        |_|   |_|


Usage: fat [options] <package-name?>

Options:
  -h, --help                  Print usage information.
  -r, --runtime [engine]      Specify the JS engine (qjs, v8). Default: v8
  -t, --timeout [ms]          Specify the time in milliseconds before calling the function.
  -f, --functions [name]      Specify the functions to call on startup. example: -f getApkInfo();
  -l, --log [path]            Specify the path to save the log.
  -c, --vscode                Open project with vscode.
  -v, --version               Print version information.

Report bugs to:
   axhlzy <axhlzy@live.cn> (https://github.com/axhlzy/Il2CppHookScripts/)

```

-------

[<img src="https://github.com/codespaces/badge.svg" title="Open in Github Codespace">](https://codespaces.new/axhlzy/Il2CppHookScripts)

#### Compile
```sh
$ git clone https://github.com/axhlzy/Il2CppHookScripts.git
$ cd Il2cppHook/

$ npm install

$ npm run build & npm run compress
OR
$ npm run watch

$ frida -U -f com.xxx.xxx -l ../_Ufunc.js
OR
$ frida -FU -l ../_Ufunc.js
```

-------

#### 👇 Here's a simpler way to use it (Recommended)
`frida --codeshare axhlzy/il2cpphookscripts  -U -f ${PackageName}`

> Requires Scientific Internet Access

-------

> [!NOTE]
> The npm package may not be updated in time, so you may consider using `fat -c` to open the project and use the `github action` [Artifacts](https://github.com/axhlzy/Il2CppHookScripts/actions) to replace _Ufunc.js file. :hushed:

-------

#### API

[More details](https://github.com/axhlzy/Il2CppHookScripts/wiki)

OR

open with vscode and search `globalthis.` to find more useage

-------

Support the author

<img src="https://github.com/axhlzy/Il2CppHookScripts/assets/20512058/a2221499-0a70-4caf-b05e-b01d85f3b2c4" width="500" height="600">
