---
title: Typescript学习笔记
date: '2023-1-2 19:16'
updated: '2023-1-2 19:16'
tags: TypeScript
categories: 笔记
cover: >-
  https://preview.cloud.189.cn/image/imageAction?param=423434834D90992C0144691D6ABB374F03017482934C774A63824CA2D6CE2190292F68CB89239300D590F39C40697FE8ABADEF4FF26F5F8C88C42B924D720926F22D287AB1570B1036DA879395135E1F4A1D06E378974A2D25171B9AE938BB8D237A1561FE48117285504D07EC050CE45091E4D6
abbrlink: 8b83
---

{% note success %}
笔记来自于尚硅谷课程
{% endnote %}
{% link https://www.bilibili.com/video/BV1Xy4y1v7S2/,尚硅谷TypeScript教程（李立超老师TS新课）,https://cdn.leonus.cn/img/atguigu.webp,TS本身并非什么高深的技术，凡是有JavaScript基础的同学都可以轻松掌握。 %}

## 第一章 快速入门

### 0、TypeScript 简介

1. TypeScript 是 JavaScript 的超集。
2. 它对 JS 进行了扩展，向 JS 中引入了类型的概念，并添加了许多新的特性。
3. TS 代码需要通过编译器编译为 JS，然后再交由 JS 解析器执行。
4. TS 完全兼容 JS，换言之，任何的 JS 代码都可以直接当成 JS 使用。
5. 相较于 JS 而言，TS 拥有了静态类型，更加严格的语法，更强大的功能；TS 可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；TS 代码可以编译为任意版本的 JS 代码，可有效解决不同 JS 运行环境的兼容问题；同样的功能，TS 的代码量要大于 JS，但由于 TS 的代码结构更加清晰，变量类型更加明确，在后期代码的维护中 TS 却远远胜于 JS。

### 1、TypeScript 开发环境搭建

1. 下载 Node.js
   - 64 位：[https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi](https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi)
   - 32 位：[https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi](https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi)
2. 安装 Node.js
3. 使用 npm 全局安装 typescript
   - 进入命令行
   - 输入：`npm i -g typescript`
4. 创建一个 ts 文件
5. 使用 tsc 对 ts 文件进行编译
   - 进入命令行
   - 进入 ts 文件所在目录
   - 执行命令：`tsc xxx.ts`

### 2、基本类型

#### 2.1、类型声明

- 类型声明是 TS 非常重要的一个特点，通过类型声明可以指定 TS 中变量（参数、形参）的类型。
- 指定类型后，当为变量赋值时，TS 编译器会自动检查值是否符合类型声明，符合则赋值，否则报错。
- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值
- 语法：

```typescript
  let 变量: 类型;
  let 变量: 类型 = 值;
  function fn(参数: 类型, 参数: 类型): 类型{
      ...
  }
```

#### 2.2、自动类型判断

- TS 拥有自动的类型判断机制
- 当对变量的声明和赋值是同时进行的，TS 编译器会自动判断变量的类型
- 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

#### 2.3、类型：

| 类型    | 例子              | 描述                            |
| ------- | ----------------- | ------------------------------- |
| number  | 1, -33, 2.5       | 任意数字                        |
| string  | 'hi', "hi", `hi`  | 任意字符串                      |
| boolean | true、false       | 布尔值 true 或 false            |
| 字面量  | 其本身            | 限制变量的值就是该字面量的值    |
| any     | \*                | 任意类型                        |
| unknown | \*                | 类型安全的 any                  |
| void    | 空值（undefined） | 没有值（或 undefined）          |
| never   | 没有值            | 不能是任何值                    |
| object  | {name:'孙悟空'}   | 任意的 JS 对象                  |
| array   | [1,2,3]           | 任意 JS 数组                    |
| tuple   | [4,5]             | 元素，TS 新增类型，固定长度数组 |
| enum    | enum{A, B}        | 枚举，TS 中新增类型             |

- number

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

- boolean

```typescript
let isDone: boolean = false;
```

- string

```typescript
let color: string = "blue";
color = "red";
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.
  I'll be ${age + 1} years old next month.`;
```

- 字面量
  也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

```typescript
let color: "red" | "blue" | "black";
let num: 1 | 2 | 3 | 4 | 5;
```

- any

```typescript
let d: any = 4;
d = "hello";
d = true;
```

- unknown

```typescript
let notSure: unknown = 4;
notSure = "hello";
```

- void

```typescript
let unusable: void = undefined;
```

- never

```typescript
function error(message: string): never {
  throw new Error(message);
}
```

- object（没啥用）

```typescript
let obj: object = {};
```

- array

```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

- tuple

```typescript
let x: [string, number];
x = ["hello", 10];
```

- enum

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
enum Color {
  Red = 1,
  Green,
  Blue,
}
let c: Color = Color.Green;
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c: Color = Color.Green;
```

- 类型断言
  有些情况下，变量的类型对于我们来说是很明确，但是 TS 编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型，断言有两种形式：
  - 第一种

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

- 第二种

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

### 3、编译选项

#### 3.1、自动编译文件

- 编译文件时，使用 -w 指令后，TS 编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。示例：`tsc xxx.ts -w`

#### 3.2、自动编译整个项目

- 如果直接使用 tsc 指令，则可以自动将当前项目下的所有 ts 文件编译为 js 文件。
- 但是能直接使用 tsc 命令的前提时，要先在项目根目录下创建一个 ts 的配置文件 tsconfig.json
- tsconfig.json 是一个 JSON 文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译

##### 3.2.1、配置选择

- **include**
  定义希望被编译文件所在的目录，默认值：`["\*\*/\*"]`
  **示例：**

```json
"include":["src/**/*", "tests/**/*"]
```

上述示例中，所有 src 目录和 tests 目录下的文件都会被编译

- **exclude**
  定义需要排除在外的目录，默认值：`["node_modules", "bower_components", "jspm_packages"]`
  **示例：**

```json
"exclude": ["./src/hello/**/*"]
```

上述示例中，src 下 hello 目录下的文件都不会被编译

- **extends**
  定义被继承的配置文件
  **示例：**

```json
"extends": "./configs/base"
```

上述示例中，当前配置文件中会自动包含 config 目录下 base.json 中的所有配置信息

- **files**
  指定被编译文件的列表，只有需要编译的文件少时才会用到
  **示例：**

```json
"files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "tsc.ts"
  ]
