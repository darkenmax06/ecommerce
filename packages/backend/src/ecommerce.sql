DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;

USE ecommerce;


# PROVINCIAS Y PAGOS DE ENVIO
CREATE TABLE Provinces (
	provinceId INT PRIMARY KEY AUTO_INCREMENT,
    province VARCHAR(100) not null,
    shippingPrice FLOAT NOT NULL
);

CREATE TABLE Cities (
	cityId INT PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(100) not null,
    provinceId INT NOT NULL,
    FOREIGN KEY (provinceId) REFERENCES Provinces(provinceId)
);

# USUARIOS

CREATE TABLE Users(
	userId BINARY(16) PRIMARY KEY DEFAULT ( UUID_TO_BIN( UUID() ) ),
    name VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    type ENUM("seller","buyer") NOT NULL,
    provinceId INT NOT NULL,
    cityId INT NOT NULL,
    street VARCHAR(100) NOT NULL,
    reference VARCHAR(100),
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    creationDate timestamp DEFAULT (CURRENT_TIMESTAMP()) ,
    FOREIGN KEY (cityId) REFERENCES Cities(cityId) ,
    FOREIGN KEY (provinceId) REFERENCES Provinces(provinceId)
);

CREATE TABLE Targets (
	targetId INT PRIMARY KEY AUTO_INCREMENT,
    target VARCHAR(30)
);


CREATE TABLE Products (
	productId INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,
    targetId INT NOT NULL,
    price FLOAT NOT NULL,
    userId BINARY(16),
    quantity INT NOT NULL,
    creationDate TIMESTAMP DEFAULT(CURRENT_TIMESTAMP()),
    FOREIGN KEY (targetId) REFERENCES Targets(targetId)
);

CREATE TABLE Images (
	id INT PRIMARY KEY AUTO_INCREMENT,
    imgUri TEXT NOT NULL,
    productId INT NOT NULL
);

# COMPRAS Y GESTION DE STATUS
CREATE TABLE Status (
    statusId INTEGER PRIMARY KEY AUTO_INCREMENT,
    status TEXT NOT NULL CHECK(length(status) <= 30)
);

CREATE TABLE Orders (
    orderId INTEGER PRIMARY KEY AUTO_INCREMENT,
    statusId INTEGER NOT NULL,
    buyerId BINARY(16) NOT NULL,
    creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    reference VARCHAR(100) ,
    shippingPrice FLOAT NOT NULL,
    FOREIGN KEY (statusId) REFERENCES Status(statusId) ON DELETE RESTRICT,
    FOREIGN KEY (buyerId) REFERENCES Users(userId) ON DELETE CASCADE
);

CREATE TABLE OrderProducts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Products(productId) ON DELETE CASCADE
);


CREATE TABLE Comments (
	commentId INT PRIMARY KEY AUTO_INCREMENT,
    comment VARCHAR(300) NOT NULL,
    userId BINARY(16) NOT NULL,
    CreateAt TIMESTAMP DEFAULT(CURRENT_TIMESTAMP())
);

# VISTAS

CREATE VIEW parsed_user AS (
	SELECT BIN_TO_UUID(userId) userId, name, lastName, type,
    (SELECT province FROM Provinces p WHERE p.provinceId = u.provinceId) province,
    (SELECT city FROM Cities c WHERE c.cityId = u.cityId) city,
	street, reference,phone, email, password
    FROM Users u
);

# DATOS DE ARRANQUE

INSERT INTO Provinces (province, shippingPrice) VALUES
('Buenos Aires', 12000),
('Ciudad Autónoma de Buenos Aires', 12000),
('Córdoba', 12000),
('Santa Fe', 12000),
('Mendoza', 12000),
('Tucumán', 12000),
('Entre Ríos', 12000),
('Salta', 12000),
('Neuquén', 12000),
('Chaco', 12000),
('Corrientes', 12000),
('Misiones', 12000),
('San Juan', 12000),
('San Luis', 12000),
('Jujuy', 12000),
('Río Negro', 12000),
('La Pampa', 12000),
('Catamarca', 12000),
('Santiago del Estero', 12000),
('Formosa', 12000),
('La Rioja', 12000),
('Chubut', 12000),
('Santa Cruz', 12000),
('Tierra del Fuego', 12000);

