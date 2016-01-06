Tierstimmenarchiv
=================

With this  TitaniumApp the user can surf in side the tierstimmenarchiv.de (Naturkundemuseum Berlin)

![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-38-59.png)
![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-39-25.png)
![](https://raw.githubusercontent.com/AppWerft/Tierstimmenarchiv/master/screens/Screenshot_2016-01-05-20-39-49.png)


Data model
----------
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


table "species"
- id 
- latin_name
- i18n_name
- language
- 

table "families"
~~~