DROP TABLE IF EXISTS ingredients;

create table ingredients (
	id int not null auto_increment,
    ingredient varchar(100),
    preptime varchar(100),
    instruction varchar(300),
    PRIMARY KEY(id)
    );
    
    INSERT INTO ingredients (ingredient, preptime, instruction) 
	values ('chicken', '24 hours', 'put frozen chicken in icebox and keep in sealed package');
    
select * from ingredients;