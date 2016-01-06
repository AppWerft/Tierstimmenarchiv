Tierstimmenarchiv
=================

With this  TitaniumApp the user can surf in side the tierstimmenarchiv.de (Naturkundemuseum Berlin)

![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-38-59.png)
![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-39-25.png)
![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-39-49.png)


Data model
----------

On (web-)server is a script. This script generates a sqlite file with the following structure:

~~~
table "recordings"
- species 
- subspecies,
- locality,
- administrative_area,
- country,
- state,
- scenic_area,
- latitude,
- longitude,
- altitude,
- recording_date,
- recording_time,
- habitat
- sex,
- age,
- specimen,
- visual_identification,
- description,
- sound_type,
- background_species,
- filename,
- unique_identifier,
- notes


table "taxonomy_species"
- id 
- latin_name
- i18n_name
- language
- genus_id

table "taxonomy_genus"
- id 
- latin_name
- i18n_name
- language
- family_id

table "taxonomy_family"
- id 
- latin_name
- i18n_name
- language
- order_id

table "taxonomy_order"
- id 
- latin_name
- i18n_name
- language
- class_id

table "taxonomy_class"
- id 
- latin_name
- i18n_name
- language
- phylum_id

table "taxonomy_phylum"
- id 
- latin_name
- i18n_name
- language
- kingdom_id

table "taxonomy_kingdom"
- id 
- latin_name
- i18n_name
- language
- domain_id

table "taxonomy_domain"
- id 
- latin_name
- i18n_name
- language
~~~

The app will sync with this remote sqlite. 