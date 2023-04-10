В данном проекте продемонстрирована работа с фреймворком express и базой данных MongoDB,
также настроены husky, lint-stage, prettier, gitignore, eslint, alias, .vscode, .editorconfigб tsconfig,
а также работа с env переменными

<!-- "lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint --fix",
    "*.{js,jsx,ts,tsx,json,html,md,yml}": "prettier --write"
}, -->

Важно!
Для корректной работы prettier необходимо явно указать в вашем редакторе,
что необходимо использовать конфиг, находящийся в корне проекта.

Инструкция для vscode:

1. Создаём папку .vscode
2. Внутри неё создаём файл settings.json
3. В файле пишем следующий код:

{
"prettier.configPath": ".prettierrc"
}
