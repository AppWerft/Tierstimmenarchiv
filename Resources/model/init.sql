BEGIN TRANSACTION
CREATE TABLE IF NOT EXISTS records (species TEXT, erstbeschreibung TEXT, subspecies TEXT, deutscher_name TEXT, english_name TEXT, ort TEXT, country TEXT,latitude NUMBER,longitude NUMBER,altitude NUMBER,recording_date TEXT,recording_time TEXT,sex TEXT,age TEXT,Beschreibung TEXT,Description TEXT,sound_type TEXT,Autor TEXT,filename TEXT,mp3_Datei TEXT,Copyright TEXT)
CREATE TABLE IF NOT EXISTS species (latin TEXT UNIQUE, families TEXT, en TEXT, de TEXT,image TEXT)
CREATE TABLE IF NOT EXISTS families (latin TEXT UNIQUE, orders TEXT, en TEXT, de TEXT)
CREATE TABLE IF NOT EXISTS orders (latin TEXT UNIQUE, classes TEXT, en TEXT, de TEXT)
CREATE TABLE IF NOT EXISTS classes (latin TEXT UNIQUE, en TEXT, de TEXT)
DELETE FROM records
DELETE FROM species
DELETE FROM families
DELETE FROM orders
DELETE FROM classes
COMMIT
