# COMMAND-ASSISTANT [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/gzdl-strive/command-assistant/blob/main/LICENSE)

[English](README.md) | 中文

命令检索网站 COMMAND-ASSISTANT

本网站使用`Vite` + `React` + `TypeScript`构建，用户界面简约美观。

## 介绍
- *我的目标*:
  - 构建一个包含查看笔记、询问问题(与AI对话)的命令助手项目.
- *原因*:
  - 日常敲代码，总是容易忘记、记混一些命令、知识点...
  - 询问问题，主要是想能够创建一个快速问答的也没，而不用遇到问题各种查询资料.

## 特色
- 通过Vite(no-bundle) + React构建
- 使用TypeScript来保证类型安全
- 配置、规范明确，通用Hooks的封装

## 规范
- tsx规范
  - 导入资源顺序规范
    1. 第三库资源优先于本地资源
    2. 组件 > 配置(数据) > css文件
  - 导入资源路径规范
    - xxx/index.tsx => xxx
- css规范
  - 属性规范
    1. 布局属性优先(影响盒子布局，位置等)
    2. padding > margin
    3. ...

## 作者
* gzdl-strive

## LICENSE
[MIT](https://github.com/gzdl-strive/command-assistant/blob/main/LICENSE)

Copyright (c) 2023-present gzdl-strive