```

列表中的文件都会被 TS 编译器所编译

- **compilerOptions**
  编译选项是配置文件中非常重要也比较复杂的配置选项，在 compilerOptions 中包含多个子选项，用来完成对编译的配置。
  **项目选项：**
  - target
    设置 ts 代码编译的目标版本可选值：`ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext`
    示例：

```json
"compilerOptions": {
    "target": "ES6"
}
```

如上设置，我们所编写的 ts 代码将会被编译为 ES6 版本的 js 代码

- lib
  指定代码运行时所包含的库（宿主环境），可选值：`ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ...`
  示例：

```json
  "compilerOptions": {
      "target": "ES6",
      "lib": ["ES6", "DOM"],
      "outDir": "dist",
      "outFile": "dist/aa.js"
  }
```

- module
  设置编译后代码使用的模块化系统，可选值：`CommonJS、UMD、AMD、System、ES2020、ESNext、None`
  示例：

```typescript
  "compilerOptions": {
      "module": "CommonJS"
  }
```

- outDir
  编译后文件的所在目录。默认情况下，编译后的 js 文件会和 ts 文件位于相同的目录，设置 outDir 后可以改变编译后文件的位置
  示例：

```json
  "compilerOptions": {
      "outDir": "dist"
  }
```

设置后编译后的 js 文件将会生成到 dist 目录

- outFile
  将所有的文件编译为一个 js 文件，默认会将所有的编写在全局作用域中的代码合并为一个 js 文件，如果 module 制定了 None、System 或 AMD 则会将模块一起合并到文件之中。
  示例：

```json
  "compilerOptions": {
      "outFile": "dist/app.js"
  }
```

- rootDir
  指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过 rootDir 可以手动指定根目录
  示例：

```json
  "compilerOptions": {
      "rootDir": "./src"
  }
