# COMMAND-ASSISTANT [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/gzdl-strive/command-assistant/blob/main/LICENSE)

English | [中文](README-CN.md)

Command retrieval website COMMAND-ASSISTANT

This Website is bulit using `Vite` + `React` + `TypeScript`, with a simple and beautiful user interface.

## Introduce
- *my target*:
  - Build a command assistant project that includes reviewing notes and asking questions (talking to AI)
- *cause*:
  - Typing code in daily life is always easy to forget and memorize some commands and knowledge points
  - Asking questions is mainly about creating a quick Q&A Page without encountering various query materials

## Features
- Build through Vite(no bundle) + React
- Using TypeScript to Ensure Type Safety
- Clear configuration, specification, and encapsulation of universal Hooks

## Specification
- tsx
  - Import Resource Order Specification
    1. Priority of third-party resources over local resources
    2. Components > Configuration (Data) > CSS Files
  - Import Resource Path Specification
    - xxx/index.tsx => xxx
- css
  - Attribute specification
    1. Priority of layout attributes (affecting box layout, position, etc.)
    2. padding > margin
    3. ...

## Author
* gzdl-strive

## LICENSE
[MIT](https://github.com/gzdl-strive/command-assistant/blob/main/LICENSE)

Copyright (c) 2023-present gzdl-strive