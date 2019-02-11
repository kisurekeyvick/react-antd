// namespace Kisure {
//     interface IPerson {
//         name: string;
//         age: number;
//         run: (name: string, age: number) => string;
//     }

//     export interface IMe extends IPerson {
//         sex: string;
//     }

//     export class Person implements IPerson {
//         name: string;
//         age: number;
//         sex: string;
        
//         constructor(name: string, age: number, sex: string) {
//             this.name = name;
//             this.age = age;
//             this.sex = sex;
//         }

//         run(name: string, age: number): string {
//             return `我是命名空间： ${this.age}岁的${this.name}正在殴打${age}岁的${name};`
//         }
//     }
// }