```

- allowJs
  是否对 js 文件编译
- checkJs
  是否对 js 文件进行检查
  示例：

```json
  "compilerOptions": {
      "allowJs": true,
      "checkJs": true
  }
```

- removeComments
  是否删除注释，默认值：false
- noEmit
  不对代码进行编译，默认值：false
- sourceMap
  是否生成 sourceMap，默认值：false
- **严格检查**
  - strict
    启用所有的严格检查，默认值为 true，设置后相当于开启了所有的严格检查
  - alwaysStrict
    总是以严格模式对代码进行编译
  - noImplicitAny
    禁止隐式的 any 类型
  - noImplicitThis
    禁止类型不明确的 this
  - strictBindCallApply
    严格检查 bind、call 和 apply 的参数列表
  - strictFunctionTypes
    严格检查函数的类型
  - strictNullChecks
    严格的空值检查
  - strictPropertyInitialization
    严格检查属性是否初始化
- **额外检查**
  - noFallthroughCasesInSwitch
    检查 switch 语句包含正确的 break
  - noImplicitReturns
    检查函数没有隐式的返回值
  - noUnusedLocals
    检查未使用的局部变量
  - noUnusedParameters
    检查未使用的参数
- **高级**
  - allowUnreachableCode
    检查不可达代码
    可选值： - true，忽略不可达代码 - false，不可达代码将引起错误
  - noEmitOnError
    有错误的情况下不进行编译，默认值：false

### 4、webpack

通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS 同样也可以结合构建工具一起使用，下边以 webpack 为例介绍一下如何结合构建工具使用 TS。
步骤：

1. 初始化项目
   进入项目根目录，执行命令 `npm init -y`。
   主要作用：创建 package.json 文件
2. 下载构建工具
   `npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin`
   - 共安装了 7 个包 - webpack
     构建工具 webpack - webpack-cli
     webpack 的命令行工具 - webpack-dev-server
     webpack 的开发服务器 - typescript
     ts 编译器 - ts-loader
     ts 加载器，用于在 webpack 中编译 ts 文件 - html-webpack-plugin
     webpack 中 html 插件，用来自动创建 html 文件 - clean-webpack-plugin
     webpack 中的清除插件，每次构建都会先清除目录
3. 根目录下创建 webpack 的配置文件 webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  optimization: {
    minimize: false, // 关闭代码压缩，可选
  },
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    environment: {
      arrowFunction: false, // 关闭webpack的箭头函数，可选
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "TS测试",
    }),
  ],
};
```

4. 根目录下创建 tsconfig.json，配置可以根据自己需要

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES2015",
    "strict": true
  }
}
```

5. 修改 package.json 添加如下配置

```json
  {
    ...略...
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "build": "webpack",
      "start": "webpack serve --open chrome.exe"
    },
    ...略...
  }
```

6. 在 src 下创建 ts 文件，并在并命令行执行`npm run build`对代码进行编译，或者执行`npm start`来启动开发服务器

### 5、Babel

经过一系列的配置，使得 TS 和 webpack 已经结合到了一起，除了 webpack，开发中还经常需要结合 babel 来对代码进行转换以使其可以兼容到更多的浏览器，在上述步骤的基础上，通过以下步骤再将 babel 引入到项目中。

1. 安装依赖包：
   `npm i -D @babel/core @babel/preset-env babel-loader core-js`
   - 共安装了 4 个包，分别是： - @babel/core
     babel 的核心工具 - @babel/preset-env
     babel 的预定义环境 - [@babel-loader ](/babel-loader)
     babel 在 webpack 中的加载器 - core-js
     core-js 用来使老版本的浏览器支持新版 ES 语法
2. 修改 webpack.config.js 配置文件

```javascript
  ...略...
  module: {
      rules: [
          {
              test: /\.ts$/,
              use: [
                  {
                      loader: "babel-loader",
                      options:{
                          presets: [
                              [
                                  "@babel/preset-env",
                                  {
                                      "targets":{
                                          "chrome": "58",
                                          "ie": "11"
                                      },
                                      "corejs":"3",
                                      "useBuiltIns": "usage"
                                  }
                              ]
                          ]
                      }
                  },
                  {
                      loader: "ts-loader",
                  }
              ],
              exclude: /node_modules/
          }
      ]
  }
  ...略...
