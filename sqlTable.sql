
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
  recipe_name VARCHAR(100) NOT NULL,
  added_id INT,
  image BLOB,
  servings INT NOT NULL,
  locked VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (added_id) REFERENCES users (id)
);

CREATE TABLE recipe_instruction (
  id INT NOT NULL AUTO_INCREMENT,
  recipe_id INT NOT NULL,
  instruction VARCHAR(5000) not null,
  PRIMARY KEY (id),
  FOREIGN KEY (recipe_id) REFERENCES recipe (id)
  );



CREATE TABLE ingredients (
  id INT NOT NULL AUTO_INCREMENT,
  ingredient VARCHAR(250),
  prep_Time VARCHAR(150),
  instruction VARCHAR(500),
  PRIMARY KEY (id)
);


CREATE TABLE recipe_ingredient (
  id INT NOT NULL AUTO_INCREMENT,
  recipe_id INT,
  ingredient_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (recipe_id) REFERENCES recipe (id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients (id)
);


CREATE TABLE user_calander (
  id INT NOT NULL AUTO_INCREMENT,
  cooks_id INT NOT NULL,  -- must be tied to something, can not be null
  cooking_Date_Time DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (cooks_id) -- connects to the user table, this is a primary key in that table
  REFERENCES cooks (id) -- this is the table that the foreign key is located
);

DROP TABLE IF EXISTS users;

create table users (
	id int not null auto_increment,
    username varchar(100) not null,
    password_hash varchar(10000) not null,
    role varchar(300),
    PRIMARY KEY(id)
    );
   
DROP TABLE IF EXISTS recipe;

DROP TABLE IF EXISTS users;
