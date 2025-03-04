/**
 * TypeScript 装饰器的执行顺序如下：
实例成员装饰器：属性装饰器、方法参数装饰器、方法装饰器
静态成员装饰器：静态属性装饰器、静态方法参数装饰器、静态方法装饰器
参数装饰器：从左到右执行
方法装饰器：从下到上执行
类装饰器：从下到上执行
 * 
 */
@Desc
class Person {
  constructor(@ParamDecorator public name: string) {}

  @Func
  printName() {
    console.log('我是: ' + this.name)
  }

  private _age: number = 0;

  @AccessorDecorator
  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  @StaticMethodDecorator
  static createPerson(name: string): Person {
    return new Person(name);
  }

  @StaticPropDecorator
  static defaultName: string = "默认名称";
}

function Desc(target: any) {
  // console.log(target)
  // console.log(target.name)
  target.prototype.getName = function() {
    return this.name;
  }
}

function Func(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
  console.log('target 上的 getName:', target.getName)  // 这里应该能看到 getName
  console.log('完整的 target:', Object.getOwnPropertyNames(target))  // 这里应该包含 getName
  // 延迟执行检查
  setTimeout(() => {
    console.log('延迟后 target 上的 getName:', target.getName)
    console.log('延迟后完整的 target:', Object.getOwnPropertyNames(target))
  }, 0)
  console.log(propertyKey)
  console.log(descriptor)
}

// 属性装饰器
function PropDecorator(target: any, propertyKey: string) {
  console.log('属性装饰器执行:', propertyKey);
  // 属性装饰器用于观察、修改或替换类的属性定义
}

// 参数装饰器
function ParamDecorator(target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) {
  console.log('参数装饰器执行:', propertyKey, '参数索引:', parameterIndex);
  // 参数装饰器用于观察方法的参数
}

// 访问器装饰器
function AccessorDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('访问器装饰器执行:', propertyKey);
  // 访问器装饰器用于观察、修改或替换访问器的定义
}

// 静态方法装饰器
function StaticMethodDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('静态方法装饰器执行:', propertyKey);
  // 静态方法装饰器用于观察、修改或替换静态方法的定义
}

// 静态属性装饰器
function StaticPropDecorator(target: any, propertyKey: string) {
  console.log('静态属性装饰器执行:', propertyKey);
  // 静态属性装饰器用于观察、修改或替换静态属性的定义
}

const person = new Person('张三')
// @ts-ignore
console.log(person.getName())

person.printName()

