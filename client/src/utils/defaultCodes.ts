export const codeForC = `#include <stdio.h>

int main() {
  printf("Hello world!!");
}
`;

export const codeForCpp = `#include <iostream>
using namespace std;

int main() {
  cout<<"Hello world!!";
}
`;

export const codeForJava = `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello world!!");
  }
}
`;

export const codeForPython = `print("Hello world!!")`;

export const codeForJavascript = `console.log('Hello world!!');`;

export const codeForPHP = `echo "Hello world!!";`;

export const codeForCSharp = `using System;
namespace HelloWorld
{
  class Hello
  {
    static void Main()
    {
      Console.WriteLine("Hello world!!");
    }
  }
}
`;

export const codeForKotlin = `fun main(args: Array<String>) {
  println("Hello world!!")
}
`;

export const codeForGoLang = `package main
import "fmt"
func main() {
  fmt.Println("Hello world!!")
}
`;

export const codeForRust = `fn main() {
  println!("Hello world!!");
}
`;

export const codeForRuby = `puts "Hello World!";`;

export const codeForScala = `object HelloWorld {
  def main(args: Array[String]) {
    println("Hello world!!")
  }
}
`;

export const codeForDart = `void main() {
  print("Hello world!!");
}
`;

const map1 = new Map();

map1.set("cpp17", codeForCpp);
map1.set("java", codeForJava);
map1.set("python3", codeForPython);
map1.set("nodejs", codeForJavascript);
map1.set("php", codeForPHP);
map1.set("c", codeForC);
map1.set("csharp", codeForCSharp);
map1.set("kotlin", codeForKotlin);
map1.set("go", codeForGoLang);
map1.set("rust", codeForRust);
map1.set("ruby", codeForRuby);
map1.set("scala", codeForScala);
map1.set("dart", codeForDart);

const langs = [
  "cpp17",
  "java",
  "python3",
  "nodejs",
  "php",
  "c",
  "csharp",
  "kotlin",
  "go",
  "rust",
  "ruby",
  "scala",
  "dart",
];

export const getDefaultCode = (lang: string) => {
  if(!langs.includes(lang))
    return("");
  return map1.get(lang) + "\n\n";
};

