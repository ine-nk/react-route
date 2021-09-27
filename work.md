**react-router-dom нужен для перемещения между страницами приложения без перезагрузки страницы**

**_то есть для создания SPA_**

    Установка react-router-dom
    Создание Navbar
    Switch и его особенности
    Route
    Параметры и свойства у Route
    Опциональные параметры
    Query параметры
    Переадресация (редирект)
    History. Программная навигация
    Хуки react-router-dom
    Вложеные пути
    Рефакторинг

> npx create-react-app react-router

> установка библиотеки  
> `npm i react-router-dom`

> autoimport - расширение vscode для автоматического импорта и изменения путей для модулей

## подключение роутинга

# `ReactDOM.render( <React.StrictMode> <BrowserRouter> <App /> </BrowserRouter> </React.StrictMode>, document.getElementById('root'), )`

? что есть путь : '/', '/posts', или / из posts ???

и почему вылетает ошибка при записи в App

<div>
      <Navbar />
      <h1>App</h1>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/login' component={Login} />
      <Route path='/posts' component={Posts} />
      <Route path='/' component={Home} />
    </div>

! необходимо упорядычивать маршруты от конкретных к более общим

## исправление перезагрузки страницы

> Link

`import { Link } from 'react-router-dom'`

**заменяем ссылку <a></a> на <Link> </Link>**
`<li><a href="/">Home</a></li>`
`<li><Link to="/">Home</Link></li>`
**в этом случае перезагрузки страницы не происходит и просто меняется отображаемое содержимое**

> Компонент _Link_ является _оберткой которая добавляет дополнительный обработчик событий к тегу <a>_

> Компонент router является оберткой для отображаемых элементов

и он добавляет дополнительные свойства для элемента

- History (отвечает за то что происходит с нашей страницей: переходы вперед назад, на новую страницу, перенаправление пользователя)
- location - жанные которыепередает нам приложение, и указвыет по какому пути мы находимся в данный момент
- match : совпадения - параметр `isExact:true` т.е. совпадение,  
  если мы это делаем через атрибут `component={Posts}`

## передача параметров на страницу

передаче параметров (Dashboard) в компонент как переменную без дополнительных параметров:
`<Route path="/dashboard" component={Dashboard} />`

чтобы можно передавать параметы надо воспользоваться другим атрибутом: `render` в которую передаем стрелочную функцию
`<Route path="/dashboard" render={() => <h1>Dashboard</h1>} />`

предача параметров:
<Route path="/dashboard" render={() => <Dashboard isAdmin={false} />} />
но в этом случае пропадают history, location, match

`<Route path="/dashboard" render={(props) => <Dashboard isAdmin={false} {...props} />} />`
в этом случае мы на входе стрел.функции получаем параметры `props` и потом через спрэд оператор передаем их в dashboard
или можно передавать дополнительные условия отображения
`<Route path="/dashboard" render={(props) => { return false && <Dashboard isAdmin={false} {...props} />`

## параметры путей

находятся в свойствах const match которые можно вытащить через match.params.

> postId = match.params.postId

## Опциональные параметры

изменить отображение posts и postsList
и объежинить их
`path="/posts/:postId?"`

<Route
path="/posts"
render={(props) => <Post posts={posts} {...props} />}
/>
<Route
path="/posts"
render={(props) => <PostsList posts={posts} {...props} />}
/>

<Route
path="/posts/:postId?/:display?"
render={(props) => <Posts {...props} />}
/>

`path="/posts/:postId?/:display?"` - display - это второй опциональный параметр

доступ к нему через `const display = match.params.display`

## Query параметры

это параметры которые в строке запроса стоят после вопроситльного знака

`?sortBy=newest&count=1` и эта строка запроса будет видется в
RouterProvider > location > search

чтобы распарсить строку поиска нужен пакет query-string и для преобразования их в адресные объекты

> npm i query-string

и так как параметр search находится в location - то надо деструктуризировать в Posts еще и location
отображение `const search = query.parse(location.search)`


## пагинаци

через query параметры
устанавливаем lodash
строка запроса: `http://localhost:3000/posts?count=1`

`const cropPosts = search.count ? _(posts).slice(0).take(search.count).value() : posts`
где `search.count=1` 

таким образом в бэкэнд можно передать запрашиваемое количество чего-либо, на фронэнде так можно передать имя пользователя на другую страницу

## редирект

когда идет запрос на несуществующую странцицу по маршрутизатор долже перевести на страницу  404
через `Redirect`

случай1: когда перенаправление на страницу 404
в App^
`<Route path="/404" component={NotFound} />`
`<Redirect to="/404" />`
создать компонетнт со страницей 404

случай2:
когда надо делать перенаправление со старых страниц на новые
была страница /admin  и ее надо закинуть на /dashboard
`<Redirect from="/admin" to="/dashboard" />`

## History

в свойствах history есть  методы push и  replace
> push перенаправляет пользователя на другую страницу без ее перезагрузки

> replace  заменяет перенаправленную страницу и обратного переключения не будет
т.е. в объекте history  не добавляется новое событие а заменяется текущая страница