```

如此一来，使用 ts 编译后的文件将会再次被 babel 处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的 targets 中指定要兼容的浏览器版本。

## 第二章：面向对象

面向对象是程序中一个非常重要的思想，它被很多同学理解成了一个比较难，比较深奥的问题，其实不然。面向对象很简单，简而言之就是程序之中所有的操作都需要通过对象来完成。
举例来说：

- 操作浏览器要使用 window 对象
- 操作网页要使用 document 对象
- 操作控制台要使用 console 对象
  一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。
  在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。

### 1、类（class）

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，举例来说：可以通过 Person 类来创建人的对象，通过 Dog 类创建狗的对象，通过 Car 类来创建汽车的对象，不同的类可以用来创建不同的对象。

- 定义类：

```typescript
  class 类名 {
  	属性名: 类型;
  	constructor(参数: 类型){
  		this.属性名 = 参数;
  	}
  	方法名(){
  		....
  	}
  }
```

- 示例：

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    console.log(`大家好，我是${this.name}`);
  }
}
```

- 使用类：

```typescript
const p = new Person("孙悟空", 18);
p.sayHello();
```

### 2、面向对象的特点

#### 2.1、封装

- 对象实质上就是属性和方法的容器，它的主要作用就是存储属性和方法，这就是所谓的封装
- 默认情况下，对象的属性是可以任意的修改的，为了确保数据的安全性，在 TS 中可以对属性的权限进行设置
- 只读属性（readonly）：
  - 如果在声明属性时添加一个 readonly，则属性便成了只读属性无法修改
- TS 中属性具有三种修饰符：
  - public（默认值），可以在类、子类和对象中修改
  - protected ，可以在类、子类中修改
  - private ，可以在类中修改
- 示例：
  - public

```typescript
class Person {
  public name: string; // 写或什么都不写都是public
  public age: number;
  constructor(name: string, age: number) {
    this.name = name; // 可以在类中修改
    this.age = age;
  }
  sayHello() {
    console.log(`大家好，我是${this.name}`);
  }
}
class Employee extends Person {
  constructor(name: string, age: number) {
    super(name, age);
    this.name = name; //子类中可以修改
  }
}
const p = new Person("孙悟空", 18);
p.name = "猪八戒"; // 可以通过对象修改
```

- protected

```typescript
class Person {
  protected name: string;
  protected age: number;
  constructor(name: string, age: number) {
    this.name = name; // 可以修改
    this.age = age;
  }
  sayHello() {
    console.log(`大家好，我是${this.name}`);
  }
}
class Employee extends Person {
  constructor(name: string, age: number) {
    super(name, age);
    this.name = name; //子类中可以修改
  }
}
const p = new Person("孙悟空", 18);
p.name = "猪八戒"; // 不能修改
```

- private

```typescript
class Person {
  private name: string;
  private age: number;
  constructor(name: string, age: number) {
    this.name = name; // 可以修改
    this.age = age;
  }
  sayHello() {
    console.log(`大家好，我是${this.name}`);
  }
}
class Employee extends Person {
  constructor(name: string, age: number) {
    super(name, age);
    this.name = name; //子类中不能修改
  }
}
const p = new Person("孙悟空", 18);
p.name = "猪八戒"; // 不能修改
```

- 属性存取器
  - 对于一些不希望被任意修改的属性，可以将其设置为 private
  - 直接将其设置为 private 将导致无法再通过对象修改其中的属性
  - 我们可以在类中定义一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器
  - 读取属性的方法叫做 setter 方法，设置属性的方法叫做 getter 方法
  - 示例：

```typescript
class Person {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}
const p1 = new Person("孙悟空");
console.log(p1.name); // 通过getter读取name属性
p1.name = "猪八戒"; // 通过setter修改name属性
```

- 静态属性
  - 静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用
  - 静态属性（方法）使用 static 开头
  - 示例：