INSERT INTO Cities (city, provinceId) VALUES
('La Plata', 1),
('Mar del Plata', 1),
('Bahía Blanca', 1),
('San Isidro', 1),
('Tigre', 1),
('Quilmes', 1),
('Morón', 1),

('Palermo', 2),
('Recoleta', 2),
('Belgrano', 2),
('Caballito', 2),
('Villa Urquiza', 2),
('San Telmo', 2),

('Córdoba Capital', 3),
('Villa Carlos Paz', 3),
('Río Cuarto', 3),
('Alta Gracia', 3),
('San Francisco', 3),

('Rosario', 4),
('Santa Fe Capital', 4),
('Rafaela', 4),
('Venado Tuerto', 4),
('Reconquista', 4),

('Mendoza Capital', 5),
('San Rafael', 5),
('Godoy Cruz', 5),
('Guaymallén', 5),
('Luján de Cuyo', 5),

('San Miguel de Tucumán', 6),
('Tafí Viejo', 6),
('Yerba Buena', 6),
('Concepción', 6),

('Paraná', 7),
('Concordia', 7),
('Gualeguaychú', 7),
('Villaguay', 7),

('Salta Capital', 8),
('San Ramón de la Nueva Orán', 8),
('Tartagal', 8),
('Cafayate', 8),

('Neuquén Capital', 9),
('Cutral Có', 9),
('Plottier', 9),
('San Martín de los Andes', 9),

('Resistencia', 10),
('Presidencia Roque Sáenz Peña', 10),
('Villa Ángela', 10),

('Corrientes Capital', 11),
('Goya', 11),
('Paso de los Libres', 11),
('Mercedes', 11),

('Posadas', 12),
('Oberá', 12),
('Eldorado', 12),
('Puerto Iguazú', 12),

('San Juan Capital', 13),
('Rawson', 13),
('Chimbas', 13),
('Pocito', 13),

('San Luis Capital', 14),
('Villa Mercedes', 14),
('Merlo', 14),

('San Salvador de Jujuy', 15),
('Palpalá', 15),
('Tilcara', 15),
('Humahuaca', 15),

('Viedma', 16),
('San Carlos de Bariloche', 16),
('General Roca', 16),
('Cipolletti', 16),

('Santa Rosa', 17),
('General Pico', 17),
('Toay', 17),

('San Fernando del Valle de Catamarca', 18),
('Belén', 18),
('Andalgalá', 18),

('Santiago del Estero Capital', 19),
('La Banda', 19),
('Termas de Río Hondo', 19),

('Formosa Capital', 20),
('Clorinda', 20),
('Pirané', 20),

('La Rioja Capital', 21),
('Chilecito', 21),
('Aimogasta', 21),

('Rawson', 22),
('Trelew', 22),
('Comodoro Rivadavia', 22),
('Puerto Madryn', 22),
('Esquel', 22),

('Río Gallegos', 23),
('Caleta Olivia', 23),
('El Calafate', 23),

('Ushuaia', 24),
('Río Grande', 24),
('Tolhuin', 24);

INSERT INTO Status (status) VALUES
("Orden creada"),
("Revisada en almacen"),
("En proceso de entrega"),
("Entregada");

INSERT INTO Users (name, lastName, type, provinceId, cityId, street, reference, phone, email, password) VALUES
("THE REAL","FAT", "seller",1,1,"ADMIN CENTER", "ADMIN CENTER","91173681228","davidcctv2024@gmail.com","$2b$08$gjGI0oagnvDKX7OG6W31O.AKgs59Ro41/IMC4Y9gXIcMl6S77o1iq"),
("Ramses","Gonzalez", "seller",1,1,"ADMIN CENTER", "ADMIN CENTER","8295468897","ramsesgonzalez20066@gmail.com","$2b$08$gjGI0oagnvDKX7OG6W31O.AKgs59Ro41/IMC4Y9gXIcMl6S77o1iq")