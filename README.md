# Testing auto list

Разработать клент-серверное решение с использованием typescript и node.js для хранения и управления базой данных автомобилей различных брендов.

Решение должно состоять из двух приложений: серверного и клиентского. В приложениях должны быть использованы следующие технологии:

Серверное приложение:

1. Node.JS

2. TypeScript

3. Express или любой express-совместимый web-сервер

4. REST API

5. Методы, которые позволяют добавлять автомобили, удалять, изменять существующие и получать список по брендам с сортировкой (классический CRUD). Опубликовать эти методы в REST API

6. Аутентификация пользователя при подключении к отдельному методу REST API с помощью логина, пароля

7. Авторизация пользователя при подключении по REST API с помощью Authorization: Bearer HTTP заголовка

8. БД MongoDB для персистентного хранения информации об автомобилях. В качестве сервера MongoDB выбрать любой на своё усмотрение, можно публичный MongoDB Atlas

9. Написать несколько юниттестов с использованием jest или mocha для проверки функционала CRUD из п.5, желательно не задействуя REST API. Уровень покрытия выбрать самостоятельно.

Клиентское приложение:

1. Node.JS

2. TypeScript

3. Интерпретатор командной строки. В параметрах обязательно должны быть логин, пароль, действие и аргументы этого дейтсвия в любом формате.

4. При запуске из командной строки с параметрами нужно выполнять подключение к Серверу и выполнять REST API операции.

5. Данные, полученные от Сервера выводить в консоль.

Примерная структура "Автомобиль":

- Бренд

- Название

- Год производства

- Цена

- любые дополнительные поля, которые нужны для решения задачи
