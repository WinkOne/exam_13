#language:ru

Функционал: Добавление заведения
  Как пользователь
  Я хочу иметь возможность добавлять заведения

  @add
  Сценарий:
    Допустим я залогинен как пользователь:
      | username | user |
      | password | 123  |
    То я нахожусь на главной странице
    И я нажму на кнопку '#menu'
    И я нахожусь на странице Add recipe
    И я заполняю поля формы добавления:
      | name       | qweqwe             |
      | description | asdqweasdqweasdqwdasdqwdasdqwdqwdqwdqwdqwdqwdqwdqwdqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq |
    И я нажму на кнопку "Я согласен"
    Если я нажму на кнопку "Add"
    То я попадаю на главную страницу
