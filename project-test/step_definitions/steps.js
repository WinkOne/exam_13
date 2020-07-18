const { I } = inject();

Given('я залогинен как пользователь:', table => {
	I.amOnPage('/login');

	const tableData = table.parse().rawData;

	tableData.forEach(row => {
		I.fillField(row[0], row[1]);
	});

	I.click("#login");
});
When('я нахожусь на главной странице', () => {
	I.amOnPage('/');
});
When('я нажму на кнопку menu', () => {
	I.click('menu');
});
When('я нахожусь на странице Add recipe', () => {
	I.amOnPage('/addRecipe');
});
When('я нажму на кнопку {string}', (btnName) => {
	I.click(btnName);
});

When('я заполняю поля формы добавления:', table => {
	const tableData = table.parse().rawData;

	tableData.forEach(row => {
		I.fillField(row[0], row[1]);
	});
});
Then('я попадаю на главную страницу', () => {
	I.amOnPage('/');
});
