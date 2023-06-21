create database menu;
use menu;

drop table if exists including;
drop table if exists createdFrom;
drop table if exists dishes;
drop table if exists origin;
drop table if exists ingredients;

create table dishes(
	id int not null, 
    name nvarchar(50) collate utf8mb3_vietnamese_ci,
    available boolean,
    price numeric(5,2) check (price >= 0),
    category varchar(12),
    primary key (id)
);

create table origin(
	id int not null, 
	name nvarchar(50) collate utf8mb3_vietnamese_ci,
    primary key (id)
);

create table createdFrom(
	id int not null, 
    dish_id int,
    origin_id int,
    primary key (id),
    foreign key (dish_id)  references dishes(id),
    foreign key (origin_id) references origin(id)
);

create table ingredients(
	id int not null,
    name nvarchar(30) collate utf8mb3_vietnamese_ci,
    quantity numeric(4,0) check (quantity >= 0 ),
    import_date date,
    expired_date date, 
    unit varchar(10),
    primary key (id)
);


create table including(
	id int not null,
    dish_id int,
    ingre_id int,
    primary key (id),
    foreign key (dish_id) references dishes(id),
    foreign key (ingre_id) references ingredients(id)
);
