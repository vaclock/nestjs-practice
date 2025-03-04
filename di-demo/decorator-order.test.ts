class TestClass {
  @ClassProp
  prop: string = "test";

  @Method
  @Method2
  method(@Param1 param1: string, @Param2 param2: number) {
    return param1 + param2;
  }

  @StaticProp
  static staticProp: string = "static";

  @StaticMethod
  static staticMethod() {
    return "static method";
  }
}
// ClassDec2 -> ClassDec1 -> 

@ClassDec1
@ClassDec2
class TestClass2 extends TestClass {}

// 装饰器定义
function ClassProp(target: any, propertyKey: string) {
  console.log(`实例属性装饰器: ${propertyKey}`);
}

function Method(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`实例方法装饰器1: ${propertyKey}`);
}

function Method2(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`实例方法装饰器2: ${propertyKey}`);
}

function Param1(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`方法参数装饰器1: ${String(propertyKey)}, 索引: ${parameterIndex}`);
}

function Param2(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`方法参数装饰器2: ${String(propertyKey)}, 索引: ${parameterIndex}`);
}

function StaticProp(target: any, propertyKey: string) {
  console.log(`6. 静态属性装饰器: ${propertyKey}`);
}

function StaticMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`7. 静态方法装饰器: ${propertyKey}`);
}

function ClassDec1(constructor: Function) {
  console.log("8. 类装饰器1");
}

function ClassDec2(constructor: Function) {
  console.log("9. 类装饰器2");
}

// 创建实例触发装饰器执行
new TestClass2(); 


// 方法参数装饰器1: method, 索引: 0
// 方法参数装饰器2: method, 索引: 1
// 实例方法装饰器2: method
// 实例方法装饰器1: method
// 实例属性装饰器: prop
// 静态属性装饰器: staticProp
// 静态方法装饰器: staticMethod
// 类装饰器2
// 类装饰器1