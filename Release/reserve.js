// Command line args: <month in number> <day of week in words> <day of month in number> <study room> <time slot1> <time slot2> <time slot3> <time slot4> <time slot5> <time slot6> <full date> <username> <password>
var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder().forBrowser('chrome').build();

var args = process.argv.slice(2);

// Navigate to UNC reserve room

driver.get('http://calendar.lib.unc.edu/booking/ulstudyroom');

// Wait for page to load
driver.wait(webdriver.until.elementLocated(webdriver.By.className('ui-datepicker-month')));

// Navigate to proper month
var selectElem = driver.findElement(webdriver.By.className('ui-datepicker-month'));
selectElem.click();
selectElem.findElement(webdriver.By.css("option[value='"+args[0]+"']")).click();

// Navigate to proper day
var col = 1;
var row = 1;
var cnt = parseInt(args[2]);
if (args[1] == "Sunday") {
	col = 1;
} else if (args[1] == "Monday") {
	col = 2;
} else if (args[1] == "Tuesday") {
	col = 3;
} else if (args[1] == "Wednesday") {
	col = 4;
} else if (args[1] == "Thursday") {
	col = 5;
} else if (args[1] == "Friday") {
	col = 6;
} else if (args[1] == "Saturday") {
	col = 7;
}
cnt -= 7;
while (cnt > 0) {
	row++;
	cnt -= 7;
}
// Check for extra addition
cnt += 7;
cnt--;
if ((col - cnt) < 1) row++;

selectElem = driver.findElement(webdriver.By.className('ui-datepicker-calendar'));
selectElem.findElement(webdriver.By.xpath("//tr["+row+"]/td["+col+"]")).click(); // With xpath, rows and columns begin at 1

// Click on the proper times, we from Chicago
if (args[4] != "") {
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[4]+", "+args[10]+"']")));
	selectElem = driver.findElement(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[4]+", "+args[10]+"']"));
	if (selectElem.isEnabled()) {
		driver.executeScript("arguments[0].scrollIntoView()", selectElem);
		driver.sleep(400);
		selectElem.click();
	}
}

if (args[5] != "") {
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[5]+", "+args[10]+"']")));
	selectElem = driver.findElement(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[5]+", "+args[10]+"']"));
	if (selectElem.isEnabled()) {
	driver.executeScript("arguments[0].scrollIntoView()", selectElem);
	driver.sleep(400);
	selectElem.click();
	}
}

if (args[6] != "") {
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[6]+", "+args[10]+"']")));
	selectElem = driver.findElement(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[6]+", "+args[10]+"']"));
	if (selectElem.isEnabled()) {
	driver.executeScript("arguments[0].scrollIntoView()",selectElem);
	driver.sleep(400);
	selectElem.click();
	}
}

if (args[7] != "") {
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[7]+", "+args[10]+"']")));
	selectElem = driver.findElement(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[7]+", "+args[10]+"']"));
	if (selectElem.isEnabled()) {
	driver.executeScript("arguments[0].scrollIntoView()", selectElem);
	driver.sleep(400);
	selectElem.click();
	}
}

if (args[8] != "") {
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[8]+", "+args[10]+"']")));
	selectElem = driver.findElement(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[8]+", "+args[10]+"']"));
	if (selectElem.isEnabled()) {
	driver.executeScript("arguments[0].scrollIntoView()", selectElem);
	driver.sleep(400);
	selectElem.click();
	}
}

if (args[9] != "") {
	driver.wait(webdriver.until.elementLocated(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[9]+", "+args[10]+"']")));
	selectElem = driver.findElement(webdriver.By.xpath("//a[@title='"+args[3]+", "+args[9]+", "+args[10]+"']"));
	if (selectElem.isEnabled()) {
	driver.executeScript("arguments[0].scrollIntoView()",selectElem);
	driver.sleep(400);
	selectElem.click();
	}
}

// Reserve times
driver.findElement(webdriver.By.name("Continue")).click();
driver.findElement(webdriver.By.id("s-lc-rm-sub")).click();

// Login
driver.wait(webdriver.until.elementLocated(webdriver.By.id('username')));

driver.findElement(webdriver.By.id('username')).sendKeys(args[11]);
driver.findElement(webdriver.By.id('password')).sendKeys(args[12]);

driver.findElement(webdriver.By.name("_eventId_proceed")).click();

// Registering the reservation
driver.wait(webdriver.until.elementLocated(webdriver.By.id('nick')));

driver.findElement(webdriver.By.id('nick')).sendKeys("akd");
driver.findElement(webdriver.By.id('q1')).sendKeys("4");

driver.findElement(webdriver.By.name('Submit')).click();