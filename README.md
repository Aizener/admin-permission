### 介绍

> 这是一个用来练习Vue后台权限管理的简单模板，是我看了一个[B站视频](https://www.bilibili.com/video/BV15Q4y1K79c?t=5306)时，苦于没资料，于是自己花了点时间搭了一个，这里做来分享，分为两版：

* 基础模板：有基本操作，mock等功能了，没实现权限判定；
* 实现模板：基于基础模板做了权限的判定。

### 安装&运行

1. 克隆项目

   `git clone git@github.com:Aizener/admin-permission.git`

   这个直接把基础模板和实现的模板都克隆下来的，develop的是基础模板，master的实现模板。

2. 安装依赖：

   执行：`yarn`或者`yarn install`；

3. 基础模板：

   基础模板在`develop`分支，可以通过`git checkout develop`来切换；

4. 实现模板：

   基础模板在`master`分支， 可以通过`git checkout master`来切换；

5. 启动服务

   `yarn serve`

6. 效果图：

   <img src="https://cdn.jsdelivr.net/gh/aizener/my-imgs@master/permission-demo.png" width="1000px" />

### 基本实现

这里说一下这个Demo的实现，通过什么技术，用的哪些知识点完成开发。以及，关于对于权限管理的一些理解与实现，大体分为以下几类：

#### 视图

模板是通过[ElementUI](https://element.eleme.cn/)来搭建的，这个基于的UI组件库非常好用。

#### 数据Mock

数据是通过[mockjs](http://mockjs.com/)来实现的，但是因为这个库好像不能模仿响应状态码，不过用起来还是挺方便的。

#### 请求

请求数据的库，我使用的是[axios](http://www.axios-js.com/)这个库，这个库使用也非常的方便简单。

#### 数据保存

数据的保存通过Vuex和sesstionStorage来实现的。

### 权限判断

基本实现知识完成了一些基本的东西，权限判断的话，前端主要是分为一下四类：

#### 路由级别的判定

通过**beforeEach**全局守卫钩子，来进行token验证，是否能通过路由来登入其他页面；

#### 菜单级别的判定

通过后端返回的`json`菜单权限数据，进行动态渲染，这里通过`router.addRoutes`动态添加菜单，没有的就不会出现了；

#### 元素级别的判定

通过后端返回的`json`操作权限数据，绑定在`router`元信息上，再通过`this.$route.meta`在页面取出对应权限。再通过自定义指令的实现完成禁止、移除等。

#### 请求级别的判定

通过axios的拦截器，判定某个用户在某个页面的操作是否有权限，通过`router.currentRoute`获取元信息来判定。

### 补充（关于代码的一些东西）

用户有两个，一个是普通用户，一个是管理员

- 普通用户用户名就是：普通用户，密码是：normal；
- 管理员用户名就是：管理员，密码是：admin。

权限判定的指令使用：

`v-permission.disabled="condition"` 如果condition为true，则禁用当前绑定指令的标签；

`v-permission.remove="condition"` 如果condition为true，则移除当前绑定指令的标签。

结尾：大体就这些了，接口方面已经写好交互了。
