# 图书馆管理系统

## 前端

## 后端

### 数据存储

`db`: 使用json文件存储数据, db模块提供动态的service注册

```js
@Module({
})
export class DbModule {
  static register(options: DbModuleOptions) {
    return {
      import: [],
      module: DbModule,
      providers: [
        {
          token: 'option',
          useValue: options
        }
      ],
      export: [DbService]
    }
  }
}
```

### 用户管理

1. 用户注册:
   1. register
2. 用户登录:
   1. login

### 图书管理

1. `list`:
2. `create`:
3. `update`:
4. `delete`:
