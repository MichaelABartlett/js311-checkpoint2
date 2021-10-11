
select * from recipe;

SELECT * from ingredients;

select * from instructions;

select * from users;

select * from user_calander;

-- **************************************************************

 INSERT INTO recipe (recipe_name, image, servings) 
	values ('fried chicken', ' ', '4');
    
INSERT INTO ingredients (recipe_id, ingredient, prep_Time, instruction) 
	values ('5', 'frozen chicken', '24 hours', "put frozen chicken in ice box for 24 hours");
    
INSERT INTO instructions (recipe_id, instruction) 
	values ('5', 'take chicken and ...................');
    
INSERT INTO users (full_name, hash_password, email, level) 
	values ('The Cook', "kjkjkjkj98989jkj9j9jj990k0k", "thecook@there.com", "user");
    
INSERT INTO user_calander ( user_id, cooking_Date_Time)
	values ('5', '2021-10-20 15:00:00');

-- ***************************************************************

CREATE TABLE recipe (
  id INT NOT NULL AUTO_INCREMENT,  -- database is adding a id number
  recipe_name VARCHAR(100),
  image BLOB,
  servings INT,
  PRIMARY KEY (id)
);

CREATE TABLE ingredients (
  id INT NOT NULL AUTO_INCREMENT,
  recipe_id INT NOT NULL,  -- must be tied to something, can not be null
  ingredient VARCHAR(250),
  prep_Time VARCHAR(150),
  instruction VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (recipe_id) -- connects to the user table, this is a primary key in that table
  REFERENCES recipe (id) -- this is the table that the foreign key is located
);

CREATE TABLE instructions (
  id INT NOT NULL AUTO_INCREMENT,
  recipe_id INT NOT NULL,
  instruction VARCHAR(10000),
  PRIMARY KEY (id),
  FOREIGN KEY (Recipe_id) -- connects to the user table, this is a primary key in that table
  REFERENCES Recipe (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(100),
  hash_Password VARCHAR(1000),
  email VARCHAR(80),
  level VARCHAR(25),
  PRIMARY KEY (id)
);

CREATE TABLE user_calander (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,  -- must be tied to something, can not be null
  cooking_Date_Time DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) -- connects to the user table, this is a primary key in that table
  REFERENCES users (id) -- this is the table that the foreign key is located
);

DROP TABLE IF EXISTS recipe;

DROP TABLE IF EXISTS users;