```typescript
class Tools {
  static PI = 3.1415926;
  static sum(num1: number, num2: number) {
    return num1 + num2;
  }
}
console.log(Tools.PI);
console.log(Tools.sum(123, 456));
```

- this
  - 在类中，使用 this 表示当前对象

#### 2.2、继承

- 继承时面向对象中的又一个特性
- 通过继承可以将其他类中的属性和方法引入到当前类中
  - 示例：

```typescript
class Animal {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Dog extends Animal {
  bark() {
    console.log(`${this.name}在汪汪叫！`);
  }
}
const dog = new Dog("旺财", 4);
dog.bark();
```

- 通过继承可以在不修改类的情况下完成对类的扩展
- 重写
  - 发生继承时，如果子类中的方法会替换掉父类中的同名方法，这就称为方法的重写
  - 示例：

```typescript
class Animal {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  run() {
    console.log(`父类中的run方法！`);
  }
}
class Dog extends Animal {
  bark() {
    console.log(`${this.name}在汪汪叫！`);
  }
  run() {
    console.log(`子类中的run方法，会重写父类中的run方法！`);
  }
}
const dog = new Dog("旺财", 4);
dog.bark();
```

      - 在子类中可以使用super来完成对父类的引用

- 抽象类（abstract class）
  - 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例

```typescript
abstract class Animal {
  abstract run(): void;
  bark() {
    console.log("动物在叫~");
  }
}
class Dog extends Animals {
  run() {
    console.log("狗在跑~");
  }
}
```

- 使用 abstract 开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现

### 3、接口（Interface）

接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法。接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。

- 示例（检查对象类型）：

```typescript
interface Person {
  name: string;
  sayHello(): void;
}
function fn(per: Person) {
  per.sayHello();
}
fn({
  name: "孙悟空",
  sayHello() {
    console.log(`Hello, 我是 ${this.name}`);
  },
});
```

- 示例（实现）

```typescript
interface Person {
  name: string;
  sayHello(): void;
}
class Student implements Person {
  constructor(public name: string) {}
  sayHello() {
    console.log("大家好，我是" + this.name);
  }
}
```

### 4、泛型（Generic）

定义一个函数或类时，有些情况下无法确定其中要使用的具体类型（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。
举个例子：

```typescript
function test(arg: any): any {
  return arg;
}
```

上例中，test 函数有一个参数类型不确定，但是能确定的时其返回值的类型和参数的类型是相同的，由于类型不确定所以参数和返回值均使用了 any，但是很明显这样做是不合适的，首先使用 any 会关闭 TS 的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型

- 使用泛型：

  ````typescript
    function test<T>(arg: T): T{
    	return arg;
    }
    ```
  - 这里的`<T>`就是泛型，T是我们给这个类型起的名字（不一定非叫T），设置泛型后即可在函数中使用T来表示该类型。所以泛型其实很好理解，就表示某个类型。
  - 那么如何使用上边的函数呢？
    - 方式一（直接使用）：
      ```typescript
        test(10)
        ```
      - 使用时可以直接传递参数使用，类型会由TS自动推断出来，但有时编译器无法自动推断时还需要使用下面的方式
    - 方式二（指定类型）：
      ```typescript
        test<number>(10)
        ```
      - 也可以在函数后手动指定泛型
  - 可以同时指定多个泛型，泛型间使用逗号隔开：
    ```typescript
      function test<T, K>(a: T, b: K): K{
          return b;
      }
      test<number, string>(10, "hello");
      ```
    - 使用泛型时，完全可以将泛型当成是一个普通的类去使用
  - 类中同样可以使用泛型：
    ```typescript
      class MyClass<T>{
          prop: T;
          constructor(prop: T){
              this.prop = prop;
          }
      }
      ```
  - 除此之外，也可以对泛型的范围进行约束
    ```typescript
      interface MyInter{
          length: number;
      }
      function test<T extends MyInter>(arg: T): number{
          return arg.length;
      }
      ```
    - 使用T extends MyInter表示泛型T必须是MyInter的子类，不一定非要使用接口类和抽象类同样适用。
  本文转载于： [https://blog.leonus.cn/2022/typescript.html](https://blog.leonus.cn/2022/typescript.html)
  ````
