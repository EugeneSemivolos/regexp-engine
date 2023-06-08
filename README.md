

# RegExp Engine

---

### About project
This project is a simple implementation of regular expression search and replace.
To get acquainted with the project better Here is a link to the [design document](https://docs.google.com/document/d/1z1WRYgvSECrKQVMP-LZne41qnkWvn0mR6xrKzllQ24A/edit#heading=h.k57aj13un2t).

---

### Project members
This project will be realized by one member - [Yevhenii Semyvolos](https://github.com/EugeneSemivolos)(me)

The reviews were done by [Yaryna Bashchak](https://github.com/yaryna-bashchak) and [Maksym Chyrkov](https://github.com/chyrkovmaksym)

---

### Pull Requests

[here](https://github.com/EugeneSemivolos/regexp-engine/pulls)


## How to install and run the project

Project uses Node.js v18.13.0, but can be run on a  v16.x version

First of all, make sure you have [Node.js](https://nodejs.org/en/download) 16.x or higher version.

Then download this repository.

For everything to work correctly, download the dependencies
```
npm install
```

This project supports two functions: ***matching*** and ***replacing*** by regular expression.

## match by RegExp
In this project, you can match directly in the text. Also you can match by giving the path to it.

### The Text is entered manually
In this case, execute:
```
node ./index.js match [YOUR_REGEXP] [TEXT]
```
where  [YOUR_REGEXP] 	- 	regular expression to search by it
			 [TEXT] 					- 	text, where you want to find matches by reg-exp 
			 
Example: 
```
node ./index.js match /[bcd]are*/ "find bare or car or daree in this text"
```			
### The Text is in file
In this case, execute:
```
node ./index.js match [YOUR_REGEXP] [PATH]
```
where  [YOUR_REGEXP] 	- 	regular expression to search by it
			 [PATH] 					- 	path that leads to the file where the text is

Example: 
```
node ./index.js match /[bcd]are*/ "E:\myFolder\text.txt"
```	
## replace by RegExp
In this project, you can replace directly in the text. Also you can replace by giving the path to it.

### The Text is entered manually
In this case, execute:
```
node ./index.js match [YOUR_REGEXP] [STRING_TO_REPLACE] [TEXT]
```
where  [YOUR_REGEXP] 					- Regular expression to search by it
		     [STRING_TO_REPLACE] 	- String with which to replace all matches by regular expression
			 [TEXT] 									- Text, where you want to find matches by reg-exp 
			 
Example: 
```
node ./index.js replace /[bcd]are*/ "nothing" "find bare or car or daree in this text"
```	
### The Text is in file
In this case, execute:
```
node ./index.js match [YOUR_REGEXP] [STRING_TO_REPLACE] [PATH]
```
where  [YOUR_REGEXP] 					- Regular expression to search by it
		     [STRING_TO_REPLACE] 	- String with which to replace all matches by regular expression
			 [PATH] 									- Path that leads to the file where the text is
Example: 
```
node ./index.js replace /[bcd]are*/ "***" "E:\myFolder\text.txt"
```	

## Test project

This project uses ci/cd tests GitHub Actions. Everything is fully checked and tested. But if you want to test it yourself, type the following command:
```
npm test
```	

## Example of work
### match util
![image](https://github.com/EugeneSemivolos/regexp-engine/assets/66010982/6df1a613-d07d-4613-817e-671f43239c06)
![image](https://github.com/EugeneSemivolos/regexp-engine/assets/66010982/2082224e-1308-4717-aaaa-82ed6ee245cd)

### replace util
![image](https://github.com/EugeneSemivolos/regexp-engine/assets/66010982/62f5b078-cfcd-4585-8937-19bcfe64479e)

![image](https://github.com/EugeneSemivolos/regexp-engine/assets/66010982/2b387bb8-66f9-4321-84a0-2384cb18b44a)



